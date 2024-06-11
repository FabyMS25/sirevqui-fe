import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

// Load Icons
import { defineElement } from "@lordicon/element";
import lottie from 'lottie-web';

import { ToastsContainer } from './login/toasts-container.component';


import { AccountRoutingModule } from './account-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PassResetComponent } from './pass-reset/pass-reset.component';
import { PassCreateComponent } from './pass-create/pass-create.component';
import { LogoutComponent } from './logout/logout.component';
import { SuccessMsgComponent } from './success-msg/success-msg.component';
import { TwoStepComponent } from './twostep/twostep.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    PassResetComponent,
    PassCreateComponent,
    LogoutComponent,
    SuccessMsgComponent,
    TwoStepComponent,
    ToastsContainer
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbToastModule,
    AccountRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AccountModule { 
  constructor() {
    defineElement (lottie.loadAnimation);
  }
}
