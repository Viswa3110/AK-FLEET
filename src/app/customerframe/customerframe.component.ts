import { Component, OnInit, ChangeDetectorRef, Renderer2, ViewChild, ElementRef, AfterViewInit  } from '@angular/core';
import DataTable from 'datatables.net-dt';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-customerframe',
  templateUrl: './customerframe.component.html',
  styleUrls: ['./customerframe.component.scss']
})
export class CustomerframeComponent implements OnInit {

  constructor(private http: HttpClient,private renderer: Renderer2) { }
 customer:any;
 details:any;
  ngOnInit(): void {
    this.customr()
  }

  customr(){
    const url = 'https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=getCustomers';
  this.http.get(url).subscribe(
    (response) => {
      this.customer = response['body'];
    })
    
  }
  copyPassword() {
    const passwordField = document.getElementById('passwordDisplay') as HTMLInputElement;
    // Use Clipboard API to copy the text
    if (passwordField) {
      navigator.clipboard.writeText(passwordField.value).then(() => {
        alert('Password copied to clipboard!');
      }).catch(err => {
        console.error('Error copying text: ', err);
      });
    }
  }
  
  select(event){
    const url = `https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=getuserdetails&customer_id=${event}`;
    this.http.get(url).subscribe(
      (response) => {
console.log("response",response['body'][0])

this.details = response['body'][1]
      })
  }
}
