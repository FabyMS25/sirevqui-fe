import { Component, ViewChild } from '@angular/core';
import {DecimalPipe} from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {CityAcronym}  from 'src/app/core/constants/Places';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/api-users/users.service';
import { PassResetComponent } from '../password-reset/pass-reset.component';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})

export class ProfileComponent {

  CityAcronym=CityAcronym;
  userData: any;
  userType:string='';
  persona:any = null;
  funcionario!:any;
  avatar="default-profile1.png";
  // userRol =UserRol;

  constructor(
    private authService:AuthenticationService, 
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
      const token = this.authService.tokenUser();
      this.userData = this.authService.currentUser();
      this.userType=this.authService.getRole()
      this.avatar=this.authService.getAvatar();
      if(token==='isContribuyente'){
        this.persona =this.userData;
      }else{
        this.persona =this.userData.designacion.personaDto;
        const funcionarioString = localStorage.getItem('assignaments');
        this.funcionario =funcionarioString ? JSON.parse(funcionarioString) : null;
      }
  }

  public openModal() {
    const modalRef = this.modalService.open(PassResetComponent, {
        backdrop: 'static',
    });
    modalRef.componentInstance.userData = this.userData;
  }

  getAcronymCity(city: any): any {
    let acronym = null;
    CityAcronym.forEach(element => {
      if (element['value'] === city) {
        acronym = element['id'];
      }
    });
    return acronym;
  }
  
  getCityDescription(ciExpedido: any): string {
    const cityById = CityAcronym.find(c => c.id === ciExpedido);  
    if (cityById) {
      return cityById.value;
    }
    // const cityByDescription = CityAcronym.find(c => c.description === ciExpedido);
    // if (cityByDescription) {
    //   return cityByDescription.description;
    // }  
    return ciExpedido;
  }
   
}
