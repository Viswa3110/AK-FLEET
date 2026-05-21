import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  // { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
  // { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
  { path: '/table-list', title: 'tyre',  icon:'content_paste', class: '' },
  // { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
  // { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
  // { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
  // { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
  // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  menuItems: any[];
  constructor() { }

  tyres=false
  startAnimationForLineChart(chart){
    
      };
  startAnimationForBarChart(chart){
        };

  tyre(){
    console.log("hi")
 this.tyres = false
  }
  tyre1(){
    console.log("hi")
    this.tyres = true
     }
 
  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
      /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

  }
 
 
}
