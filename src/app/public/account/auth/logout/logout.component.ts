import { Component, OnInit } from '@angular/core';
import { GlobalComponent } from 'src/app/global-component';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})

/**
 * Logout Component
 */
export class LogoutComponent implements OnInit {
  APP_NAME = GlobalComponent.NAME_APP;
  year: number = new Date().getFullYear();

  constructor() { }

  ngOnInit(): void {
  }

}
