import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule, NgbTypeaheadModule, NgbNavModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

// Counter
import { CountUpModule } from 'ngx-countup';
// Flat Picker
import { FlatpickrModule } from 'angularx-flatpickr';

// Swiper Slider
import { SlickCarouselModule } from 'ngx-slick-carousel';

// Apex Chart Package
import { NgApexchartsModule } from 'ng-apexcharts';

// File Uploads
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

// NG2 Search Filter
import { NgPipesModule } from 'ngx-pipes';

// Component pages
import { CryptoRoutingModule } from './crypto-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { OrdersComponent } from './orders/orders.component';

import {DatePipe} from '@angular/common';

// Load Icons
import { defineElement } from "@lordicon/element";
import lottie from 'lottie-web';
import { ApikeyComponent } from './apikey/apikey.component';


const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  url: 'https://httpbin.org/post',
  maxFilesize: 50,
  acceptedFiles: 'image/*'
};


@NgModule({
  declarations: [
    OrdersComponent,
    ApikeyComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    NgbNavModule,
    NgbDropdownModule,
    CountUpModule,
    FlatpickrModule,
    SlickCarouselModule,
    NgApexchartsModule,
    DropzoneModule,
    CryptoRoutingModule,
    SharedModule,
    NgPipesModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CryptoModule {
  constructor() {
    defineElement(lottie.loadAnimation);
  }
 }
