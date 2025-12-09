import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component Pages
import { MaintenanceComponent } from "./maintenance/maintenance.component";
import { ComingSoonComponent } from "./coming-soon/coming-soon.component";
import { TermsConditionComponent } from './terms-condition/terms-condition.component';

const routes: Routes = [
  {
    path: "maintenance",
    component:MaintenanceComponent
  },
  {
    path: "coming-soon",
    component:ComingSoonComponent
  },
  {
    path: 'terms-condition',
    component: TermsConditionComponent,
    data: { contentType: 'terms' }
  },
  {
    path: 'policy-privacy',
    component: TermsConditionComponent,
    data: { contentType: 'policy' }
  },
  { path: '', loadChildren: () => import('./errors/errors.module').then(m => m.ErrorsModule)},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ExtrapagesRoutingModule { }
