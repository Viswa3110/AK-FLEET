import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/upgrade', title: 'Invoice',  icon:'admin_panel_settings', class: '' },
  { path: '/customer', title: 'Customer',  icon:'group', class: '' },
  { path: '/product', title: 'Product',  icon:'inventory', class: '' },
  { path: '/Delete', title: 'Delete',  icon:'delete', class: '' },
  { path: '/customerframe', title: 'Admin',  icon:'', class: '' },
   { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
  { path: '/Truck', title: 'Truck',  icon:'directions_car', class: '' },
  { path: '/Driver', title: 'Driver',  icon:'panorama_fish_eye', class: '' },
  { path: '/AlloyResult', title: 'AlloyResult',  icon:'panorama_fish_eye', class: '' },
    { path: '/notifications', title: 'Complaints',  icon:'notifications', class: '' },
    
        { path: '/TyreEntry', title: 'Pressure',  icon:'directions_car', class: '' },
        
  
  
   
    
];


export const ROUTES1: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
  // { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
  // { path: '/table-list', title: 'Tyre',  icon:'panorama_fish_eye', class: '' },
  // { path: '/typography', title: 'Alloy',  icon:'extension', class: '' },
  // { path: '/icons', title: 'Vehicle Details',  icon:'directions_car', class: '' },
  { path: '/maps', title: 'Summary',  icon:'books', class: '' },
  // { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
  // { path: '/upgrade', title: 'admin',  icon:'admin_panel_settings', class: '' },
  { path: '/Truck', title: 'Truck',  icon:'directions_car', class: '' },
  { path: '/Driver', title: 'Driver',  icon:'panorama_fish_eye', class: '' },
   { path: '/typography', title: 'Alloy',  icon:'extension', class: '' },
  
  // { path: '/customer', title: 'Customer',  icon:'group', class: '' },
  // { path: '/product', title: 'Product',  icon:'inventory', class: '' },
  // { path: '/DriverPage', title: 'DriverPage',  icon:'', class: '' },
  // { path: '/Delete', title: 'Delete',  icon:'delete', class: '' }

];

export const ROUTES2: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
  // { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
  // { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
  // { path: '/table-list', title: 'Tyre',  icon:'panorama_fish_eye', class: '' },
  // { path: '/typography', title: 'Alloy',  icon:'extension', class: '' },
  // { path: '/icons', title: 'Vehicle Details',  icon:'directions_car', class: '' },
  // { path: '/maps', title: 'Summary',  icon:'books', class: '' },
  // { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
  // { path: '/upgrade', title: 'admin',  icon:'admin_panel_settings', class: '' },
  // { path: '/Truck', title: 'Truck',  icon:'directions_car', class: '' },
  // { path: '/Driver', title: 'Driver',  icon:'panorama_fish_eye', class: '' },
  // { path: '/customer', title: 'Customer',  icon:'group', class: '' },
  // { path: '/product', title: 'Product',  icon:'inventory', class: '' },
  { path: '/DriverPage', title: 'DriverPage',  icon:'', class: '' },
  // { path: '/Delete', title: 'Delete',  icon:'delete', class: '' }

];
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  sharedVariable:any;
  constructor(private AppComponent: AppComponent) { }

  ngOnInit() {
    const customerKey = 'role';
    this.sharedVariable =   localStorage.getItem(customerKey);
    console.log("this.sharedVariable",this.sharedVariable)
    if(this.sharedVariable == 'admin'){
      this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    else if(this.sharedVariable == 'user'){
      this.menuItems = ROUTES1.filter(menuItem => menuItem);
    }
    else if(this.sharedVariable == 'driver'){
      this.menuItems = ROUTES2.filter(menuItem => menuItem);
    }
  }
  style(){
    document.querySelector('.sidebar')?.classList.toggle('sidebar-small');
  }
  open(){

    console.log("entered")
    localStorage.removeItem('jwt');
    location.reload();
    const customerKey = 'customer_id';

    // Retrieve the value from local storage
    const customerIdString = localStorage.getItem(customerKey);
    console.log("customerIdString",customerIdString)
}
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
