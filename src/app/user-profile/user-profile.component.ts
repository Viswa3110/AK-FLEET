import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private http: HttpClient) { }
  selectedcustomer:any
  selecteduser:any
  hide = true;
  cus:any
  usr:any
  ngOnInit() {

    const customerKey = 'customer_id';

    // Retrieve the value from local storage
    const customerIdString = localStorage.getItem(customerKey);
    const customer = 'id';

    // Retrieve the value from local storage
    const customerId = localStorage.getItem(customer);
    
this.cus = customerIdString;
this.usr = customerId


    const url = `https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=getCustomerbyid&customerid=${customerIdString}`;
    this.http.get(url).subscribe(
      (response: any) => {

  console.log("response",response['body'])
  this.selectedcustomer = response['body']

  const url = `https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=getUser&customer_id=${customerIdString}&user_id=${customerId}`;
    this.http.get(url).subscribe(
      (response: any) => {

        this.selecteduser = response['body']
        console.log("this.selecteduser",response['body'])
      })
      })
  }
  togglePasswordVisibility() {
    this.hide = !this.hide;
}
update(){

  
  const username = (document.getElementById('username') as HTMLInputElement).value;
  const email = (document.getElementById('email') as HTMLInputElement).value;
  const password = (document.getElementById('password') as HTMLInputElement).value;
  const companyadd = (document.getElementById('companyadd') as HTMLInputElement).value;
  const company = (document.getElementById('company') as HTMLInputElement).value;
  const mobile = (document.getElementById('mobile') as HTMLInputElement).value;
console.log("username",username,email,password,companyadd,company,mobile)

const customer={
customerid:this.selectedcustomer.customerid,
companyAddress:companyadd,
companyname:company
}
const user = {
login_id:this.selecteduser.login_id,
username: username,
password_hash: password,
email: email
}
this.http.post<any>('https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=updateUser', user).subscribe(
  (response) => {
   
    this.http.post<any>('https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=editcustomers', customer).subscribe(
      (response) => {
    
        const url = `https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=getCustomerbyid&customerid=${this.cus}`;
    this.http.get(url).subscribe(
      (response: any) => {

  console.log("response",response['body'])
  this.selectedcustomer = response['body']
      })
      const url1 = `https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=getUser&customer_id=${this.cus}&user_id=${this.usr}`;
    this.http.get(url1).subscribe(
      (response: any) => {

        this.selecteduser = response['body']
        console.log("this.selecteduser",response['body'])
      })

      })

  })

}

}
