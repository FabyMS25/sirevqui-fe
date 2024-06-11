import { Component, OnInit } from '@angular/core';

import { TokenStorageService } from '../../../core/services/token-storage.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';

import {CityAcronym}  from 'src/app/core/constants/Ciudades';
import { UserService } from 'src/app/core/services/api-users/users.service';
import Swal from 'sweetalert2';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthUserService } from 'src/app/core/services/api-users/auth.service';
import { Observable, catchError, map, of } from 'rxjs';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})

/**
 * Profile Settings Component
 */
export class SettingsComponent implements OnInit {

  userData:any;
  avatar="default-profile1.png";
  persona:any;
  CityAcronym=CityAcronym;

  submitted = false;
  passwordForm: FormGroup = this.formBuilder.group({
    currentPassword: ['', {
      validators: [Validators.required],
      asyncValidators: [this.validateCurrentPassword()],
      updateOn: 'blur'
    }],
    newPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(120)]],
    confirmPassword: ['', [Validators.required]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private TokenStorageService : TokenStorageService,
    private authService:AuthenticationService,
    private userService:UserService,
   ) { }

  ngOnInit(): void {
    this.userData =  this.TokenStorageService.getUser();   
    this.avatar=this.authService.getAvatar(); 
    this.persona =this.userData.designacion.personaDto;
    
  }

  /**
  * Multiple Default Select2
  */
   selectValue = ['Illustrator', 'Photoshop', 'CSS', 'HTML', 'Javascript', 'Python', 'PHP'];
   
   get form() {
    return this.passwordForm.controls;
  }
  validateCurrentPassword(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!this.userData) {
        return of(null); 
      }
      return this.authService.loginUser(this.userData.username, control.value).pipe(
        map((res: boolean) => {
          return !res ? { invalidCurrentPassword: 'Contraseña incorrecta' } : null;
        }),
        catchError(() => of(null))
      );
    };
  }
   getAcronymCity(city: string): string {
    let acronym = '';
    CityAcronym.forEach(element => {
      if (element['descripcion'] === city) {
        acronym = element['id'];
      }
    });
    return acronym;
   }

   /* API Services */
   updatePersona() {    
    this.persona['ciExpedito'] = this.getAcronymCity(this.persona['ciExpedito']);
    this.userService.updatePersona(this.persona).subscribe({
      next:(data) => {
          this.persona = data;
          this.notify('success','Registro actualizado con exito');
      },
      error: (error) => {
          this.notify('error','No se puedo actualizar el Registro');
      }
    });
   }
  changePassword() {
    this.submitted = true;
    if (this.passwordForm.controls['newPassword'].value !== this.passwordForm.controls['confirmPassword'].value) {
      this.notify('error','Los campos Nueva Contraseña y Confirmar Contraseña no coinciden')
      return;
    }

    this.userService.changePassword(this.userData.uuid, this.passwordForm.controls['newPassword'].value).subscribe(
      (response) => {
        this.notify('success','La contraseña fue actualizada exitosamente')
        this.passwordForm.reset();
        this.submitted = false;
      },
      (error) => {
        this.notify('error','Ocurrió un error inesperado al cambiar la contraseña')
        this.submitted = false;
      }
    );
  }
   /* Common functions */
  private notify(type:any, message:string){
    let timerInterval: any;
    Swal.fire({
      title: message,
      icon: type,
      timer: 2000,
      timerProgressBar: true,
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
      }
    });
  }
}
