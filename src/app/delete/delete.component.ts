import { Component, OnInit, ChangeDetectorRef, Renderer2 } from '@angular/core';
import DataTable from 'datatables.net-dt';
import config from 'datatables.net-dt';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  constructor(private http: HttpClient,private renderer: Renderer2) { }
  data :any;
  table:any;
  customers:any;
  custom:any;
  modalImageSrc:any;
  createpro:any;
  createrate:any;
  selectedcus:any;
  switch1:any;
  main:any;
  pr:any;
  pancardData1:any;
  adharData1:any;
  createpro1:any;
  productone:any;
  switch:any;
  createrate1:any;
  pro: string = '';
  rate: string = '';
  pro1:string = ''; 

  ngOnInit(): void {
//     const apiUrl = 'https://aktyres-in.stackstaging.com/php-rest-api/class/employees.php?route=getDeleteRecords';

// this.http.get(apiUrl).subscribe(
//   (response) => {
//     // Handle successful response
//     this.data = response['body'];
//     console.log('this.product', this.data);

//     const button = this.renderer.createElement('button');
//     this.renderer.addClass(button, 'btn');
//     this.renderer.addClass(button, 'btn-info');
//     this.renderer.appendChild(button, this.renderer.createText('Edit'));
//     this.renderer.listen(button, 'click', () => {
//       this.sendProductId(this.data);
//     });

//     const tableData = [
//       1,
//       this.data.Invoiceid,
//       this.data.orderId,
//       this.data.product,
//       this.data.screenshot,
//       this.data.TotalCost,
//       this.data.paymenttype,
//       this.data.paymentNo,
//       this.data.Credit,
//       this.data.Debit,
//       this.data.Balance,
//       this.data.Date,
//       this.data.customer_id,
//       this.data.interestvalue,
//       button // Only one button added here
//     ];

//     // Initialize DataTable with transformed data
//     this.table = new DataTable('#myTable', {
//       data: [tableData],
//     });
//   },
//   (error) => {
//     // Handle error
//     console.error('Error fetching data:', error);
//   }
// );
this.getCustomers();
const apiUrl = 'https://aktyres-in.stackstaging.com/php-rest-api/class/employees.php?route=getDeleteRecords';

this.http.get(apiUrl).subscribe(
  (response) => {
    // Handle successful response
    this.data = response['body'];
    console.log('this.product', this.data);

    const tableData = this.data.map((item, index) => {
      const button = this.renderer.createElement('button');
      this.renderer.addClass(button, 'btn');
      this.renderer.addClass(button, 'btn-info');
      this.renderer.appendChild(button, this.renderer.createText('Revert'));
      this.renderer.listen(button, 'click', () => {
        this.sendProductId(item);
      });

      const pancardImg = this.renderer.createElement('img');
      this.renderer.setAttribute(pancardImg, 'src', item.product);
      this.renderer.setStyle(pancardImg, 'width', '50px');
      this.renderer.setStyle(pancardImg, 'height', 'auto');
      this.renderer.setStyle(pancardImg, 'cursor', 'pointer');
      this.renderer.listen(pancardImg, 'click', () => {
        this.showImageModal(item.pancard);
      });

      return [
        index + 1,
        item.Invoiceid,
        item.orderId,
        item.name,
        
        // item.product,
        // item.screenshot,
        item.TotalCost,
        item.paymenttype,
        item.paymentNo,
        item.Credit,
        item.Debit,
        item.Balance,
        item.Date,
        item.customer_id,
        item.interestvalue,
        button // Add button as HTML string
      ];
    });

    // Initialize DataTable with transformed data
    this.table = new DataTable('#myTable', {
      data: tableData
    });
  },
  (error) => {
    // Handle error
    console.error('Error fetching data:', error);
  }
);


  }
  getCustomers(){
    const url = 'https://aktyres-in.stackstaging.com/php-rest-api/class/employees.php?route=getCustomers';
    this.http.get(url).subscribe(
      (response) => {
        // Handle successful response
        
        this.customers = response['body'];
        this.custom = response['body'];
        console.log('this.customers', this.customers);
  
      },
      (error) => {
        // Handle error
        console.error('Error fetching orders:', error);
      }
    );
  }
  closeModal(modalId: string): void {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        modal.style.display = 'none';
    }
  }
  showImageModal(imageData) {

    console.log("enetered")
    // Update the src attribute of the modal image with the imageData
    const modalImage = document.getElementById('modalImage') as HTMLImageElement;
    modalImage.src =  imageData;
    this.modalImageSrc = imageData;
    // Show the modal
    
    const modal = document.getElementById('viewModal');
    if (modal) {
        modal.classList.add('show');
        modal.style.display = 'block';
    }
  }
  downloadImage(dataUri: string) {
    // Convert data URI to Blob
    const byteString = atob(dataUri.split(',')[1]);
    const mimeString = dataUri.split(',')[0].split(':')[1].split(';')[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uintArray = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      uintArray[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([arrayBuffer], { type: mimeString });
  
    // Create a link element to trigger the download
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'image.jpg'; // Default filename
  
    // Append the link to the body and trigger the download
    document.body.appendChild(link);
    link.click();
  
    // Clean up
    document.body.removeChild(link);
  }
  sendProductId(event){
   console.log("event",event)
   this.pr = event
   const filterParams = {
    orderId:event.orderId
   }

   this.http.post<any>('https://aktyres-in.stackstaging.com/php-rest-api/class/employees.php?route=restoreorder', filterParams).subscribe(
    (response) => {
      
      const selectedCustomer = this.customers.find(customer => customer.customerid == event.customer_id);
    
      const filterParams1= {
      customerid:event.customer_id,
      balance: (selectedCustomer.balance + event.Balance)
     }
     this.http.post<any>('https://aktyres-in.stackstaging.com/php-rest-api/class/employees.php?route=editcustomers', filterParams1).subscribe(
      (response) => {
    console.log("response",response)
    
      })
      const apiUrl = 'https://aktyres-in.stackstaging.com/php-rest-api/class/employees.php?route=getDeleteRecords';

this.http.get(apiUrl).subscribe(
  (response) => {
    // Handle successful response
    console.log("response",response)
    this.data = response['body'];
    


    const tableData = this.data.map((item, index) => {
      const button = this.renderer.createElement('button');
      this.renderer.addClass(button, 'btn');
      this.renderer.addClass(button, 'btn-info');
      this.renderer.appendChild(button, this.renderer.createText('Revert'));
      this.renderer.listen(button, 'click', () => {
        this.sendProductId(item);
      });

      const pancardImg = this.renderer.createElement('img');
      this.renderer.setAttribute(pancardImg, 'src', item.product);
      this.renderer.setStyle(pancardImg, 'width', '50px');
      this.renderer.setStyle(pancardImg, 'height', 'auto');
      this.renderer.setStyle(pancardImg, 'cursor', 'pointer');
      this.renderer.listen(pancardImg, 'click', () => {
        this.showImageModal(item.pancard);
      });

      return [
        index + 1,
        item.Invoiceid,
        item.orderId,
        pancardImg,
        // item.product,
        // item.screenshot,
        item.TotalCost,
        item.paymenttype,
        item.paymentNo,
        item.Credit,
        item.Debit,
        item.Balance,
        item.Date,
        item.customer_id,
        item.interestvalue,
        button // Add button as HTML string
      ];
    });
    this.table.destroy();
    // Initialize DataTable with transformed data
    this.table = new DataTable('#myTable', {
      data: tableData
    });
    window.alert("Reverted successfully")
  },
  (error) => {
    // Handle error
    if (error.status === 404) {
      console.log('No data found');
      this.table.destroy();
      this.table = new DataTable('#myTable', {
        data: []
      });
    }
    console.error('Error fetching data:', error);
  }
);
     })
  }
}
