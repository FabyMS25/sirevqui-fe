import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component Pages
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { PassResetComponent } from './pass-reset/pass-reset.component';
import { PassCreateComponent } from './pass-create/pass-create.component';
import { LogoutComponent } from './logout/logout.component';
import { SuccessMsgComponent } from './success-msg/success-msg.component';
import { TwoStepComponent } from './twostep/twostep.component';

const routes: Routes = [
  {
    path: 'pass-reset', component:PassResetComponent
  },
  {
    path: 'pass-create', component:PassCreateComponent
  },
  {
    path: 'logout', component: LogoutComponent
  },
  {
    path: 'success-msg', component:SuccessMsgComponent
  },
  {
    path: 'twostep', component:TwoStepComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "login",
    component: LoginComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
