import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component pages
import { FaqsComponent } from "./faqs/faqs.component";
import { PricingComponent } from "./pricing/pricing.component";

const routes: Routes = [
  {
    path: 'faqs',
    component: FaqsComponent
  },
  {
    path: 'pricing',
    component: PricingComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExtraPagesRoutingModule { }
