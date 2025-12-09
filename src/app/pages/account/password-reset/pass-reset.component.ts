import { Component, Input, ViewChild } from '@angular/core';
import {DecimalPipe} from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AbstractControl, FormGroup, UntypedFormBuilder, ValidationErrors, Validators} from '@angular/forms';
import Swal from 'sweetalert2';

import { AuthenticationService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/api-users/users.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { MustMatch } from './must-match';
// import { ContribuyenteService } from 'src/app/core/services/api/contribuyente.service';

@Component({
  selector: 'app-pass-reset',
  templateUrl: './pass-reset.component.html',
  styleUrls: ['./pass-reset.component.scss'],
  providers: [ DecimalPipe]
})

/**
 * Profile Component
 */
export class PassResetComponent {
  @Input() userData!: any;
  // userData: any;

  submitted: boolean = false;
  passwordForm!: FormGroup;
  
  constructor(
    private staffService:UserService,
    // private userService: ContribuyenteService,
    private storageService: TokenStorageService,
    private formBuilder: UntypedFormBuilder, 
    private modalService: NgbModal) {
   }

  ngOnInit(): void {
      const token = window.sessionStorage.getItem('auth-token');
      const userString = window.sessionStorage.getItem('currentUser');
      this.userData =userString ? JSON.parse(userString) : null;
    if(this.userData){
      this.initForm(token==='isContribuyente'?'Contribuyente':'Funcionario');
    }
  }

  private initForm(type:any) {
    this.passwordForm = this.formBuilder.group({
      user:[type],
      currentPassword: ['', [Validators.required],[this.validateCurrentPassword.bind(this)]],
      password: ['', [Validators.required]],
      cpassword: ['', [Validators.required]]       
     }, {
       validator: MustMatch('password', 'cpassword')
     });
  } 
  get f() { return this.passwordForm.controls; }

  async validateCurrentPassword(control: AbstractControl): Promise<ValidationErrors | null> {
    return new Promise(async (resolve) => {
      setTimeout(async () => {
        if (!control.value) {
          resolve(null);
        }
        if(!this.userData){
          resolve(null);          
        }
        if(this.f['user'].value==='Contribuyente'){
          if(this.userData.password !== control.value){
            resolve({ invalidPassword: true });
          } else {
            resolve(null);
          }
        }else{
          const valid = await this.loginEmpleado(this.userData.username, control.value);
          if (!valid) {
            resolve({ invalidPassword: true });
          } else {
            resolve(null);
          }
        }
      }, 500); 
    });
  }

  changePassword() {
    this.submitted = true;  
    if (this.passwordForm.valid ) {
      const password = this.f['password'].value;  
      if(this.f['user'].value==='Contribuyente'){
        this.userUpdate(this.userData,password);
      }else{
        this.employeeUpdate(this.userData,password);
      }    
    } else {
      this.notify('error','Formulario Invalido!');
      Object.keys(this.passwordForm.controls).forEach(key => {
        const control = this.passwordForm.get(key);
        control?.markAsTouched();
      });
    }
  }

   /**
   * API Requests
   */
  async loginEmpleado(username: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
        this.staffService.loginByUsername(username, password).subscribe({
          next: (data) => {
            this.storageService.saveToken(data.token);
            resolve(data);
          },
          error: (error) => {
            resolve(null);
          }
        });
    });
  }
  private employeeUpdate(user:any,password:any): void {
    this.staffService.changePassword(user.uuid, password).subscribe(
      (response) => {
        this.notify('success','La contraseña fue actualizada exitosamente')
        this.initForm('Funcionario');
        this.modalService.dismissAll();
      },
      (error) => {
        this.notify('error','Ocurrió un error inesperado al cambiar la contraseña')
        this.modalService.dismissAll();
      }
    );
  }
  private userUpdate(data:any,password:any): void {
    data.password = password;
    this.staffService.updatePersona(data).subscribe({
      next: (response:any) => {
        if(response.status === 'OK'){        
          this.notify('success',"Su contraseña se ha restablecido correctamente.");
          this.initForm('Contribuyente');
          this.modalService.dismissAll();
        }
      },
      error: (err) => {
        this.notify('error','Ocurrió un error inesperado al cambiar la contraseña')
        this.modalService.dismissAll();
      }
    });
  }

   /**
   * Password Hide/Show
   */
  oldPasswordField!: boolean;
  toggleOldpasswordField() {
    this.oldPasswordField = !this.oldPasswordField;
  }
  passwordField!: boolean;
  togglepasswordField() {
    this.passwordField = !this.passwordField;
  }
  confirmField!: boolean;
  toggleconfirmField() {
    this.confirmField = !this.confirmField;
  }

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
  public onCloseModal() {
    
    this.passwordForm.reset();
    this.modalService.dismissAll();
  }
}
