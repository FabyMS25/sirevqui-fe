import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbNavModule, NgbDropdownModule, NgbAccordionModule, NgbTooltipModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

// Swiper Slider
import { SlickCarouselModule } from 'ngx-slick-carousel';
// Select Droup down
import { NgSelectModule } from '@ng-select/ng-select';
// Flatpicker
import { FlatpickrModule } from 'angularx-flatpickr';

// Feather Icon
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';

// Ng Search 
import { NgPipesModule } from 'ngx-pipes';

// Load Icon
import { defineElement } from "@lordicon/element";
import lottie from 'lottie-web';

// Component pages
import { ExtraPagesRoutingModule } from './extrapages-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { FaqsComponent } from './faqs/faqs.component';
import { PricingComponent } from './pricing/pricing.component';

@NgModule({
  declarations: [
    FaqsComponent,
    PricingComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbNavModule,
    NgbDropdownModule,
    NgbAccordionModule,
    NgbTooltipModule,
    NgbPaginationModule,
    SlickCarouselModule,
    NgSelectModule,
    FlatpickrModule,
    ExtraPagesRoutingModule,
    SharedModule,
    FeatherModule.pick(allIcons),
    NgPipesModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ExtraspagesModule { 
  constructor() {
    defineElement(lottie.loadAnimation);
  }
}
