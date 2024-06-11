import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component pages
import { ReservasComponent } from './reservas/reservas.component';

const routes: Routes = [
  {
    path: "reservas",
    component: ReservasComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservasRoutingModule { }
