import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpleadoComponent } from './empleado/empleado.component';
import { ContribuyenteComponent } from './contribuyente/contribuyente.component';

// Component Pages


const routes: Routes = [
  {
    path: "empleado",
    component: EmpleadoComponent
  },
  {
    path: "contribuyente",
    component: ContribuyenteComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DashboardsRoutingModule { }
