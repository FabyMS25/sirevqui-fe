import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthenticationService } from '../../../../core/services/auth.service';
import { GlobalComponent } from 'src/app/global-component';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { MenuItem } from 'src/app/core/models/menu.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  submitted = false;
  loginForm!: UntypedFormGroup;

  fieldTextType!: boolean;
  year: number = new Date().getFullYear();
  APP_NAME = GlobalComponent.NAME_APP;
  backendError: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private storageService: TokenStorageService,
    private authService: AuthenticationService,
  ){ }

  ngOnInit(): void {
    if (this.storageService.getUser()) {
      this.router.navigate(["/"]);
    }
    this.loginForm = this.formBuilder.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });
  }

  get form() {
    return this.loginForm.controls;
  }

  async onSubmit() {
    this.submitted = true;
    this.backendError = false;    
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    try {
      const username = this.form['username'].value;
      const password = this.form['password'].value;
      const loginResult = await this.authService.loginUser(username, password);
      if (loginResult?.backendError) {
        this.showBackendDownError();
        return;
      }      
      if (loginResult && loginResult.token) {
        const permissionResult  = await this.authService.userHasPermission(loginResult);
        if (permissionResult.permissions && permissionResult.permissions.length > 0) {
          this.storageService.saveUser(loginResult);   
          this.storageService.saveToken(loginResult.token);
          const sortedMenu = this.sortMenuItemsRecursive(permissionResult.permissions!);
          localStorage.setItem('menu', JSON.stringify(sortedMenu));
          sessionStorage.setItem("toast", "true");
          if (permissionResult.status === 'isAdmin') {
            this.router.navigate(['/'], { 
              queryParams: { message: 'welcome_admin' } 
            });
          } else if (permissionResult.status === 'isStaff') {
            this.router.navigate(['/'], { 
              queryParams: { message: 'welcome_staff' } 
            });
          }
        } else {
          this.loginForm.setErrors({ invalidPermissions: true });
        }
      }
    } catch (error: any) {
      this.loginForm.setErrors(null);
      if (error instanceof Error) {
        if (error.message === "Bad credentials" || error.message.includes("Bad credentials")) {
          this.loginForm.setErrors({ invalidLogin: true });
        } else {
          this.loginForm.setErrors({ serverError: true });
        }
      } else {
        if (error === 'badCredentials') {
          this.loginForm.setErrors({ invalidLogin: true });
        } else if (error === 'noModule') {
          this.loginForm.setErrors({ invalidPermissions: true });
        } else if (error === 'serverError') {
          this.loginForm.setErrors({ serverError: true });
        } else {
          this.loginForm.setErrors({ serverError: true });
        }
      }
    }
  }
  
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  private sortMenuItemsRecursive(menuItems: MenuItem[]): any[] {
    return menuItems.map(item => {
      if (item.permisoHijoListDto && item.permisoHijoListDto.length > 0) {
        return {
          ...item,
          permisoHijoListDto: this.sortMenuItems(item.permisoHijoListDto)
        };
      }
      return item;
    }).sort((a, b) => {
      const orderCompare = (a.orden || 0) - (b.orden || 0);
      if (orderCompare !== 0) return orderCompare;
      const aPriority = this.getActionPriority(a.accion);
      const bPriority = this.getActionPriority(b.accion);
      return aPriority - bPriority;
    });
  }
  private sortMenuItems(menuItems: MenuItem[]): any[] {
    return menuItems.sort((a, b) => {
      const orderCompare = (a.orden || 0) - (b.orden || 0);
      if (orderCompare !== 0) return orderCompare;
      const aPriority = this.getActionPriority(a.accion);
      const bPriority = this.getActionPriority(b.accion);
      return aPriority - bPriority;
    });
  }
  private getActionPriority(accion: any): number {
    const actionOrder = ['LISTAR','VER', 'CREAR', 'EDITAR', 'ACTUALIZAR', 'VALIDAR', 'ANULAR', 'GENERAR TICKET', 'CAMBIAR-HORARIO', 'EXPORTAR', 'BLOQUEAR', 'ELIMINAR'];
    const index = actionOrder.indexOf(accion);
    return index !== -1 ? index : actionOrder.length;
  }
  private showBackendDownError(): void {
    this.backendError = true;
      Swal.fire({
        title: 'Servicio No Disponible',
        text: 'El sistema principal no está disponible en este momento. Por favor, intente más tarde.',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Entendido',
        allowOutsideClick: false,
        allowEscapeKey: false
    });
  }
}
