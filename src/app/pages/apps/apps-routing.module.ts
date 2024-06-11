import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component pages
import { ApikeyComponent } from './apikey/apikey.component'

const routes: Routes = [
  {
    path: "apikey",
    component: ApikeyComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppsRoutingModule { }
