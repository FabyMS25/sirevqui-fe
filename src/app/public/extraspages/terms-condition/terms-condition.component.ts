import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalComponent } from 'src/app/global-component';

@Component({
  selector: 'app-terms-condition-out',
  templateUrl: './terms-condition.component.html',
  styleUrls: ['./terms-condition.component.scss']
})
export class TermsConditionComponent implements OnInit {

  year: number = new Date().getFullYear();
  title = 'NORMATIVAS DE INSPECCION Y CERTIFICACIÓN VEHICULAR';
  contentType: string='';
  info = GlobalComponent.contact_info

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    document.documentElement.setAttribute('data-sidebar-size', 'lg');
    this.route.data.subscribe(data => {
      this.contentType = data['contentType'];
      if(this.contentType == 'policy') 
        this.title = 'Politicas de Privacidad';
    });
  }
}
