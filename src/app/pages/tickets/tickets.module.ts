import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule, NgbTypeaheadModule, NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

// Counter
import { CountUpModule } from 'ngx-countup';
// Flat Picker
import { FlatpickrModule } from 'angularx-flatpickr';
// Simple Bar
import { SimplebarAngularModule } from 'simplebar-angular';

// Load Icons
import { defineElement } from "@lordicon/element";
import lottie from 'lottie-web';

// Component pages
import { TicketsRoutingModule } from './tickets-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';

import {DatePipe} from '@angular/common';

@NgModule({
  declarations: [
    ListComponent,
    DetailsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    NgbDropdownModule,
    NgbTooltipModule,
    CountUpModule,
    FlatpickrModule,
    SimplebarAngularModule,
    TicketsRoutingModule,
    SharedModule
  ],
  providers: [
    DatePipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TicketsModule { 
  constructor() {
    defineElement(lottie.loadAnimation);
  }
}
