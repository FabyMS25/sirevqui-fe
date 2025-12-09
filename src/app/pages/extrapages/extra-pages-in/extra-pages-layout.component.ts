import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-extra-pages-in',
  templateUrl: './extra-pages-layout.component.html',
  styleUrls: ['./extra-pages-layout.component.scss']
})
export class ExtraPagesComponent implements OnInit {

  breadCrumbItems!: Array<{}>;
  year: number = new Date().getFullYear();
  title: string = '';
  pageType: string = '';
  @Input() faqs!: boolean ;
  @Input() TermsConditions!: boolean ; 
  @Input() PrivacyPolicy!: boolean ; 

  @Input() buttons: boolean = true; 

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Accessing route data
    this.route.data.subscribe(data => {
      this.pageType = data['pageType'];
      this.title = data['title'];
    });
    if(this.TermsConditions) this.title = 'Terminos & Condiciones de Uso' 
    if(this.PrivacyPolicy) this.title = 'Política de Privacidad'

    this.breadCrumbItems = [
      { label: '' },
      { label: this.title, active: true }
    ];
  }

  // goBack() {
  //   this.location.back();
  // }
}
