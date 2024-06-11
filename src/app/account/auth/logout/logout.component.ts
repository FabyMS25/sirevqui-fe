import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})

/**
 * Logout Component
 */
export class LogoutComponent implements OnInit {

  // set the current year
  year: number = new Date().getFullYear();

  constructor() { }

  ngOnInit(): void {
  }

}
