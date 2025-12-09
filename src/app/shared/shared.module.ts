import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbNavModule, NgbAccordionModule, NgbDropdownModule, NgbPaginationModule, NgbTypeaheadModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { FlatpickrModule } from 'angularx-flatpickr';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CountUpModule } from 'ngx-countup';

import { LandingScrollspyDirective } from './landingscrollspy.directive';
import { ScrollspyDirective } from './scrollspy.directive';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { DataHeaderComponent } from './data-header/data-header.component';
import { DataTableComponent } from './data-table/data-table.component';
// import { LeafletComponent } from './map/leaflet.component';
// import { ModalImportComponent } from './modal-import/modal-import.component';
/* extrapages stanalone */
import { TermsConditionsComponent } from './extraspages/terms-conditions/terms-conditions.component';
import { PrivacyPolicyComponent } from './extraspages/privacy-policy/privacy-policy.component';


@NgModule({
  declarations: [
    ScrollspyDirective,
    LandingScrollspyDirective,
    BreadcrumbsComponent,
    DataHeaderComponent,
    DataTableComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    CountUpModule,
    NgbNavModule,
    NgbAccordionModule,
    NgbDropdownModule,
    SlickCarouselModule,    
    NgbPaginationModule,
    ReactiveFormsModule,
    NgbTypeaheadModule,
    NgbTooltipModule,
    FlatpickrModule,
    NgSelectModule,

    TermsConditionsComponent,
    PrivacyPolicyComponent,
  ],
  providers: [ DatePipe ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    ScrollspyDirective,
    LandingScrollspyDirective,
    BreadcrumbsComponent,
    DataHeaderComponent,
    DataTableComponent,
    TermsConditionsComponent, 
    PrivacyPolicyComponent,
  ]
})
export class SharedModule { }
