import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NgbToastModule, NgbProgressbarModule,
  NgbTooltipModule,
  NgbNavModule,
  NgbModule
} from '@ng-bootstrap/ng-bootstrap';

import { FlatpickrModule } from 'angularx-flatpickr';
import { CountUpModule } from 'ngx-countup';
import { NgApexchartsModule } from 'ng-apexcharts';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SimplebarAngularModule } from 'simplebar-angular';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { LightboxModule } from 'ngx-lightbox';
import { defineElement } from "@lordicon/element";
import lottie from 'lottie-web';

import { SharedModule } from "../shared/shared.module";
import { WidgetModule } from '../shared/widget/widget.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ToastsContainer } from './dashboard/toasts-container.component';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { ProfileComponent } from './account/profile/profile.component';
import { SettingsComponent } from './account/settings/settings.component';
import { PassResetComponent } from './account/password-reset/pass-reset.component';
import { TranslateModule } from '@ngx-translate/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { SortByPipe } from './sort-by.pipe';
import { EcommerceModule } from './_examples/ecommerce/ecommerce.module';
import { StaffComponent } from './modules/staff/staff.component';


@NgModule({
  declarations: [
    ProfileComponent,
    SettingsComponent,
    PassResetComponent,

    DashboardComponent,
    ToastsContainer,

    StaffComponent,
    
    SortByPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CountUpModule,

    NgbProgressbarModule,
    NgApexchartsModule,
    LeafletModule,
    SimplebarAngularModule,
    WidgetModule,
    LightboxModule,
    FeatherModule.pick(allIcons),
    NgbNavModule,
    EcommerceModule,


    
    NgbModule,
    NgSelectModule,
    NgbDropdownModule,
    NgbToastModule,
    NgbTooltipModule,
    FullCalendarModule,
    SlickCarouselModule,
    FlatpickrModule.forRoot(),
    TranslateModule,
    SharedModule,
  ],
  exports:[

  ],
  providers: [
    DatePipe,
    { provide: LOCALE_ID, useValue: 'es' }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PagesModule { 
  constructor() {
    defineElement(lottie.loadAnimation);
  }
}
