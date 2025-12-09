import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { logout, logoutSuccess } from 'src/app/store/Authentication/authentication.actions';
import { Router } from '@angular/router';
import { of } from 'rxjs';


import { ToastService } from './toast-service';
import { TokenStorageService } from './token-storage.service';


import { PermissionUserService } from './api-users/permission-user.service';
import { UserService } from './api-users/users.service';
import { StaffService } from './api/staff.service';
import { GlobalComponent } from 'src/app/global-component';
import { UserRol } from '../constants/UserData';
import { LoginResponse } from '../models/user/login-response.model';
import { MenuItem } from '../models/menu.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  // isAuthenticated: boolean = false;
  // currentUserSubject: any;
  APP_NAME = GlobalComponent.NAME_APP;
  permisoAdmin = GlobalComponent.ADMIN_MENU;  
  private backendAvailable: boolean = false;

  constructor(
    private router: Router,
    private store: Store,
    private storageService: TokenStorageService,
    private authUserService: UserService,
    private staffService: StaffService,
    private permissionService: PermissionUserService,
    private toastService: ToastService,
  ) {}
  
  async loginUser(username: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.authUserService.loginByUsername(username, password).subscribe({
        next: (response: LoginResponse) => {
          if (response && response.token) {
            let modulos: string[] = response.modulos || [];            
            if (modulos.includes(this.APP_NAME)) {
              resolve(response); // ✅ Success
            } else {
              reject("noModule");
            }
          } else {
            reject("badCredentials");
          }
        },
        error: (error) => {
          if (this.isBackendError(error)) {
            resolve({ backendError: true, error });
          } else {
            reject(error);
          }
        },
      });
    });
  }

  private isBackendError(error: any): boolean {
    return (
      error.status === 0 ||
      error.status === 504 ||
      error.status === 502 ||
      error.name === 'HttpErrorResponse' ||
      (error.error && error.error instanceof ProgressEvent) ||
      error.message?.includes('CORS') ||
      error.message?.includes('Network') ||
      error.message?.includes('Failed to fetch') ||
      error.message?.includes('Http failure')
    );
  }

  async userHasPermission(user: any): Promise<{status: 'isAdmin' | 'isStaff' | 'hasNoPermissions', permissions?: any[], assignations?: any}> {
    try {
      const [userPermissions, userAssignations] = await Promise.all([
        this.permissionService.getPermissionsUser(user).toPromise(),
        this.staffService.getByUserUuid(user.uuid).toPromise()
          .then((response: any) => response?.status === 'OK' ? response.payload : null)
          .catch(error => null),
      ]);
      if (userPermissions && Array.isArray(userPermissions) && userPermissions.length > 0) {
        const isAdmin = userPermissions.some(permission => permission.nombreMenu === this.permisoAdmin);
        if (userAssignations || isAdmin) {
          userPermissions.forEach((menu: any) => {
            if (!menu.permisoPadreDto) {
              menu.isCollapsed = true;
            }
          });
          if (isAdmin) {
            return { 
              status: 'isAdmin', 
              permissions: userPermissions, 
              assignations: null 
            };
          } else {
            return { 
              status: 'isStaff', 
              permissions: userPermissions, 
              assignations: userAssignations 
            };
          }
        } else {
          return { status: 'hasNoPermissions' };
        }
      } else {
        return { status: 'hasNoPermissions' };
      }
    } catch (error) {
      this.toastService.show(
        'Error de Permisos: Ocurrió un error al verificar los permisos de usuario. Por favor, contacte al administrador.',
        'error'
      );
      throw new Error('Ocurrió un error al verificar los permisos');
    }
  }

  logout() {
    this.store.dispatch(logout());
    localStorage.removeItem('assignaments');
    localStorage.removeItem('menu');
    // localStorage.removeItem('systemConfigs');
    this.storageService.signOut();
    this.store.dispatch(logoutSuccess());
    this.router.navigate(['/auth/login']);
    return of(undefined).pipe();
  }

  hasPermission(modulo: string): string[] {
    const menuString = localStorage.getItem('menu');
    const menu: any[] = menuString ? JSON.parse(menuString) : null;
    const permissions = menu.filter(permission => permission.nombreMenu === modulo);
    return permissions.map(permission => permission.accion);
  }
  hasRoutePermission(route: string): boolean {
    const menuString = localStorage.getItem('menu');
    const menu: any[] = menuString ? JSON.parse(menuString) : null;
    const permissions = menu.filter(permission => permission.ruta === route);
    return menu.find(permission => permission.ruta === route) ? true : false;
  }
  
  getDashboardUrl(): string {
    const dashboardRoutes = ['/inicio', '/inicio/employee', '/inicio/client'];
    const storedMenu = localStorage.getItem('menu');
    const userMenu = storedMenu ? JSON.parse(storedMenu) : null;
    const userDashboard = userMenu.find((item: any) => dashboardRoutes.includes(item.ruta));
    return userDashboard ? userDashboard.ruta : '/auth/login';
  }

  /**
   * GETTERS
   */ 
    public tokenUser(): any {
      return this.storageService.getToken();
    }
  public currentUser(): LoginResponse {
    return this.storageService.getUser();
  }
  public isLoggedIn(): boolean {
    const token = this.storageService.getToken();
    return !!token;
  }
  public isBackendAvailable(): boolean {
    return this.backendAvailable;
  }

  isAdmin(): boolean {
    const menuString = localStorage.getItem('menu');
    const menu: any[] = menuString ? JSON.parse(menuString) : null;
    return menu.some(permission => permission.nombreMenu === this.permisoAdmin)
  }
  getUserFullName(): string {
    const currentUserSubject = this.currentUser()
    if (!currentUserSubject) return '';    
    return currentUserSubject.designacion?.personaDto?.fullName || 
             (currentUserSubject.designacion?.personaDto?.nombre + ' ' + 
              currentUserSubject.designacion?.personaDto?.apPaterno) || 
             currentUserSubject.username || 
             'Usuario';
  }
  public getAvatar(): string{    
    const token = this.storageService.getToken(); 
    const user =  this.storageService.getUser(); 
    const menu = JSON.parse(localStorage.getItem('menu') as string);
    let avatar="default-profile1.png";
    let role;
    if(token==='isContribuyente'){
      role = UserRol.find(item => item.tipo == 2);//CLIENT
    }else if (menu.some((permission:any) => permission.nombreMenu === this.permisoAdmin)) {
      role = UserRol.find(item => item.tipo === 0);//ADMINISTRADOR
    } else {
      role = UserRol.find(item => item.tipo == 1);//EMPLOYEE
    }    
    if (role !== undefined) {
      avatar = role.avatarF;
      if (user.designacion && user.designacion.personaDto.sexo === 'M') {
        avatar = role.avatarM;
      }
    }  
    return avatar
  }
    public getRole(): string{    
      const token =  localStorage.getItem('parqui_token')?.trim();
      const menu = JSON.parse(localStorage.getItem('menu') as string);
      let role;
      if(token==='isContribuyente'){
        role = 'Contribuyente';//CLIENT
      }else if (menu.some((permission:MenuItem) => permission.nombreMenu === 'Administración')) {
        role = 'Administrador';//ADMIN
      } else {
        role = 'Funcinario';//EMPLOYEE
      }    
      return role
    }
}