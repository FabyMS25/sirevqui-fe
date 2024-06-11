import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component pages
import { EmployeesComponent } from "./empleados/employees.component";
import { CompaniesComponent } from "./companies/companies.component";
import { LeadsComponent } from "./leads/leads.component";

const routes: Routes = [
  {
    path: "employees",
    component: EmployeesComponent
  },
  {
    path: "companies",
    component: CompaniesComponent
  },
  {
    path: "leads",
    component: LeadsComponent
  }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SettingsRoutingModule {}
