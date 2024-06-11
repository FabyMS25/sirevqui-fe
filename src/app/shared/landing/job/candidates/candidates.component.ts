import { Component, OnInit } from '@angular/core';
import { candidates } from './data';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent implements OnInit {

  candidates: any;

  constructor() { }

  ngOnInit(): void {

    // Fetch Data
    this.candidates = candidates
  }

  /**
  * Swiper Responsive setting
  */
  public Responsive = {
    infinite: true,
    slidesToShow: 4,
    autoplay: true,
    dots: true,
    arrows: false
  };

}
