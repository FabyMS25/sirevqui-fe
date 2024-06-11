import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-twostep',
  templateUrl: './twostep.component.html',
  styleUrls: ['./twostep.component.scss']
})

/**
 * Two Step Component
 */
export class TwoStepComponent implements OnInit {

  // set the current year
  year: number = new Date().getFullYear();

  constructor() { }

  ngOnInit(): void {
  }

   /**
   * Confirm Otp Verification
   */
    config = {
      allowNumbersOnly: true,
      length: 4,
      isPasswordInput: false,
      disableAutoFocus: false,
      placeholder: '',
      inputStyles: {
        'width': '80px',
        'height': '50px'
      }
    };

}
