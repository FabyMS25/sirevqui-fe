import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Component pages
import { ExtrapagesRoutingModule } from './extraspages-routing.module';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { TermsConditionComponent } from './terms-condition/terms-condition.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    MaintenanceComponent,
    ComingSoonComponent,
    TermsConditionComponent
  ],
  imports: [
    CommonModule,
    ExtrapagesRoutingModule,
    SharedModule
  ]
})
export class ExtraspagesModule { }
