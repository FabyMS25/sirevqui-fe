import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbNavModule, NgbDropdownModule, NgbAccordionModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

// Swiper Slider
import { SlickCarouselModule } from 'ngx-slick-carousel';
// Select Droup down
import { NgSelectModule } from '@ng-select/ng-select';
// Flatpicker
import { FlatpickrModule } from 'angularx-flatpickr';

// Load Icon
import { defineElement } from '@lordicon/element';
import lottie from 'lottie-web';

// Ng Search 
import { NgPipesModule } from 'ngx-pipes';

// Component pages
import { ExtraPagesRoutingModule } from './extrapages-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { SitemapComponent } from './sitemap/sitemap.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { ExtraPagesComponent } from './extra-pages-in/extra-pages-layout.component';

@NgModule({
  declarations: [
    ExtraPagesComponent,
    SitemapComponent,
    SearchResultsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbNavModule,
    NgbDropdownModule,
    NgbAccordionModule,
    NgbTooltipModule,
    SlickCarouselModule,
    NgSelectModule,
    FlatpickrModule,
    ExtraPagesRoutingModule,
    SharedModule,
    NgPipesModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ExtraspagesModule { 
  constructor() {
    defineElement(lottie.loadAnimation);
  }
}
