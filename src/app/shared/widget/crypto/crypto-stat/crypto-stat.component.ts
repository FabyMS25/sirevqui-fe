import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-crypto-stat',
  templateUrl: './crypto-stat.component.html',
  styleUrls: ['./crypto-stat.component.scss']
})

/**
 * Crypto Stat Component 
 */
export class CryptoStatComponent implements OnInit {

  @Input() title: string | undefined;
  @Input() value: any | undefined;
  @Input() color: string | undefined;
  @Input() icon: string | undefined;
  @Input() persantage: string | undefined;
  @Input() profit: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  num: number = 0;
  option = {
    startVal: this.num,
    useEasing: true,
    duration: 2,
    decimalPlaces: 2,
  };

}
