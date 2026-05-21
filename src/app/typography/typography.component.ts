import { Component, OnInit, ChangeDetectorRef, Renderer2, ViewChild, ElementRef, AfterViewInit  } from '@angular/core';
import DataTable from 'datatables.net-dt';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})
export class TypographyComponent implements OnInit {

  table:any;
  tableData = [];
  data:any;
  truck:any
  from:any;
  to:any;
  selectedvehicle :any;
  isBefore:any
  pdfBeforeUrl:any;
  pdfAfterUrl  :any
  constructor(private http: HttpClient,private renderer: Renderer2,private sanitizer: DomSanitizer) { }

  ngOnInit() {
    const customerKey = 'customer_id';

    // Retrieve the value from local storage
    const customerIdString = localStorage.getItem(customerKey);
    const cus = {
      customerid:customerIdString
    }
    this.selectcustomer(customerIdString)
    const url = 'https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=getAlloyByCustomer';
    this.http.post(url,cus).subscribe(
      (response) => {
        this.data = response
      
      })
    

}
selectcustomer(event){

       const url = `https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=getTruck&customer_id=${event}`;
      this.http.get(url).subscribe(
        (response) => {
  this.truck =  response['body'];
          console.log("response truck",response)
        })
    }
  
closeModal(modalId: string): void {
  const modal = document.getElementById(modalId);
  if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
  }
}
selectvehicle(event){
  this.selectedvehicle = event
  
    }
filter(){

  const filter = {
    vehicle:this.selectedvehicle,
  from_date :this.from,
  to_date:this.to
  }
  const url = `https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=getAlloyFilter`;
  this.http.post(url,filter).subscribe(
    (response) => {
console.log("response",response)
this.data = response




    }
  )
}
openModal(pdfUrl: string, isBefore: boolean) {
  console.log("functionentered")
  const modal = document.getElementById('showModal');
  if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
  }
  this.isBefore = isBefore;
  if (isBefore) {
    const unsafeUrl =  pdfUrl;

  
    // Use DomSanitizer to bypass Angular's security mechanism for trusted URLs
    this.pdfBeforeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
  } else {
    const unsafeUrl =  pdfUrl
    console.log("unsafeUrl", unsafeUrl);
  
    // Use DomSanitizer to bypass Angular's security mechanism for trusted URLs
    this.pdfAfterUrl  = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);

    
  }
}
}