import { Component, OnInit } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';

import { swiperModel, GalleryModel, NewsModel, VideoModel } from './search-results.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})

export class SearchResultsComponent implements OnInit {
  breadCrumbItems!: Array<{}>;

  swiper!: swiperModel[];
  gallery!: GalleryModel[];
  news!: NewsModel[];
  video!: VideoModel[];
  images: { src: string; thumb: string; caption: string }[] = [];

  constructor(private lightbox: Lightbox) {
    for (let i = 1; i <= 5; i++) {
      const src = 'assets/images/small/img-'+i+'.jpg';
      const caption = 'Image ' + i + ' caption here';
      const thumb = '../../../../assets/images/small/img-' + i + '-thumb.jpg';
      const item = {
        src: src,
        caption: caption,
        thumb: thumb
      };
      this.images.push(item);
    }
  }

  ngOnInit(): void {
     this.breadCrumbItems = [
      { label: 'Pages' },
      { label: 'Search Results', active: true }
    ];
    this._fetchData();
  }

  private _fetchData() {
    // this.swiper = swiper;
    // this.gallery = gallery;
    // this.news = news;
    // this.video = video;
  }


  open(index: number): void {
    this.lightbox.open(this.images, index, { });
  }

  slideConfig = {
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000,
    arrows: false
  };

}
