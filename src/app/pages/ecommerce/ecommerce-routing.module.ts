import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component pages
import { OrdersComponent } from "./orders/orders.component";
import { CustomersComponent } from "./customers/customers.component";

const routes: Routes = [
  {
    path: "orders",
    component: OrdersComponent
  },
  {
    path: "customers",
    component: CustomersComponent
  },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EcommerceRoutingModule {}
