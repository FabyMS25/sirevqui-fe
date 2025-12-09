import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component pages
import { OrdersComponent } from "./orders/orders.component";
import { ApikeyComponent } from './apikey/apikey.component';

const routes: Routes = [
  {
    path: "orders",
    component: OrdersComponent
  },

  {
    path: "apikey",
    component: ApikeyComponent
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CryptoRoutingModule {}
