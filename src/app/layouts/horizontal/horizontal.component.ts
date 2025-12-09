import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-horizontal',
  templateUrl: './horizontal.component.html',
  styleUrls: ['./horizontal.component.scss']
})

export class HorizontalComponent implements OnInit {

  constructor() { }

  isCondensed = false;

  ngOnInit(): void {
  }

   onSettingsButtonClicked() {
    document.body.classList.toggle('right-bar-enabled');
    const rightBar = document.getElementById('theme-settings-offcanvas');
    if(rightBar != null){
      rightBar.classList.toggle('show');
      rightBar.setAttribute('style',"visibility: visible;");
    }
  }

   onToggleMobileMenu() {     
   if (document.documentElement.clientWidth <= 1024) {
     document.body.classList.toggle('menu');
   }
 }

}
