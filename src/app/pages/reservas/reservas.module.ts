import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule, NgbTooltipModule, NgbPaginationModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Routing
import { ReservasRoutingModule } from './reservas-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

// Component
import { ReservasComponent } from './reservas/reservas.component';

// Apex Chart Package
import { NgApexchartsModule } from 'ng-apexcharts';

// Feather Icon
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';


// Flat Picker
import { FlatpickrModule } from 'angularx-flatpickr';

// Ng Select
import { NgSelectModule } from '@ng-select/ng-select';
// Load Icon
import { defineElement } from "@lordicon/element";
import lottie from 'lottie-web';

@NgModule({
  declarations: [
    ReservasComponent
  ],
  imports: [
    CommonModule,
    ReservasRoutingModule,
    SharedModule,
    NgApexchartsModule,
    FeatherModule.pick(allIcons),
    NgbDropdownModule,
    NgbTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    FlatpickrModule,
    NgSelectModule,
    NgbPaginationModule,
    NgbNavModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReservasModule {
  constructor() {
    defineElement(lottie.loadAnimation);
  }
}
