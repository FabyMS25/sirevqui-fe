import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

import { LoginComponent } from './auth/login/login.component';
import { ToastsContainer } from './auth/login/toasts-container.component';
import { AccountRoutingModule } from './account-routing.module';

@NgModule({
  declarations: [
    LoginComponent,
    ToastsContainer
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbToastModule,
    AccountRoutingModule,
  ]
})
export class AccountModule { }
