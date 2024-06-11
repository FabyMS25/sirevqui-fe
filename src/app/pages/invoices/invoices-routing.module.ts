import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component pages
import { ListComponent } from "./list/list.component";
import { DetailsComponent } from "./details/details.component";
import { CreateComponent } from "./create/create.component";

const routes: Routes = [
  {
    path: "list",
    component: ListComponent
  },
  {
    path: "details",
    component: DetailsComponent
  },
  {
    path: "create",
    component: CreateComponent
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InvoicesRoutingModule {}
