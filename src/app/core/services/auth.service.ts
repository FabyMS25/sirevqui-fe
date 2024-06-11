import { Injectable } from '@angular/core';
import { getFirebaseBackend } from '../../authUtils';
import { User } from 'src/app/store/Authentication/auth.models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { GlobalComponent } from "../../global-component";
import { Store } from '@ngrx/store';
import { RegisterSuccess, loginFailure, loginSuccess, logout, logoutSuccess } from 'src/app/store/Authentication/authentication.actions';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/account/auth/login/toast-service';
import { TokenStorageService } from './token-storage.service';
import { AuthUserService } from './api-users/auth.service';
import { PermissionUserService } from './api-users/permission-user.service';

import { UserRol } from 'src/app/core/constants/UserRol';
const AUTH_API = GlobalComponent.AUTH_API;

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  

@Injectable({ providedIn: 'root' })

/**
 * Auth-service Component
 */
export class AuthenticationService {

    user!: User;
    currentUserValue: any;

    private currentUserSubject: any;//BehaviorSubject<User>;
    // public currentUser: Observable<User>;

    permisoAdmin ='Ajustes'
    private funcionariosList:any[]=[];
    private contribuyentesList:any[]=[];
    private empleado:any;
    private contribuyente:any;
    // private currentUser: any;

    isAuthenticated: boolean = false;
    userRol:any[]=[];

    constructor(private http: HttpClient, private store: Store,
        private authUser: AuthUserService,
        private permissionService: PermissionUserService,
        // private designationsService: DesignacionFuncionarioService,
        private storageService: TokenStorageService,
        private toastService: ToastService,
        private router: Router,

    ) {
        // this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('currentUser')!));
        // this.currentUser = this.currentUserSubject.asObservable();
        this.currentUserSubject = storageService.getUser()
        this.isAuthenticated = !!storageService.getToken();
    }

    /**
     * Performs the register
     * @param email email
     * @param password password
     */
    register(email: string, first_name: string, password: string) {        
        // return getFirebaseBackend()!.registerUser(email, password).then((response: any) => {
        //     const user = response;
        //     return user;
        // });

        // Register Api
        return this.http.post(AUTH_API + 'signup', {
            email,
            first_name,
            password,
          }, httpOptions).pipe(
            map((response: any) => {
                const user = response;
                return user;
            }),
            catchError((error: any) => {
                const errorMessage = 'Login failed'; // Customize the error message as needed
                this.store.dispatch(loginFailure({ error: errorMessage }));
                return throwError(errorMessage);
            })
        );
    }

    /**
     * Performs the auth
     * @param username username of user
     * @param password password of user
     */
    loginUser(username: string, password: string): Observable<boolean> {
      return this.authUser.loginByUsername(username, password).pipe(
        map((data: any) => {
          // Aquí puedes manejar los datos de la respuesta si es necesario
          return true; // Devolvemos true si la autenticación es exitosa
        }),
        catchError((error: any) => {
          console.error("Login error:", error);
          return of(false); // Devolvemos false si hay un error
        })
      );
    }

    async login(username: string, password: string): Promise<boolean> {
      try {
          // await this.listaFuncionarios();
          return new Promise<boolean>((resolve, reject) => {
              this.authUser.loginByUsername(username, password).subscribe({
                  next: (data) => {
                      console.log("data", data);
                      this.currentUserSubject = data;
                      this.storageService.saveUser(data);
                      this.storageService.saveToken(data.token);
                      this.hasPermission(data.uuid);
                      resolve(true);
                  },
                  error: (error: any) => {
                      console.error("Login error:", error);
                      resolve(false);
                  }
              });
          });
      } catch (error) {
          console.error("Error in logInSubmit:", error);
          return false;
      }
  }
  
    async hasPermission(uuid:String ){
        try {
          await this.permissionService.getPermisosUsuario(uuid).subscribe({
              next: (data) => {
                if(data.length>0){
                  const userPermissions = data;
                  this.empleado = this.funcionariosList.find((us) => us.uuidUsuario === uuid );
                  if (this.empleado || this.contribuyente || userPermissions.some(permission => permission.nombreMenu === this.permisoAdmin)) {
                    this.isAuthenticated = true;
                    localStorage.setItem('currentUser', JSON.stringify(this.currentUserSubject));
                    localStorage.setItem('menu', JSON.stringify(userPermissions));
                    if(userPermissions.some(permission => permission.nombreMenu === this.permisoAdmin)){                  
                        this.router.navigate(['/']).then(() => {
                          this.toastService.show('¡Bienvenido!', 'Inicio de sesión exitoso');
                      });
                      return;
                    }
                    localStorage.setItem('assignaments', JSON.stringify(this.empleado));
                    this.router.navigate(['/empleado']).then(() => {
                        this.toastService.show('¡Bienvenido!', 'Inicio de sesión exitoso');
                    });
                  } else {
                    this.storageService.signOut();
                    this.toastService.show("El usuario no cuenta con los permisos necesarios en la aplicacion SIGECEM, Comunicarce con Admnistrador");
                  }
                } else {
                  this.storageService.signOut();
                  this.toastService.show("El usuario no cuenta con permisos");
                }
              }
          });
        } catch (error) {
          
        }
      }

    /**
     * Returns the current user
     */
    public currentUser(): any {
        return this.currentUserSubject;
    }

    /**
     * Logout the user
     */
    logout() {
        this.store.dispatch(logout());
        localStorage.removeItem('currentUser')
        localStorage.removeItem('menu');
        localStorage.removeItem('assignaments');
        this.storageService.signOut();
        this.isAuthenticated = false;
        this.currentUserSubject = null;
        this.empleado = null;
        this.router.navigate(['/auth/login']);

        this.store.dispatch(logoutSuccess());
        return of(undefined).pipe(
        
        );    
    }

    /**
     * Reset password
     * @param email email
     */
    resetPassword(email: string) {
        return getFirebaseBackend()!.forgetPassword(email).then((response: any) => {
            const message = response.data;
            return message;
        });
    }

    
    // private listaFuncionarios() {
    //   return this.designationsService.getAll()
    //       .subscribe((res:any) => {
    //       if (res['status'] === 'OK') {
    //         this.funcionariosList = res['payload'];
    //       }
    //   });
    // }

    public getAvatar(): string{    
      let avatar="default-profile1.png";
      const menuString = localStorage.getItem('menu');
      const menu: any[] = menuString ? JSON.parse(menuString) : null;
      let tipoUser;
      if (menu.some(permission => permission.nombreMenu === this.permisoAdmin)) {
        tipoUser = UserRol.find(item => item.tipo === 0);//ADMINISTRADOR
      } else {
        tipoUser = UserRol.find(item => item.tipo == 1);//VALIDADOR
      }
      if (tipoUser !== undefined) {
          avatar = tipoUser.avatarM;
          if (this.currentUserSubject.designacion.personaDto.sexo === 'F') {
              avatar = tipoUser.avatarF;
          }
      }  
      return avatar
    }

}

