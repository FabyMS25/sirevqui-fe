import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from 'src/app/core/services/auth.service';

import {CityAcronym}  from 'src/app/core/constants/Places';
import { UserService } from 'src/app/core/services/api-users/users.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PassResetComponent } from '../password-reset/pass-reset.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
// import { ContribuyenteService } from 'src/app/core/services/api/contribuyente.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})

export class SettingsComponent implements OnInit {

  CityAcronym=CityAcronym;
  avatar="default-profile1.png";
  userType:string='';
  userData: any;
  funcionario!:any;

  submitted = false;
  personaForm:FormGroup = this.formBuilder.group({
    uuid: ['', [Validators.required]],
    nombre: ['', [Validators.required]],
    apPaterno: ['', [Validators.required]],
    apMaterno: ['', [Validators.required]],
    sexo: ['M', [Validators.required]],
    nroCarnet: ['', [Validators.required]],
    expedido: ['',[Validators.required]],
    nroCelular: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
    correoElectronico: ['', [Validators.required, Validators.email]],
    direccion: ['']
  });

  constructor(
    private location: Location,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private authService:AuthenticationService,
    private staffService:UserService,
    // private userService: ContribuyenteService
   ) { }

  ngOnInit(): void {    
    const token = window.sessionStorage.getItem('auth-token');
    const userString = window.sessionStorage.getItem('currentUser');
    this.userData =userString ? JSON.parse(userString) : null;
    this.avatar=this.authService.getAvatar();
    if(token==='isContribuyente'){
      const persona =this.userData;
      this.userType='Contribuyente';
      this.loadPersonaData(persona);
    }else{
      this.userType='Administrador';
      const persona =this.userData.designacion.personaDto;
      const funcionarioString = localStorage.getItem('assignaments');
      this.funcionario =funcionarioString ? JSON.parse(funcionarioString) : null;
      if(this.funcionario)this.userType='Encargado'; 
      this.loadPersonaData(persona);
    }
  }
   
  private loadPersonaData(persona:any) {
    if (persona) {
      this.personaForm.patchValue({
        uuid: persona.uuid, 
        nombre: persona.nombre,
        apPaterno: persona.apPaterno,
        apMaterno: persona.apMaterno,
        sexo: persona.sexo,
        nroCarnet: persona.nroCarnet,
        expedido: this.getExpedidoDescription(persona.ciExpedido || persona.ciExpedito),
        nroCelular: persona.nroCelular || persona.celular,
        correoElectronico: persona.correoElectronico || persona.correo,
        direccion: persona.direccion
      });
    }
  }

   get form() {
    return this.personaForm.controls;
  }
  getExpedidoDescription(expedido: any): any {
    const city = this.CityAcronym.find(c => c.acronym === expedido || c.id === expedido || c.value === expedido);
    return city ? city.value : '';
  }
  public openModal() {
    const modalRef = this.modalService.open(PassResetComponent, {
        backdrop: 'static',
    });
    modalRef.componentInstance.userData = this.userData;
  }
   getAcronymCity(city: string): string {
    let acronym = '';
    CityAcronym.forEach(element => {
      if (element['value'] === city) {
        acronym = element['acronym'];
      }
    });
    return acronym;
   }   
   getIdCity(city: string): any {
    let acronym = null;
    CityAcronym.forEach(element => {
      if (element['value'] === city) {
        acronym = element['id'];
      }
    });
    return acronym;
   }

   async saveData() {    
    this.submitted = true;
    if (this.personaForm.valid) {
    if(this.userType==='Contribuyente'){
      const persona:any = {        
        uuid: this.personaForm.value.uuid,
        nombre: this.personaForm.value.nombre,
        apPaterno: this.personaForm.value.apPaterno,
        apMaterno: this.personaForm.value.apMaterno,
        nroCarnet: this.personaForm.value.nroCarnet,
        ciExpedido: this.getIdCity(this.personaForm.value.expedido),
        sexo: this.personaForm.value.sexo,
        celular: this.personaForm.value.nroCelular,
        correo: this.personaForm.value.correoElectronico,
        direccion: this.personaForm.value.direccion,

        fechaNac:this.userData.fechaNac,
        estadoUsuario:this.userData.estadoUsuario,
        codigoContribuyente:this.userData.codigoContribuyente,
        estadoCivil:this.userData.estadoCivil,
        tipoDocumento:this.userData.tipoDocumento,
        nroNit:this.userData.nroNit,
        tipoContribuyente:this.userData.tipoContribuyente,
        userName:this.userData.userName,
        password:this.userData.password,
      }
      
      try {
        await this.updateUser(persona);
        this.notify('success', 'Sus datos fueron actualizados con éxito');
      } catch (error) {
        this.notify('error', 'No se pudo actualizar sus datos');
      }
    }else {
      const persona: any = { ...this.personaForm.value }; 
      persona.ciExpedito = this.getAcronymCity(persona.expedido);
      delete persona.expedido; 
      this.updatePersona(persona);
    }
    }else{
      this.notify('error', 'Por favor, complete todos los campos obligatorios');
      return;
    }
   }

   password: string = '';
   async deleteAccount() {
    if (!this.password) {
      this.notify('error', 'Por favor, ingrese su contraseña.');
      return;
    }

    // const isPasswordValid = await this.verifyPassword(this.password);

    if (this.password===this.userData.password) {
      if (window.confirm("¿Está seguro de que desea cerrar y eliminar la cuenta?")) {
        this.userData.estadoUsuario = 'Anulado';
        await this.updateUser(this.userData);
        this.notify('success', 'Su cuenta fue anulada, usted ya no podrá realizar operaciones en el sistema');
        this.authService.logout();
      }
    } else {
      this.notify('error', 'La contraseña ingresada es incorrecta.');
    }
  }
  
  

 
  

   /* API Services */
   private updatePersona(persona:any) {    
    this.staffService.updatePersona(persona).subscribe({
      next:(data) => {
          this.notify('success','Registro actualizado con exito');
      },
      error: (error) => {
          this.notify('error','No se puedo actualizar el Registro');
      }
    });
   }

   private updateUser(persona: any): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.staffService.updateUser(persona).subscribe({
        next: (data: any) => {
          if (data.status === 'OK') {
            resolve(true);
          } else {
            resolve(false);
          }
        },
        error: (error:any) => {
          this.notify('error', 'No se pudo actualizar el Registro');
          reject(error);
        }
      });
    });
  }
  //  private deleteUser(uuid:string) {    
  //   this.userService.delete(uuid).subscribe({
  //     next:(data:any) => {
  //       if(data.status==='OK'){
  //         this.notify('success', 'Se elimino su cuenta con exito');
  //         this.authService.logout()
  //       }else{
  //         this.notify('error', 'No se puedo eliminar el Registro');
  //       }
  //     },
  //     error: (error) => {
  //         this.notify('error','No se puedo actualizar el Registro');
  //     }
  //   });
  //  }

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

  goBack() {
    this.location.back();
  }
}
