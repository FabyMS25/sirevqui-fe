import { CommonModule, Location } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
  ],
})
export class PrivacyPolicyComponent {

  @Input() buttons: boolean = true; 

  constructor(private location: Location) {}

  ngOnInit(): void {}

  goBack() {
    this.location.back();
  }

}
