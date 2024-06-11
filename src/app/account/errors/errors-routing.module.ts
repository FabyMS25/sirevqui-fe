import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { BasicComponent } from "./basic/basic.component";
import { CoverComponent } from "./cover/cover.component";
import { AltComponent } from "./alt/alt.component";
import { Page500Component } from "./page500/page500.component";
import { OfflineComponent } from "./offline/offline.component";
import { ComingSoonComponent } from 'src/app/account/errors/coming-soon/coming-soon.component';
import { MaintenanceComponent } from 'src/app/account/errors/maintenance/maintenance.component';

const routes: Routes = [
  {
    path:"404-basic",
    component: BasicComponent
  },
  {
    path: "404-cover",
    component: CoverComponent
  },
  {
    path: "404-alt",
    component: AltComponent
  },
  {
    path: "page-500",
    component: Page500Component
  },
  {
    path: "offline",
    component: OfflineComponent
  },
  /* extrapages: */
  {
    path: "maintenance",
    component:MaintenanceComponent
  },
  {
    path: "coming-soon",
    component:ComingSoonComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Error404RoutingModule { }
