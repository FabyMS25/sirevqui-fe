import { CommonModule, Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GlobalComponent } from 'src/app/global-component';

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    NgbModule,
  ],
})
export class TermsConditionsComponent implements OnInit {

  year: number = new Date().getFullYear();
  title = 'NORMATIVAS Y CONDICIONES DE USO ';
  info = GlobalComponent.contact_info
  @Input() buttons: boolean = true; 

  constructor(private location: Location) {}

  ngOnInit(): void {}

  goBack() {
    this.location.back();
  }
}
