import { Component, OnInit,ElementRef, ViewChild,AfterViewInit,Renderer2  } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import * as $ from 'jquery';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as DataTables from 'datatables.net';
import fromHTML from 'jspdf';
import  jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import 'jspdf-autotable';
import DataTable from 'datatables.net-dt';
// import html2canvas from 'html2canvas';
import { drawDOM, exportPDF } from "@progress/kendo-drawing";
import { saveAs } from "@progress/kendo-file-saver";

// Import DataTables and its Bootstrap 4 extension
import 'datatables.net';
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.css']
})
export class UpgradeComponent implements OnInit {
  @ViewChild('getModal') getModal!: ElementRef;
  @ViewChild('getModal') htmlData:ElementRef;
  orders:any;
  customers:any;
  cheque =false;
  gpay = false;
  unsafeUrl:any;
  showdata=false
  fileUrl:any
  fileUrl1:any;
  sel:any;
  locationpdf:any;
  invoiceitem:any;
  response=false
  showPreview:any;
  toDatepay:any;
  fromDatepay:any;
  paydate:any;
  paymentfiltered:any;
  remainingBalance:any;
  yes=false
  checkpay:any
  selectedpaycustomer:any;
  editcustomer:any
  remaingamount:any;
  receptrue = false
  totalQuantity: number = 0;
  selectedFile:any;
  ledgerData = [
    {
      "Date": "2024-11-01",
      "Particulars": "HDFC BANK ACCOUNT",
      "VCH_TYP": "RECEIPT",
      "VCH_NO": "5",
      "Debit": "",
      "Credit": "30000"
    },
    // Add more data entries as needed
  ];
  r = [
    // Example data structure
    {
      purchaseDate: '2023-05-18',
      customer_id: '12345',
      name: 'John Doe',
      mobile_number: '1234567890',
      Invoiceid: 'INV123',
      Date: '2023-05-18',
      product: { name: 'Product A' },
      TotalCost: '100.00',
      paymenttype: 'Credit Card',
      paymentNo: 'PAY123',
      Debit: '0.00',
      Credit: '100.00',
      Balance: '100.00',
      interestvalue: '5%'
    },
    // Add more data items here...
  ];
  bills:any
  selectaccounted:any;
  filteredEvents:any;
  selectedCustom:any;
  selcsr:any;
  paymentopen:any;
  account:any;
  pdfOptions1 = {
    paperSize: "A4",
    margin: {
      left: "0.75cm",
      top: "0.60cm",
      right: "0.75cm",
      bottom: "0.60cm",
    },
    keepTogether: "table , .common",
    scale: 0.52,
    landscape: false,
    // forcePageBreak: ".pageBreak",
  };
  selectedrow:any;
  payname:any;
  editpayment:any;
  custom2:any
  lastbal:any;
  ispay = false
  amount_paid:any;
  billscredit:any;
  chequenumber:any;
  custrue:any
  paycredit:any;
  fromDate1:any
  paydata:any
  toDate1:any;
  billsdebit:any
  paydebit:any;
  pbalance:any;
  bill1:any;
  bill12:any;
  PurchaseDate:any;
  invoiceDate:any;
  intervalId:any;
  paymentevents:any;
  number:any;
  bill:any;
  pic1:any;
  isDiscountActive = false;
  order:any;
  PAY:any;
  enteredPage: number;
  selectedrecipt:any;
  selectedres:any;
pageSize: number = 7;
  searchQuery:any;
  pic:any;
  selectedid:any;
  selectedCustomer: any;
  product:any;
  inv:any;
  // custom:any;
  creditlimit:any;
  switch:any;
  selectedproduct:any;
  realorders:any;
  table:any;
  custom :any;
  custom1 :any;
  fromDate:any;
  isLoading = false;
  toDate:any
  notes:any;
  currentPage = 1;
  rowsPerPage = 10;
  totalPages :any;
  totalPagesArray :any;
  real:any;
  openingbal:any;
  openingint:any;
  closingBal:any;
  closingint:any;
  twoenters= false
  
  // dtOptions: DataTables.Settings = {};
  //dtTrigger: Subject<any> = new Subject();
  rows = [{ productId: null,product:"", quantity: 1,total:0,discount:0,supertotal:0,SGST:0,CGST:0,premiumtotal:0 }];
  recipt=[{pay:0,balance:0,screenshot:"",number:0}]
  constructor(private http: HttpClient,private renderer: Renderer2,private sanitizer: DomSanitizer) { }
  ngOnInit() {

    this.account = [{
      item:"AK TYRES OD CANARA"
    },{
      item:"HDFC BANK ACCOUNT"
    },
    {
      item:"AK TYRES CANARA"
    }]
    this.getCustomers();
    // this.getProducts();
    this.invoicenumber();
    this.orderNumber();
    this.Balance();
    // this.fetch();
    this.calculateinterst()
    const url1 = 'https://aktyres-in.stackstaging.com/php-rest-api/class/employees.php?route=getproduct';
    this.http.get(url1).subscribe(
      (response) => {
        // Handle successful response
        
        this.product = response['body'];
        console.log('this.product', this.product);
  
      },
      (error) => {
        // Handle error
        console.error('Error fetching orders:', error);
      }
    );

    const url = 'https://aktyres-in.stackstaging.com/php-rest-api/class/employees.php?route=getorders';
    this.http.get(url).subscribe(
      (response: any) => {
        console.log('Orders:', response);
        if(response['body']){
this.isLoading = true
        }
        this.orders = response['body']; 


        this.real =  response['body']
        
        // this.realorders = response['body'];// Assuming response is an array of objects
        this.totalPages = Math.ceil(this.orders.length / this.rowsPerPage);
  this.totalPagesArray = Array(this.totalPages).fill(0).map((x, i) => i + 1);

  this.populateTable(this.currentPage,this.orders);
  
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );

    

  }
  formatDate(dateString) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    // Parse the input date string
    const date = new Date(dateString);

    // Extract the day, month, and year
    const day = String(date.getDate()).padStart(2, "0");
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    // Format the date as DD/Mon/YYYY
    return `${day}/${month}/${year}`;
}


  editedpayment(){
    const customer = (document.getElementById('customer1') as HTMLInputElement).value;
    const amount_paid = (document.getElementById('amount_paid1') as HTMLInputElement).value;
    const handcash = (document.getElementById('handcash1') as HTMLInputElement).value;
    const gpay = (document.getElementById('gpay1') as HTMLInputElement).value;
    const cheque = (document.getElementById('cheque1') as HTMLInputElement).value;
    const account = (document.getElementById('account1') as HTMLInputElement).value;
    const payremark = (document.getElementById('payremark1') as HTMLInputElement).value;
    const paydate = (document.getElementById('paydate1') as HTMLInputElement).value;
   let editcustomer
   let editaccount
  if(this.editcustomer == "" || undefined ||null){
    editcustomer =  this.editpayment.customer_number
  }
  else{
    editcustomer = this.editcustomer
  }
  if(this.selectaccounted == "" || undefined ||null){
    editaccount =   this.editpayment.account
  }
  else{
    editaccount = this.selectaccounted
  }
    const payment = {
      id:this.editpayment.id,
      amount:amount_paid,
      customer_number: customer,
      pay_date: paydate,
      hand_cash: handcash,
      cheque_no: cheque,
      account: account,
      remark: payremark,
      gpay:gpay
    }


 console.log("payment",payment)

 const url4 = 'https://aktyres-in.stackstaging.com/php-rest-api/class/employees.php?route=editpayment';

 // Issue a PUT request to the API endpoint
 this.http.post(url4, payment).subscribe(
   (response) => {
    const url = 'https://aktyres-in.stackstaging.com/php-rest-api/class/employees.php?route=getCustomerPayments';
    const customer_number = {
      customer_number:this.custom2
    }
    this.http.post(url,customer_number).subscribe(
      (response) => {
       console.log("response",response)
       this.paydata = response;
  
       const tableData = this.paydata.map((item, index) => {
      
        const button = this.renderer.createElement('button');
        this.renderer.addClass(button, 'btn');
        this.renderer.addClass(button, 'btn-info');
        this.renderer.appendChild(button, this.renderer.createText('Edit'));
        this.renderer.listen(button, 'click', () => {
          this.selectedpayment(item);
        });
        
         return [
           index + 1,
           item.name,
         
           item.pay_date,
           item.hand_cash,
           item.cheque_no,
           item.account,
           item.remark,
           item.amount,
           item.gpay,
           button
         ];
       });
       this.table.destroy();
       // Initialize DataTable with transformed data
       this.table = new DataTable('#myTable', {
         data: tableData,
       });
    
  
      },
      (error) => {
        // Handle error
        console.error('Error fetching orders:', error);
      }
    )
    document.querySelectorAll('.toast').forEach(function(toast) {
      // Add the 'show' class to display the toast
      toast.classList.add('show');
      
      // Set a timeout to remove the 'show' class after 2 seconds
      setTimeout(function() {
          toast.classList.remove('show');
      }, 2000); // 2000 milliseconds = 2 seconds
  });
   })
   this.ispay = false
  }
  selectedpayment(item){
console.log("payment",item)
this.editpayment = item
this.ispay = true
  }


  startTrigger() {

      this.myFunction();
  
  }
  myFunction() {
    this.getCustomers();
  
  }
  closePreview() {

    this.fileUrl = null
    this.fileUrl1 = null
    this.response = false
    console.log("fileUrl1",this.fileUrl1)
    this.showPreview = false;
    const modal = document.getElementById('pdfmodal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
  }
  }
  convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = (reader.result as string);
        // Remove the "data:application/pdf;base64," part
        const cleanBase64 = base64String.replace(/^data:application\/pdf;base64,/, '');
        resolve(cleanBase64);
      };
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file); // Read file as Data URL to get Base64
    });
  }
  uploadFile(payload: any) {
    const uploadUrl = 'https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=uploadPDF'; // Add your API endpoint here
    return this.http.post(uploadUrl, payload);
  }
  upload(item){
    console.log("item",item)
    this.invoiceitem = item
    this.fileUrl1 = null
    this.fileUrl = null
    const url1 = `https://aktyres-in.stackstaging.com/php-rest-api/class/employees.php?route=getInvoiceFiles&invoice_id=${item.Invoiceid}`;
    this.http.get(url1).subscribe( (response) => {
      console.log("response",response)
      if(response["message"] == "No records found."){
        this.response = false
console.log("enteredin")
        this.fileUrl = null
        this.fileUrl1 = null
        this.showdata = false
      }
      else{
        this.showdata = true
        response[0].file_name = 'https://aktyres-in.stackstaging.com/php-truck/class/' + response[0].file_name
        this.fileUrl1 = this.sanitizer.bypassSecurityTrustResourceUrl(response[0].file_name);
      }
    
    })
    
    const modal = document.getElementById('pdfmodal');
    if (modal) {
        modal.classList.add('show');
        modal.style.display = 'block';
    }
   
  }
  submitfile(){

    const payment = {
      invoice_id : this.invoiceitem.Invoiceid,
    file_name :this.locationpdf
    }
    this.http.post<any>('https://aktyres-in.stackstaging.com/php-rest-api/class/employees.php?route=createOrUpdateInvoiceFile', payment).subscribe(
      (response) => {
        document.querySelectorAll('.toast').forEach(function(toast) {
          // Add the 'show' class to display the toast
          toast.classList.add('show');
          
          // Set a timeout to remove the 'show' class after 2 seconds
          setTimeout(function() {
              toast.classList.remove('show');
          }, 2000); // 2000 milliseconds = 2 seconds
      });
      })

      const url1 = `https://aktyres-in.stackstaging.com/php-rest-api/class/employees.php?route=getInvoiceFiles&invoice_id=${this.invoiceitem.Invoiceid}`;
      this.http.get(url1).subscribe( (response) => {
        console.log("response",response)
        response[0].file_name = 'https://aktyres-in.stackstaging.com/php-rest-api/class/uploads/' + response[0].file_name
        this.fileUrl1 = this.sanitizer.bypassSecurityTrustResourceUrl(response[0].file_name);
      })
    
  }
  handleFileInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0]; // Store the selected file
      this.convertToBase64(this.selectedFile).then((base64Data) => {
        // Create the payload
        const payload = [{
          filename: this.selectedFile?.name,
          data: base64Data
        }];

        // Call the backend to upload the file
        this.uploadFile(payload).subscribe((response: any) => {
          this.response = true
          if (response && response.length > 0) {
            const pdfUrl = response[0].location; // Extract the PDF location from response
this.locationpdf = response[0].location
            // Build the unsafe URL
            this.unsafeUrl = 'https://aktyres-in.stackstaging.com/php-truck/class/' + pdfUrl;
            console.log("unsafeUrl", this.unsafeUrl);
            
            // Sanitize the URL
            this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.unsafeUrl);
          }
        });
      });
    }
  }
  myFunction1() {
    this.getCustomers();
    const url1 = 'https://aktyres-in.stackstaging.com/php-rest-api/class/employees.php?route=getproduct';
    this.http.get(url1).subscribe(
      (response) => {
        // Handle successful response
        
        this.product = response['body'];
        console.log('this.product', this.product);
        document.querySelectorAll('.toast').forEach(function(toast) {
          // Add the 'show' class to display the toast
          toast.classList.add('show');
          
          // Set a timeout to remove the 'show' class after 2 seconds
          setTimeout(function() {
              toast.classList.remove('show');
          }, 2000); // 2000 milliseconds = 2 seconds
      });
  
      },
      (error) => {
        // Handle error
        console.error('Error fetching orders:', error);
      }
    );
  }
  
calculateinterst(){
  const url = 'https://aktyres-in.stackstaging.com/php-rest-api/class/employees.php?route=getvalue';
  this.http.get(url).subscribe(
    (response) => {
      // Handle successful response
      
  

    },
    (error) => {
      // Handle error
      console.error('Error fetching orders:', error);
    }
  );
}
select(event){
  this.custom1 = event
}
cancelpayment(){
  this.ispay = false
}
selectpaycustomer(event){
this.editcustomer = event
}
selectaccount(event){
  this.selectaccounted = event
}
selectpayment(event){
  this.custom2 = event
  const customer_number = {
    customer_number:this.custom2
  }
  const url = 'https://aktyres-in.stackstaging.com/php-rest-api/class/employees.php?route=getCustomerPayments';
  this.http.post(url,customer_number).subscribe(
    (response) => {
     console.log("payresponse",response["message"])
     this.paydata = response;
     this.checkpay = response
    
      console.log("this.checkpay",this.checkpay)

      const tableData = this.paydata.map((item, index) => {
        
        const button = this.renderer.createElement('button');
        this.renderer.addClass(button, 'btn');
        this.renderer.addClass(button, 'btn-info');
        this.renderer.appendChild(button, this.renderer.createText('Edit'));
        this.renderer.listen(button, 'click', () => {
          this.selectedpayment(item);
        });
        
         return [
           index + 1,
           item.name,
         
           item.pay_date,
           item.hand_cash,
           item.cheque_no,
           item.account,
           item.remark,
           item.amount,
           item.gpay,
           button
         ];
       });
       
    if(this.table){
      this.table.destroy();
    }
    else{

    }
       
       // Initialize DataTable with transformed data
       this.table = new DataTable('#myTable', {
         data: tableData,
       });
     
   

   
  

    },
    (error) => {
      
      this.paydata = [
        {
            "id": "",
            "customer_number": "",
            "pay_date": "",
            "hand_cash": "",
            "cheque_no": "",
            "account": "",
            "remark": "",
            "amount": "",
            "gpay": "",
            "name": ""
        }
        
    ]
    const tableData = this.paydata.map((item, index) => {
        
      const button = this.renderer.createElement('button');
      this.renderer.addClass(button, 'btn');
      this.renderer.addClass(button, 'btn-info');
      this.renderer.appendChild(button, this.renderer.createText('Edit'));
      this.renderer.listen(button, 'click', () => {
        this.selectedpayment(item);
      });
      
       return [
         index + 1,
         item.name,
       
         item.pay_date,
         item.hand_cash,
         item.cheque_no,
         item.account,
         item.remark,
         item.amount,
         item.gpay,
         button
       ];
     });
    this.table.destroy();
    this.table = new DataTable('#myTable', {
      data: tableData,
    });
      // Handle error
      console.error('Error fetching orders:', error+this.paydata);
    }
  )
}
savepayment(){
  const customer = (document.getElementById('customer') as HTMLInputElement).value;
  const amount_paid = (document.getElementById('amount_paid') as HTMLInputElement).value;
  const handcash = (document.getElementById('handcash') as HTMLInputElement).value;
  const gpay = (document.getElementById('gpay') as HTMLInputElement).value;
  const cheque = (document.getElementById('cheque') as HTMLInputElement).value;
  const account = (document.getElementById('account') as HTMLInputElement).value;
  const payremark = (document.getElementById('payremark') as HTMLInputElement).value;
  const paydate = (document.getElementById('paydate') as HTMLInputElement).value;

  const payment = {
    amount:amount_paid,
    customer_number: customer,
    pay_date: paydate,
    hand_cash: handcash,
    cheque_no: cheque,
    account: account,
    remark: payremark,
    gpay:gpay
  }
  console.log("payment",payment)
  const url4 = 'https://aktyres-in.stackstaging.com/php-rest-api/class/employees.php?route=createpayment';

  // Issue a PUT request to the API endpoint
  this.http.post(url4, payment).subscribe(
    (response) => {
   
      const url = 'https://aktyres-in.stackstaging.com/php-rest-api/class/employees.php?route=getCustomerPayments';
      const customer_number = {
        customer_number:this.custom2
      }
 
      this.http.post(url,customer_number).subscribe(
    (response) => {
     console.log("response",response)
     this.paydata = response;

     const tableData = this.paydata.map((item, index) => {
    
      const button = this.renderer.createElement('button');
      this.renderer.addClass(button, 'btn');
      this.renderer.addClass(button, 'btn-info');
      this.renderer.appendChild(button, this.renderer.createText('Edit'));
      this.renderer.listen(button, 'click', () => {
        this.selectedpayment(item);
      });
      
       return [
         index + 1,
         item.name,
       
         item.pay_date,
         item.hand_cash,
         item.cheque_no,
         item.account,
         item.remark,
         item.amount,
         item.gpay,
         button
       ];
     });
     
     if(this.checkpay == undefined || "" || null){
      
     }else{
      this.table.destroy();
     }
     
     
     
     // Initialize DataTable with transformed data
     this.table = new DataTable('#myTable', {
       data: tableData,
     });
     this.checkpay = "amgood"

    },
    (error) => {
      // Handle error
      console.error('Error fetching orders:', error);
    }
  )
      console.log("response",response)
      document.querySelectorAll('.toast').forEach(function(toast) {
        // Add the 'show' class to display the toast
        toast.classList.add('show');
        
        // Set a timeout to remove the 'show' class after 2 seconds
        setTimeout(function() {
            toast.classList.remove('show');
        }, 2000); // 2000 milliseconds = 2 seconds
    });
    })
}
  returnevent(){
    this.custrue = false
    this.real = this.orders
    this.twoenters = false
    this.totalPages = Math.ceil(this.orders.length / this.rowsPerPage);
    this.totalPagesArray = Array(this.totalPages).fill(0).map((x, i) => i + 1);
  
    this.populateTable(1,this.orders);

  }

  populateTable(page,orders) {
    const start = (page - 1) * this.rowsPerPage;
    const end = start + this.rowsPerPage;
    this.realorders = orders.slice(start, end);
  }

  populateTable1(page,event) {
    const start = (page - 1) * this.rowsPerPage;
    const end = start + this.rowsPerPage;
    this.realorders = event.slice(start, end);
  }

  changePage(delta: number): void {
    if (this.currentPage + delta >= 1 && this.currentPage + delta <= this.totalPages) {
      this.currentPage += delta;
      this.populateTable(this.currentPage,this.orders);
    }
  }
  addRow() {
    this.rows.push({ productId: null, product:"", quantity: 1,total:0,discount:0,supertotal:0,SGST:0,CGST:0,premiumtotal:0 });
}
goToPage(page: number) {
  if (page >= 1 && page <= this.totalPages) {
    this.currentPage = page;
    this.populateTable(this.currentPage,this.orders);
  }
}
goToEnteredPage() {
if (this.enteredPage >= 1 && this.enteredPage <= this.totalPages) {
  this.currentPage = this.enteredPage;
  this.populateTable(this.currentPage,this.orders);
  this.enteredPage = null; // Reset the input field after navigating
} else {
  // Handle invalid page number (out of range)
  console.log("Invalid page number");
  // Optionally, you can provide feedback to the user about the invalid input
}
}
updatePay(index, newValue){
  console.log(`Index: ${index}, PAY: ${this.PAY[index]}, New Value: ${newValue}`);
  this.selectedres[index].pay = newValue
 this.selectedres[index].balance = Math.max(0, this.selectedrecipt.Debit - newValue);
console.log("newValue - this.selectedrecipt.Credit",this.selectedrecipt.Debit - newValue)

}

updatebalance(index, newValue){
  console.log(`Index: ${index}, PAY: ${this.pbalance[index]}, New Value: ${newValue}`);
}
// dow() {
//   const doc = new jsPDF();

//   const columns = ["Purchase Date", "CustomerID", "CustomerName", "MobileNumber", "InvoiceNumber", "InvoiceDate", "Total Cost", "Payment Type", "PaymentNo", "Debit", "Credit", "Balance", "Interest"];
//   const rows = this.real.map(item => [
//     item.purchaseDate,
//     item.customer_id,
//     item.name,
//     item.mobile_number,
//     item.Invoiceid,
//     item.Date,// Ensure you have a getProduct method if needed
//     item.TotalCost,
//     item.paymenttype,
//     item.paymentNo,
//     item.Debit,
//     item.Credit,
//     item.Balance,
//     item.interestvalue
//   ]);

//   doc.autoTable({
//     head: [columns],
//     body: rows,
//     styles: { fontSize: 6 }, // Set global font size for all cells
//     columnStyles: {
//       0: { cellWidth: 'auto' }, // Example for column-specific styles if needed
//       // You can set more specific styles for other columns here
//     },
//     margin: { top: 10 } // Add margin if needed
//   });

//   doc.save('table.pdf');
// }

// copyTable() {
//   const columns = ["Purchase Date", "CustomerID", "CustomerName", "MobileNumber", "InvoiceNumber", "InvoiceDate", "Total Cost", "Payment Type", "PaymentNo", "Debit", "Credit", "Balance", "Interest"];
//   const rows = this.real.map(item => [
//     item.purchaseDate,
//     item.customer_id,
//     item.name,
//     item.mobile_number,
//     item.Invoiceid,
//     item.Date,
//     item.TotalCost,
//     item.paymenttype,
//     item.paymentNo,
//     item.Debit,
//     item.Credit,
//     item.Balance,
//     item.interestvalue
//   ]);

//   const tableContent = [columns, ...rows].map(e => e.join("\t")).join("\n");
//   navigator.clipboard.writeText(tableContent).then(() => {
//     alert("Table content copied to clipboard!");
//   }).catch(err => {
//     console.error("Could not copy text: ", err);
//   });
// }

handlePaste(event: ClipboardEvent) {
  const clipboardData = event.clipboardData;
  const pastedData = clipboardData?.getData('Text');

  if (pastedData) {
    const appendArea = document.getElementById('appendArea');
    if (appendArea) {
      appendArea.innerText += '\n' + pastedData;
    }
  }
}





// downloadPDFone() {
//   const doc = new jsPDF();

//   const columns = ["Date", "Particulars", "Vch Type", "Vch No", "Debit", "Credit"];
  
//   // Initialize balance variables
//   let openingBalance = 0;
//   let monthlyDebit = 0;
//   let monthlyCredit = 0;
  
//   // Group the data by month
//   const groupedByMonth = this.groupByMonth(this.paymentfiltered);
  
//   const rows = [];

//   Object.keys(groupedByMonth).forEach(month => {
//     const transactions = groupedByMonth[month];
    
//     // Ensure that negative balances are set to 0
//     const openingBalanceDisplay = Math.max(0, openingBalance);

//     // Add the opening balance for the month with full row styling
//     rows.push([{ content: `${month} Opening Balance:`, styles: { fillColor: 'black', textColor: 'white', fontStyle: 'bold' }}, "", "", "", openingBalanceDisplay.toFixed(2), ""]);
    
//     // Loop through each transaction of the month
//     transactions.forEach(item => {
//       const debit = item.Debit ? parseFloat(item.Debit) : 0; // Convert to number or set to 0
//       const credit = item.Credit ? parseFloat(item.Credit) : 0; // Convert to number or set to 0
      
//       rows.push([ 
//         item.Date,
//         item.Particulars,
//         item.VCH_TYP,
//         item.VCH_NO,
//         debit ? debit.toFixed(2) : '',  // Only display if valid number
//         credit ? credit.toFixed(2) : '', // Only display if valid number
//       ]);
      
//       // Calculate total debits and credits for the month
//       monthlyDebit += debit;
//       monthlyCredit += credit;
//     });

//     // Calculate the balance at the end of the month
//     let closingBalance = openingBalance + monthlyDebit - monthlyCredit;
    
//     // Ensure that negative balances are set to 0
//     closingBalance = Math.max(0, closingBalance);

//     // Add the monthly total debit and credit with full row styling
//     rows.push([{ content: `${month} Total:`, styles: { fillColor: 'gray', textColor: 'white', fontStyle: 'bold' }}, "", "", "", monthlyDebit.toFixed(2), monthlyCredit.toFixed(2)]);

//     // Add the closing balance for the month with full row styling
//     rows.push([{ content: `${month} Closing Balance:`, styles: { fillColor: 'black', textColor: 'white', fontStyle: 'bold' }}, "", "", "", "", closingBalance.toFixed(2)]);

//     // Carry forward the closing balance to the next month as the new opening balance
//     openingBalance = closingBalance;

//     // Reset monthly debit and credit for the next month
//     monthlyDebit = 0;
//     monthlyCredit = 0;
//   });

//   // Adding "From" and "To" addresses at the top
//   doc.setFontSize(6);
//   doc.text('From:', 10, 10);  // Position at (10, 10) on the PDF
//   doc.text('AK TYRES (2023-2024)', 10, 15); // Add "From" address
//   doc.text('SJ RESIDENCY, SFNO.364/2', 10, 20);
//   doc.text('Perambalur Main Road', 10, 25);
//   doc.text('Thuraimangalam, Perambalur', 10, 30);

//   doc.text('To:', 110, 10); // Position "To" address on the right side, column 6
//   doc.text(this.selectedpaycustomer[0].name, 110, 15); // Add customer name
//   doc.text(this.selectedpaycustomer[0].companyname, 110, 20); // Add customer company name

//   // Adding date range in the center
//   const pageWidth = doc.internal.pageSize.getWidth(); // Get the width of the page
//   const dateRangeText = `${this.fromDatepay} to ${this.toDatepay}`; // The date range text
//   const textWidth = doc.getTextWidth(dateRangeText); // Calculate the width of the date range text
  
//   // Center the text by adjusting the x-coordinate
//   const xPos = (pageWidth - textWidth) / 2;

//   // Set font size and print the date range
//   doc.setFontSize(6);
//   doc.text(dateRangeText, xPos, 35); // Place in the center of the page at y = 35
  
//   // Add the table to the PDF
//   doc.autoTable({
//     head: [columns],
//     body: rows,
//     styles: { fontSize: 6 },
//     columnStyles: {
//       0: { cellWidth: 'auto' },
//     },
//     margin: { top: 40 }, // Adjust the margin to make space for the address and date range
//     didParseCell: (data) => {
//       if (data.row.raw[0] && data.row.raw[0].styles) {
//         const styles = data.row.raw[0].styles;
//         data.cell.styles.fillColor = styles.fillColor; // Apply background color
//         data.cell.styles.textColor = styles.textColor; // Apply text color
//         data.cell.styles.fontStyle = styles.fontStyle; // Apply font style
//       }
//     },
//   });

//   // Save the PDF
//   doc.save(`${this.selectedpaycustomer[0].name}.pdf`);
// }
formatDateToCustom(date: string | Date): string {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Ensure that the input is a Date object
  const d = new Date(date);

  // Get the day, month (short form), and year
  const day = ('0' + d.getDate()).slice(-2); // Ensure two digits for day
  const month = months[d.getMonth()];        // Get month name from the array
  const year = d.getFullYear();              // Get the full year

  // Return the formatted date in 'dd-MMM-yyyy' format
  return `${day}-${month}-${year}`;
}


downloadPDFone() {
  const doc = new jsPDF();

  const columns = ["Date", "Particulars", "Vch Type", "Vch No", "Debit", "Credit"];

  // Initialize balance variables
  let openingBalance = this.paymentopen;
  let monthlyDebit = 0;
  let monthlyCredit = 0;

  // Group the data by month
  const groupedByMonth = this.groupByMonth(this.paymentfiltered);

  // Sort months in proper order (Jan to Dec, and by year)
  const sortedMonths = Object.keys(groupedByMonth).sort((a, b) => {
    // Split the month-year strings into [Month, Year]
    const [monthA, yearA] = a.split(' ');
    const [monthB, yearB] = b.split(' ');

    // Convert month names to their respective index (0-11)
    const monthOrder = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dateA = new Date(Number(yearA), monthOrder.indexOf(monthA));
    const dateB = new Date(Number(yearB), monthOrder.indexOf(monthB));
    
    return dateA.getTime() - dateB.getTime(); // Subtracting their timestamps for proper comparison
    
  });

  const rows = [];

  sortedMonths.forEach(month => {
    const transactions = groupedByMonth[month];

    // Ensure that negative balances are set to 0
    const openingBalanceDisplay = Math.max(0, openingBalance);

    // Add the opening balance for the month with full row styling
    rows.push([{ content: `${month} Opening Balance:`, styles: { fillColor: 'AliceBlue', textColor: 'Black', fontStyle: 'bold' }}, "", "", "", openingBalanceDisplay.toFixed(2), ""]);

    // Loop through each transaction of the month
    transactions.forEach(item => {
      const debit = item.Debit ? parseFloat(item.Debit) : 0; // Convert to number or set to 0
      const credit = item.Credit ? parseFloat(item.Credit) : 0; // Convert to number or set to 0
      
      rows.push([
       this.formatDateToCustom( item.Date),
        item.Particulars,
        item.VCH_TYP,
        item.VCH_NO,
        debit ? debit.toFixed(2) : '',  // Only display if valid number
        credit ? credit.toFixed(2) : '', // Only display if valid number
      ]);

      // Calculate total debits and credits for the month
      monthlyDebit += debit;
      monthlyCredit += credit;
    });

    // Calculate the balance at the end of the month
    let closingBalance = openingBalance + monthlyDebit - monthlyCredit;

    // Ensure that negative balances are set to 0
    closingBalance = Math.max(0, closingBalance);

    // Add the monthly total debit and credit with full row styling
    rows.push([{ content: `${month} Total:`, styles: { fillColor: 'gray', textColor: 'white', fontStyle: 'bold' }}, "", "", "", monthlyDebit.toFixed(2), monthlyCredit.toFixed(2)]);

    // Add the closing balance for the month with full row styling
    rows.push([{ content: `${month} Closing Balance:`, styles: { fillColor: 'AliceBlue', textColor: 'Black', fontStyle: 'bold' }}, "", "", "", "", closingBalance.toFixed(2)]);

    // Carry forward the closing balance to the next month as the new opening balance
    openingBalance = closingBalance;

    // Reset monthly debit and credit for the next month
    monthlyDebit = 0;
    monthlyCredit = 0;
  });

  // Adding "From" and "To" addresses at the top
  doc.setFontSize(10);
  doc.text('From:', 10, 10);  // Position at (10, 10) on the PDF
  doc.text('AK TYRES (2023-2024)', 10, 15); // Add "From" address
  doc.text('SJ RESIDENCY, SFNO.364/2', 10, 20);
  doc.text('Perambalur Main Road', 10, 25);
  doc.text('Thuraimangalam, Perambalur', 10, 30);

  doc.text('To:', 110, 10); // Position "To" address on the right side, column 6
  doc.text(this.selectedpaycustomer[0].name, 110, 15); // Add customer name
  doc.text(this.selectedpaycustomer[0].companyname, 110, 20); // Add customer company name

  // Adding date range in the center
  const pageWidth = doc.internal.pageSize.getWidth(); // Get the width of the page
  const dateRangeText = `${this.formatDateToCustom(this.fromDatepay)} to ${this.formatDateToCustom(this.toDatepay)}`; // The date range text
  const textWidth = doc.getTextWidth(dateRangeText); // Calculate the width of the date range text
  
  // Center the text by adjusting the x-coordinate
  const xPos = (pageWidth - textWidth) / 2;

  // Set font size and print the date range
  doc.setFontSize(10);
  doc.text(dateRangeText, xPos, 35); // Place in the center of the page at y = 35

  // Add the table to the PDF
  doc.autoTable({
    head: [columns],
    body: rows,
    styles: { fontSize: 10 },
    columnStyles: {
      0: { cellWidth: 'auto' },
    },
    margin: { top: 40 }, // Adjust the margin to make space for the address and date range
    didParseCell: (data) => {
      if (data.row.raw[0] && data.row.raw[0].styles) {
        const styles = data.row.raw[0].styles;
        data.cell.styles.fillColor = styles.fillColor; // Apply background color
        data.cell.styles.textColor = styles.textColor; // Apply text color
        data.cell.styles.fontStyle = styles.fontStyle; // Apply font style
      }
    },
  });

  // Save the PDF
  doc.save(`${this.selectedpaycustomer[0].name}.pdf`);
}




// groupByMonth(transactions) {
//   return transactions.reduce((acc, item) => {
//     const month = new Date(item.Date).toLocaleString('default', { month: 'long', year: 'numeric' });
    
//     if (!acc[month]) {
//       acc[month] = [];
//     }
    
//     acc[month].push(item);
//     return acc;
//   }, {});
// }


groupByMonth(transactions) {
  return transactions.reduce((acc, item) => {
    const month = new Date(item.Date).toLocaleString('default', { month: 'long', year: 'numeric' });
    
    if (!acc[month]) {
      acc[month] = [];
    }
    
    acc[month].push(item);
    return acc;
  }, {});
}







downloadCSV() {
  const columns = ["Purchase Date", "CustomerID", "CustomerName", "MobileNumber", "InvoiceNumber", "InvoiceDate", "Total Cost", "Payment Type", "PaymentNo", "Debit", "Credit", "Balance", "Interest"];
  const rows = this.real.map(item => [
    item.purchaseDate,
    item.customer_id,
    item.name,
    item.mobile_number,
    item.Invoiceid,
    item.Date,
    item.TotalCost,
    item.paymenttype,
    item.paymentNo,
    item.Debit,
    item.Credit,
    item.Balance,
    item.interestvalue
  ]);

  let csvContent = "data:text/csv;charset=utf-8,";
  if (this.twoenters) {
    csvContent += `Opening Balance,${this.openingbal}\n`;
    csvContent += `Opening Interest,${this.openingint}\n`;
    csvContent += `Closing Balance,${this.closingBal}\n`;
    csvContent += `Closing Interest,${this.closingint}\n`;
    csvContent += "\n"; // Empty line for separation
  }
  csvContent += columns.join(",") + "\n" + rows.map(e => e.join(",")).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "table.csv");
  document.body.appendChild(link); // Required for FF

  link.click();
  document.body.removeChild(link);
}








dow() {
  console.log("this.yes", this.yes);
  if (this.yes) {
    const doc = new jsPDF();
    const textFontSize = 6;

    if (this.twoenters) {
      doc.setFontSize(textFontSize);
      doc.text(`Opening Balance: ${this.openingbal}`, 10, 10);
      doc.text(`Opening Interest: ${this.openingint}`, 10, 15);
      doc.text(`Closing Balance: ${this.closingBal}`, 10, 20);
      doc.text(`Closing Interest: ${this.closingint}`, 10, 25);
    }

    const columns = [ "CustomerName", "MobileNumber", "InvoiceNumber", "PurchaseDate", "Inv.amount", "Adv.amount", "Balance"];
    
    const sortedData = this.real.sort((a, b) => a.name.localeCompare(b.name));

    const rows = [];
    let currentCustomer = null;
    let groupDebit = 0;
    let groupCredit = 0;
    let groupBalance = 0;
    let overallDebit = 0;
    let overallCredit = 0;
    let overallBalance = 0;


    let previousName = null;
let previousMobileNumber = null;
    sortedData.forEach(item => {
      if (item.name !== currentCustomer) {
        if (currentCustomer !== null) {

          if(this.custrue ){

          }
          else{
            rows.push([
              "", "", "Group Total",  "", 
              groupCredit.toFixed(2), 
              groupDebit.toFixed(2), 
              
              groupBalance.toFixed(2)
            ]);
          }
      
          overallCredit += groupCredit;
          overallDebit += groupDebit;
          
          overallBalance += groupBalance;
        }
        currentCustomer = item.name;
        groupDebit = 0;
        groupCredit = 0;
        groupBalance = 0;
      }

      rows.push([
        item.name !== previousName ? item.name : "", // Only include name if it's different from the previous row
    item.mobile_number !== previousMobileNumber ? item.mobile_number : "",
        item.originnum,
        item.Date,
        item.TotalCost,
        item.Credit,
        item.Balance
      ]);
      previousName = item.name;
      previousMobileNumber = item.mobile_number;
      groupDebit += parseFloat(item.Credit) || 0;
      groupCredit += parseFloat(item.TotalCost) || 0;
      groupBalance += parseFloat(item.Balance) || 0;
    });

    if (currentCustomer !== null) {
      if(this.custrue ){

      }
      else{
        rows.push([
          "", "", "Group Total", "", 
          groupCredit.toFixed(2), 
          groupDebit.toFixed(2), 
  
          groupBalance.toFixed(2)
        ]);
      }
    
      overallDebit += groupDebit;
      overallCredit += groupCredit;
      overallBalance += groupBalance;
    }

    rows.push([
      "", "", "Overall Total", "", 
      overallCredit.toFixed(2), 
      overallDebit.toFixed(2), 

      overallBalance.toFixed(2)
    ]);

    doc.autoTable({
      head: [columns],
      body: rows,
      startY: this.twoenters ? 30 : 10,
      styles: { fontSize: textFontSize },
      columnStyles: { 0: { cellWidth: 'auto' }},
      margin: { top: 10 }
    });

    doc.save('table.pdf');
  } else {
    const doc = new jsPDF();
    const textFontSize = 6;

    if (this.twoenters) {
      doc.setFontSize(textFontSize);
      doc.text(`Opening Balance: ${this.openingbal}`, 10, 10);
      doc.text(`Opening Interest: ${this.openingint}`, 10, 15);
      doc.text(`Closing Balance: ${this.closingBal}`, 10, 20);
      doc.text(`Closing Interest: ${this.closingint}`, 10, 25);
    }

    const columns = [ "CustomerName", "MobileNumber", "InvoiceNumber", "PurchaseDate", "Inv.amount", "Adv.amount", "Balance", "Interest"];
    
    const sortedData = this.real.sort((a, b) => a.name.localeCompare(b.name));

    const rows = [];
    let currentCustomer = null;
    let groupDebit = 0;
    let groupCredit = 0;
    let groupBalance = 0;
    let groupInterest = 0;
    let overallDebit = 0;
    let overallCredit = 0;
    let overallBalance = 0;
    let overallInterest = 0;
    let previousName = null;
    let previousMobileNumber = null;
    sortedData.forEach(item => {
      if (item.name !== currentCustomer) {
        if (currentCustomer !== null) {
          if(this.custrue ){

          }
          else{
         
              rows.push([
                "", "", "Group Total",   "", 
                groupCredit.toFixed(2), 
                groupDebit.toFixed(2), 
                groupBalance.toFixed(2), 
                groupInterest.toFixed(2)
             
            ]);
          }
        
          
          overallCredit += groupCredit;
          overallDebit += groupDebit;
          overallBalance += groupBalance;
          overallInterest += groupInterest;
        }
        currentCustomer = item.name;
        groupDebit = 0;
        groupCredit = 0;
        groupBalance = 0;
        groupInterest = 0;
      }

      rows.push([
        item.name !== previousName ? item.name : "", // Only include name if it's different from the previous row
    item.mobile_number !== previousMobileNumber ? item.mobile_number : "",
        item.originnum,
        item.Date,
        item.TotalCost,
        item.Credit,
        item.Balance,
        item.interestvalue
      ]);
      previousName = item.name;
      previousMobileNumber = item.mobile_number;
      groupDebit += parseFloat(item.Credit) || 0;
      groupCredit += parseFloat(item.TotalCost) || 0;
      groupBalance += parseFloat(item.Balance) || 0;
      groupInterest += parseFloat(item.interestvalue) || 0;
    });

    if (currentCustomer !== null) {
      if(this.custrue ){

      }
      else{
     
          rows.push([
            "", "", "Group Total",   "", 
            groupCredit.toFixed(2), 
            groupDebit.toFixed(2), 
            groupBalance.toFixed(2), 
            groupInterest.toFixed(2)
         
        ]);
      }
      overallDebit += groupDebit;
      overallCredit += groupCredit;
      overallBalance += groupBalance;
      overallInterest += groupInterest;
    }

    rows.push([
      "", "", "Overall Total",  "", 
      overallCredit.toFixed(2), 
      overallDebit.toFixed(2), 
      overallBalance.toFixed(2), 
      overallInterest.toFixed(2)
    ]);

    doc.autoTable({
      head: [columns],
      body: rows,
      startY: this.twoenters ? 30 : 10,
      styles: { fontSize: textFontSize },
      columnStyles: { 0: { cellWidth: 'auto' }},
      margin: { top: 10 }
    });

    doc.save('table_with_interest.pdf');
  }
}




copyTable() {
  const columns = ["Purchase Date", "CustomerID", "CustomerName", "MobileNumber", "InvoiceNumber", "InvoiceDate", "Total Cost", "Payment Type", "PaymentNo", "Debit", "Credit", "Balance", "Interest"];
  const rows = this.real.map(item => [
    item.purchaseDate,
    item.customer_id,
    item.name,
    item.mobile_number,
    item.Invoiceid,
    item.Date,
    item.TotalCost,
    item.paymenttype,
    item.paymentNo,
    item.Debit,
    item.Credit,
    item.Balance,
    item.interestvalue
  ]);

  let tableContent = "";
  if (this.twoenters) {
    tableContent += `Opening Balance\t${this.openingbal}\n`;
    tableContent += `Opening Interest\t${this.openingint}\n`;
    tableContent += `Closing Balance\t${this.closingBal}\n`;
    tableContent += `Closing Interest\t${this.closingint}\n`;
    tableContent += "\n"; // Empty line for separation
  }

  tableContent += [columns, ...rows].map(e => e.join("\t")).join("\n");

  navigator.clipboard.writeText(tableContent).then(() => {
    alert("Table content copied to clipboard!");
  }).catch(err => {
    console.error("Could not copy text: ", err);
  });
}


previousPage() {
  if (this.currentPage > 1) {
    this.currentPage--;
  }
}


editdata(event){
  this.selectedrow = null;
  const modal = document.getElementById('editModal');
    if (modal) {
        modal.classList.add('show');
        modal.style.display = 'block';
    }

    this.selectedrow = event;
   
    this.bill12 = this.selectedrow.originnum
    console.log("event",event)
    let parsedProductIds = JSON.parse(this.selectedrow.product);
    // this.rows = this.rows.concat(parsedProductIds);
    this.rows = null;
    this.rows =   parsedProductIds


}

nextPage() {
  const lastPage = Math.ceil(this.orders.length / this.pageSize);
  if (this.currentPage < lastPage) {
    this.currentPage++;
  }
}
divideNumberAmongBalances(givenNumber, balances) {
  let remainingAmount = givenNumber;

  // Map the balances and calculate divided amounts
  const result = balances.map(balanceObj => {
    const { Balance } = balanceObj;

    // Calculate the amount to divide
    let dividedAmount = Math.min(remainingAmount, Balance);

    // Deduct the divided amount from remainingAmount
    remainingAmount -= dividedAmount;

    // Return new object with the divided amount (without remaining balance in the object)
    return {
      ...balanceObj,
      dividedAmount: dividedAmount
    };
  });

  // Return the result array and the remainingAmount as the leftover amount that was not divided
  const totalRemainingBalance = balances.reduce((sum, balanceObj) => {
    return sum + balanceObj.Balance; // Sum all balances
  }, 0) - givenNumber; 
  // Subtract the givenNumber to get the total remaining balance
    this.paymentevents =  result,
    this.remainingBalance =  remainingAmount
    this.remaingamount = totalRemainingBalance
 

}
exportAsPDF() {
  const doc = new jsPDF();
  
  // Calculate the width and height of the table
  const tableWidth = 180; // Adjust this value according to your table width
  const tableHeight = 10; // Adjust this value according to your table height
  
  // Start PDF document
  doc.setFontSize(12);
  doc.text("Table Data", 10, 10); // Add a title
  
  // Iterate over each row of the table data
  this.realorders.forEach((rowData, rowIndex) => {
    // Iterate over each column of the current row
    Object.keys(rowData).forEach((key, colIndex) => {
      let value = rowData[key];
      // Handle null or undefined values
      if (value === null || value === undefined) {
        value = ''; // Set a default value for null/undefined
      }
      // Calculate position to draw cell content
      const xPos = 10 + (colIndex * (tableWidth / Object.keys(rowData).length));
      const yPos = 20 + (rowIndex * tableHeight);
      // Draw cell content
      doc.text(value.toString(), xPos, yPos);
    });
  });

  // Save PDF
  doc.save('table_data.pdf');
}

 downloadPDF() {
  var doc = new jsPDF();
  var pdf = document.getElementById("getModal");
  doc.fromHTML(pdf);
  doc.save("GFG.pdf");
}

// downloadPDF1() {
//   var modalContent = document.getElementById('mainword').innerHTML;
//   var printFrame = document.getElementById('printFrame') as HTMLIFrameElement;
  
//   if (printFrame.contentWindow) {
//     printFrame.contentWindow.document.open();
//     printFrame.contentWindow.document.write('<html><head><title>Print Modal</title>');
//     printFrame.contentWindow.document.write('<style>body{font-family: Arial, sans-serif; margin: 20px;}</style>');
//     printFrame.contentWindow.document.write('</head><body>');
//     printFrame.contentWindow.document.write(modalContent);
//     printFrame.contentWindow.document.write('</body></html>');
//     printFrame.contentWindow.document.close();
//     printFrame.contentWindow.focus();
//     printFrame.contentWindow.print();
//   } else {
//     console.error('Unable to access iframe contentWindow');
//   }
// }
downloadPDF1() {
  var modalContent = document.getElementById('myElement').innerHTML;
  var printFrame = document.getElementById('printFrame') as HTMLIFrameElement;
  
  if (printFrame.contentWindow) {
    printFrame.contentWindow.document.open();
    printFrame.contentWindow.document.write('<html><head><title>Print Modal</title>');
    printFrame.contentWindow.document.write('<style>body{font-family: Arial, sans-serif; margin: 20px; page-break-inside: avoid;}</style>');
    printFrame.contentWindow.document.write('</head><body>');
    printFrame.contentWindow.document.write('<div style="page-break-inside: avoid;">' + modalContent + '</div>');
    printFrame.contentWindow.document.write('</body></html>');
    printFrame.contentWindow.document.close();
    printFrame.contentWindow.focus();
    printFrame.contentWindow.print();
  } else {
    console.error('Unable to access iframe contentWindow');
  }
}
downloadPDF2() {
  var modalContent = document.getElementById('getModal').innerHTML;
  var printFrame = document.getElementById('printFrame') as HTMLIFrameElement;
  
  if (printFrame.contentWindow) {
    printFrame.contentWindow.document.open();
    printFrame.contentWindow.document.write('<html><head><title>Print Modal</title>');
    printFrame.contentWindow.document.write('<style>body{font-family: Arial, sans-serif; margin: 20px; page-break-inside: avoid;}</style>');
    printFrame.contentWindow.document.write('</head><body>');
    printFrame.contentWindow.document.write('<div style="page-break-inside: avoid;">' + modalContent + '</div>');
    printFrame.contentWindow.document.write('</body></html>');
    printFrame.contentWindow.document.close();
    printFrame.contentWindow.focus();
    printFrame.contentWindow.print();
  } else {
    console.error('Unable to access iframe contentWindow');
  }
}
numberToWords(num) {
  if (num === 0) return 'zero';
  
  const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  const teens = ['eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  const tens = ['', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  const thousands = ['', 'thousand', 'million', 'billion', 'trillion'];
  
  function convertHundreds(num) {
      let result = '';
      if (num > 99) {
          result += ones[Math.floor(num / 100)] + ' hundred ';
          num %= 100;
      }
      if (num > 10 && num < 20) {
          result += teens[num - 11] + ' ';
      } else {
          result += tens[Math.floor(num / 10)] + ' ';
          result += ones[num % 10] + ' ';
      }
      return result.trim();
  }
  
  let word = '';
  let i = 0;
  while (num > 0) {
      const tempNumber = num % 1000;
      if (tempNumber !== 0) {
          const str = convertHundreds(tempNumber);
          word = str + ' ' + thousands[i] + ' ' + word;
      }
      num = Math.floor(num / 1000);
      i++;
  }
  
  return word.trim();
}
closeModal5(modalId: string): void {
  console.log("modalId",modalId)
  this.selcsr = null
  const modal = document.getElementById(modalId);
  if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
  }
}
//  downloadPDF22() {
  
//    var printContents = document.getElementById('myElement').innerHTML;
//     var originalContents = document.body.innerHTML;

//     document.body.innerHTML = printContents;

//     window.print();

//     document.body.innerHTML = originalContents;


// }events
 downloadPDF22() {
  // Open a new window for printing
  var printWindow = window.open('', '', 'height=600,width=800');
  
  // Get the content you want to print
  var printContents = document.getElementById('myElement').innerHTML;
  
  // Get all the stylesheets
  var styles = '';
  for (var i = 0; i < document.styleSheets.length; i++) {
      if (document.styleSheets[i].href) {
          styles += '<link rel="stylesheet" href="' + document.styleSheets[i].href + '" type="text/css" />';
      }
  }
  
  // Write the content and styles to the new window
  printWindow.document.write('<html><head><title>Print</title>');
  printWindow.document.write(styles);
  printWindow.document.write('</head><body>');
  printWindow.document.write(printContents);
  printWindow.document.write('</body></html>');
  
  // Wait for the window to load completely
  printWindow.document.close();
  
  printWindow.onload = function() {
      printWindow.focus(); // Necessary for some browsers
      printWindow.print(); // Trigger the print dialog
      
      // Close the print window after printing with a slight delay
      setTimeout(function() {
          printWindow.close();
      }, 100);
  };
}


csr(item){
  
  if (typeof item.product === "string") {
    try {
       item.product = JSON.parse(item.product);
       this.selcsr = item
    } catch (e) {
        console.error("Invalid JSON string:", e);
        // Handle the error or set a default value
        item.product = {};
    }
} else if (typeof item.product === "object" && item.product !== null) {
  item.product = item.product;
  this.selcsr = item
} else {
    console.error("Invalid productData format.");
    // Handle the error or set a default value
    item.product = {};
}


console.log("this.selcsr",this.selcsr)
  
  this.sel = this.selcsr.product

  this.sel[0].quantitytotal = this.selcsr.product.reduce((total, obj) => total + obj.quantity, 0);
  const total = Math.round(this.sel[0].premiumtotal);
  this.sel[0].words = this.numberToWords(total).charAt(0).toUpperCase() + this.numberToWords(total).slice(1).toLowerCase();


  const modal = document.getElementById('view');
    if (modal) {
        modal.classList.add('show');
        modal.style.display = 'block';
    }
}

isPrevDisabled(): boolean {
  return this.currentPage === 1;
}

isNextDisabled(): boolean {
  return this.currentPage === this.totalPages;
}
// downloadPdf() {
//   const content = this.modalContent.nativeElement;
//   html2canvas(content).then(canvas => {
//     const imgData = canvas.toDataURL('image/png');
//     const pdf = new jsPDF();
//     const imgProps = pdf.getImageProperties(imgData);
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
//     pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//     pdf.save('modal_content.pdf');
//   });
// }
// downloadPdf() {

//   console.log("hi")
//   if (!this.getModal) {
//     console.error('Modal reference not found');
//     return;
//   }
//   const modal = this.getModal.nativeElement;

//   html2canvas(modal).then(canvas => {
//     // Create a new jsPDF instance
//     const pdf = new jsPDF('p', 'mm', 'a4');
//     const imgData = canvas.toDataURL('image/png');

//     // Calculate dimensions to fit the image on the PDF
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

//     // Add the image to the PDF
//     pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

//     // Save the PDF
//     pdf.save('modal_content.pdf');
//   });
// }


ngAfterViewInit() {
  // Ensure modal reference is available after view initialization
  console.log('Modal reference:', this.getModal);
}

// downloadPdf() {
//   const modalContent = document.getElementById('openModal');

//   // Create a temporary wrapper element
//   const wrapper = document.createElement('div');
//   // Set the wrapper's CSS to match the modal content
//   wrapper.style.width = modalContent.offsetWidth + 'px';
//   wrapper.style.height = modalContent.offsetHeight + 'px';
//   wrapper.style.overflow = 'auto'; // Ensure overflow content is included
//   // Clone the modal content and append it to the wrapper
//   wrapper.appendChild(modalContent.cloneNode(true));

//   // Handle iframes within the cloned content
//   wrapper.querySelectorAll('iframe').forEach(iframe => {
//     const src = iframe.getAttribute('src');
//     // Check if iframe src is from a different origin
//     if (src && !src.startsWith(window.location.origin)) {
//       // Handle cross-origin iframe content, you might replace with placeholder or handle differently
//       iframe.parentNode.replaceChild(document.createTextNode("Cross-origin content"), iframe);
//     }
//   });

//   // Create a canvas from the wrapper
//   html2canvas(wrapper).then(canvas => {
//     // Convert the canvas to a data URL
//     const imgData = canvas.toDataURL('image/png');

//     // Create a new jsPDF instance
//     const pdf = new jsPDF('p', 'px', [wrapper.offsetWidth, wrapper.offsetHeight]);

//     // Add the canvas to the PDF
//     pdf.addImage(imgData, 'PNG', 0, 0, wrapper.offsetWidth, wrapper.offsetHeight);

//     // Save the PDF
//     pdf.save('modalContent.pdf');

//     // Clean up the temporary wrapper element
//     wrapper.remove();
//   });
// }



  


search(){
  let original;
 
    if (this.searchQuery.trim() === '') {
      console.log("this.searchQuery",this.searchQuery)
     
      this.goToPage(1) // If search query is empty, display all data
    }

    this.realorders = this.realorders.filter(data => {
      // Iterate through each column's value for the current row
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const value = data[key];
          // Check if the value is null or undefined before calling toString
          if (value != null && value.toString().toLowerCase().includes(this.searchQuery.toLowerCase())) {
            return true; // Return true if any column matches the search query
          }
        }
      }
      return false; // Return false if none of the columns match the search query
    });
    
    
}


// fetch(){
//   const url = 'https://aktyres-in.stackstaging.com/php-rest-api/class/employees.php?route=getorders';
//   this.http.get(url).subscribe(
//     (response) => {
//       // Handle successful response
//       console.log('Orders:', response['body']);
//       this.orders = response['body'];

//       this.updateDataTable( this.orders );
      
//     },
//     (error) => {
//       // Handle error
//       console.error('Error fetching orders:', error);
//     }
//   );
// }

// updateDataTable(event){
//   this.table.clear();

//   // Add new data to the DataTable
//   this.table.rows.add(event);

//   // Redraw the DataTable
//   this.table.draw();
// }
handle(){
  console.log("creditlimit",this.creditlimit)
  const url = 'https://aktyres-in.stackstaging.com/php-rest-api/class/employees.php?route=editcustomers';
  const customerdata = {
    customerid : this.selectedCustomer.customerid,
    name: this.selectedCustomer.name,
    
  mobile_number:this.selectedCustomer.mobile_number,
    companyname: this.selectedCustomer.companyname,
    companyAddress:this.selectedCustomer.companyAddress,
    RefferedBy:this.selectedCustomer.RefferedBy,
    CreditLimit:this.creditlimit,
    IsActive:this.selectedCustomer.IsActive,
    email:this.selectedCustomer.email,
    pancard:this.selectedCustomer.pancard,
    adhar:this.selectedCustomer.adhar,
  
  }
    // Issue a PUT request to the API endpoint
    this.http.post(url, customerdata).subscribe(
      (response) => {
        const url = `https://aktyres-in.stackstaging.com/php-rest-api/class/employees.php?route=getCustomerbyid&customerid=${this.selectedCustomer.customerid}`;
        this.http.get(url).subscribe(
          (response) => {
            this.selectedCustomer =     response['body'];
          })

        // Handle successful response
        console.log('Customer edited successfully:', response);
        // Add any additional logic here
        // $(document).ready(function(){
        //   $('.toast').toast('show');
        // });
        const modal = document.getElementById('myToast');
        if (modal) {
            modal.classList.add('show');
            modal.style.display = 'block';
        }
      },
      (error) => {
        // Handle error
        console.error('Error editing customer:', error);
      }
    );
}
switchl(){
  const url = 'https://aktyres-in.stackstaging.com/php-rest-api/class/employees.php?route=editcustomers';
const customerdata = {
  customerid : this.selectedCustomer.customerid,
  name: this.selectedCustomer.name,
  
mobile_number:this.selectedCustomer.mobile_number,
  companyname: this.selectedCustomer.companyname,
  companyAddress:this.selectedCustomer.companyAddress,
  RefferedBy:this.selectedCustomer.RefferedBy,
  CreditLimit:this.selectedCustomer.CreditLimit,
  IsActive:this.switch,
  email:this.selectedCustomer.email,
  pancard:this.selectedCustomer.pancard,
  adhar:this.selectedCustomer.adhar,

}
  // Issue a PUT request to the API endpoint
  this.http.post(url, customerdata).subscribe(
    (response) => {
      // Handle successful response
      console.log('Customer edited successfully:', response);
      // Add any additional logic here
      // $(document).ready(function(){
      //   $('.toast').toast('show');
      // });
      const modal = document.getElementById('myToast');
      if (modal) {
          modal.classList.add('show');
          modal.style.display = 'block';
      }
    },
    (error) => {
      // Handle error
      console.error('Error editing customer:', error);
    }
  );
}


  selectCustomer(customerId: string) {
    console.log("customerId",customerId)
    // Find the selected customer from the array

    console.log("this.customers",this.customers)
    this.selectedCustomer = this.customers.find(customer => customer.customerid == customerId);
    console.log("this.selectedCustomer",this.selectedCustomer)
  }

  selectCustom(customerId: string) {
    console.log("customerId",customerId)
    // Find the selected customer from the array

    console.log("this.customers",this.customers)
    this.selectedCustom = this.customers.find(customer => customer.customerid == customerId);
    console.log("this.selectedCustomer",this.selectedCustom)
  }
  
  getProductPrice(rowIndex: number): number {
    // const productId = this.rows[rowIndex].productId;
    const productId = this.product[rowIndex].Rate;
    if (productId) {
        const product = this.product.find(p => p.ProductID === productId);
        return product ? product.Rate : 0;
    } else {
        return 0;
    }
}
SGST(){
  this.rows[0].SGST = this.rows[0].supertotal *(14 / 100)

  return this.rows[0].SGST;
}
CGST(){
  this.rows[0].CGST = this.rows[0].supertotal *(14 / 100)

  return this.rows[0].CGST;
}
total(){
  // this.rows[0].premiumtotal= this.rows[0].supertotal + this.rows[0].CGST + this.rows[0].SGST
  this.rows[0].premiumtotal= this.rows[0].supertotal;
  return this.rows[0].premiumtotal;
}

  selectProduct(productId,i){
    console.log("this.product",i)
    // Find the selected customer from the array

    console.log("this.product",this.product)
    this.selectedproduct = this.product.find(customer => customer.ProductID == productId);
    console.log("this.selectedCustomer",this.selectedproduct)
    this.rows[i].productId = this.selectedproduct.Rate;
    this.rows[i].product = this.selectedproduct.Name

    // const productId = this.rows[rowIndex].productId;
  }
  updateTotal(rowIndex: number) {
    console.log("rowIndex",rowIndex)
    const product = this.product.find(p => p.ProductID === this.rows[rowIndex].productId);
    if (product) {
        this.rows[rowIndex].total = product.Rate * this.rows[rowIndex].quantity;
    } else {
        this.rows[rowIndex].total = 0;
    }
}

invoicenumber(){

  const url = 'https://aktyres-in.stackstaging.com/php-rest-api/class/employees.php?route=getLastInvoiceId';
  this.http.get(url).subscribe(
    (response) => {
      // Handle successful response
      
      this.inv = response['Invoiceid'];
      console.log('getLastInvoiceId', this.inv['Invoiceid']);

    },
    (error) => {
      // Handle error
      console.error('Error fetching orders:', error);
    }
  );
}

orderNumber(){
  const url = 'https://aktyres-in.stackstaging.com/php-rest-api/class/employees.php?route=getLastorderId';
  this.http.get(url).subscribe(
    (response) => {
      // Handle successful response
      
      this.order = response['OrderId'];
      console.log('OrderId', this.order['OrderId']);

    },
    (error) => {
      // Handle error
      console.error('Error fetching orders:', error);
    }
  );
}


Balance(){
  const url = 'https://aktyres-in.stackstaging.com/php-rest-api/class/employees.php?route=getLastBalance';
  this.http.get(url).subscribe(
    (response) => {
      // Handle successful response
      
      this.lastbal = response['getLastBalance'];
      console.log('OrderId', this.lastbal['getLastBalance']);

    },
    (error) => {
      // Handle error
      console.error('Error fetching orders:', error);
    }
  );
}
calculateTotal(row: any,i) {
 console.log("row", this.rows)
  if (row) {
    this.rows[i].total = (row.productId || 0) * row.quantity;
      return (row.productId || 0) * row.quantity;
  } else {
      return 0;
  }
}
bandiscount(){
  this.isDiscountActive = !this.isDiscountActive;
}

saverecipt(){
  
  const arr = this.selectedres

console.log("arr",arr)
const lastRow = arr[arr.length - 1] 
console.log("lastRow",lastRow)
var payNumber = Number(lastRow.pay);
var selectedcredit = Number(this.selectedrecipt.Credit)
const cre = Math.abs(selectedcredit + payNumber)

console.log("cre",cre)
console.log("this.selectedrecipt.Credit + lastRow.pay",this.selectedrecipt.Credit + lastRow.pay)
console.log("this.selectedrecipt.Credit",typeof this.selectedrecipt.Credit)
console.log("lastRow.pay", typeof lastRow.pay)
const Deb = this.selectedrecipt.Debit - payNumber
const invoicedetails = {
Invoiceid :this.selectedrecipt.OrderID,
Credit:cre,
    Debit:Deb,
    Balance:  Deb

}
const dataToSend = this.selectedres.map(({ editable, ...rest }) => rest);
let cus;
 cus = {
  id : this.selectedid.id,
 details: JSON.stringify(dataToSend)

}
let customerdata;
 customerdata = {
  customerid : this.selectedrecipt.customerid,
 balance:Deb

}
console.log("customerdata",customerdata) 
console.log("cus",cus)
console.log("invoicedetails",invoicedetails)
const url4 = 'https://aktyres-in.stackstaging.com/php-rest-api/class/employees.php?route=editReceipt';

  // Issue a PUT request to the API endpoint
  this.http.post(url4, cus).subscribe(
    (response) => {
    
      console.log('Customer edited successfully:', response);
      
    },
    (error) => {
      // Handle error
      console.error('Error editing customer:', error);
    }
  );

  const url3 = 'https://aktyres-in.stackstaging.com/php-rest-api/class/employees.php?route=editcustomers';
  
    // Issue a PUT request to the API endpoint
    this.http.post(url3, customerdata).subscribe(
      (response) => {
      
        console.log('Customer edited successfully:', response);
        
      },
      (error) => {
        // Handle error
        console.error('Error editing customer:', error);
      }
    );
 
const url = 'https://aktyres-in.stackstaging.com/php-rest-api/class/employees.php?route=editinvoicerecep';
    this.http.post(url, invoicedetails).subscribe(
      (response) => {
      
        console.log('Customer edited successfully:', response);
        
      },
      (error) => {
        // Handle error
        console.error('Error editing customer:', error);
      }
    );

    document.querySelectorAll('.toast').forEach(function(toast) {
      // Add the 'show' class to display the toast
      toast.classList.add('show');
      
      // Set a timeout to remove the 'show' class after 2 seconds
      setTimeout(function() {
          toast.classList.remove('show');
      }, 2000); // 2000 milliseconds = 2 seconds
  });
 
  const modal = document.getElementById('getModal');
  if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
  }
  
  
    const url5 = 'https://aktyres-in.stackstaging.com/php-rest-api/class/employees.php?route=getorders';
    this.http.get(url5).subscribe(
      (response: any) => {
        console.log('Orders:', response);
         window.location.reload();
        this.orders = response['body']; // Assuming response is an array of objects
        this.real =  response['body'];
        this.totalPages = Math.ceil(this.orders.length / this.rowsPerPage);
        this.totalPagesArray = Array(this.totalPages).fill(0).map((x, i) => i + 1);
      
        this.populateTable(1,this.orders);
      
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );


}

save(){

  // const invoice = this.inv + 1;
  let invoice
  
    const orderDetails = {
      ProductID:JSON.stringify(this.rows),
      PurchaseDate:this.PurchaseDate,
      Customer_id:this.selectedCustomer.customerid
    }
  
  
  
    if(this.paydebit == undefined){
      this.paydebit = 0
    }
    else if(Number.isNaN(this.paydebit)){
      this.paydebit =0    
    } 
    
    
    if(this.paycredit == undefined){
      this.paycredit = 0
    }
    else if(Number.isNaN(this.paycredit)){
      this.paycredit =0    
    } 
    var balance1 = this.paydebit;
  
   
  
    
  let deb =  Math.abs(this.rows[0].premiumtotal - this.paycredit);
  
  console.log("this.switch", this.switch)
  console.log("deb", deb)
  if (deb > 2) {
    console.log("this.selectedCustomer.CreditLimit",this.selectedCustomer.CreditLimit)
    console.log("(this.selectedCustomer.balance + deb)",(this.selectedCustomer.balance + deb))
    if (
      parseFloat(this.selectedCustomer.CreditLimit) <
      parseFloat(this.selectedCustomer.balance) + deb
    ) {
  
    window.alert("this selected customer exceeds loan limit");
  }
  else{
    if (((this.switch == 0 || this.selectedCustomer.IsActive == 0) && deb > 2) ||(this.switch == 1 || this.selectedCustomer.IsActive == 1)){
       
  
    
      const url = 'https://aktyres-in.stackstaging.com/php-rest-api/class/employees.php?route=createorder';
    
      const url2 = 'https://aktyres-in.stackstaging.com/php-rest-api/class/employees.php?route=createinvoice';
    
    
    
      // Issue a PUT request to the API endpoint
      this.http.post(url, orderDetails).subscribe(
        (response) => {
          console.log("response",response['OrderID'])
          invoice = response['OrderID']
          const invoicedetails = {
            // Invoiceid :invoice,
            orderId:response['OrderID'],
            Date:this.invoiceDate,
            product:JSON.stringify(this.rows),
            screenshot:this.pic,
            TotalCost:this.rows[0].premiumtotal,
            paymenttype:this.payname,
            PaymentNo:this.chequenumber,
            Credit:this.paycredit,
            Debit:deb,
            Balance: deb,
            originnum:this.bill1,
            notes:this.notes
          }
          this.recipt[0].pay = this.paycredit,
      this.recipt[0].balance  =  deb,
      this.recipt[0].screenshot = this.pic ;
      this.recipt[0].number = this.chequenumber ;
      
      const reciptdetails = {
        invoice_number:invoice,
        details:JSON.stringify(this.recipt)
      }
      console.log("reciptdetails",reciptdetails)
      const url4= 'https://aktyres-in.stackstaging.com/php-rest-api/class/employees.php?route=createReceipt';
    
      this.http.post(url4, reciptdetails).subscribe(
        (response) => {
         
          // window.location.reload();
        },
        (error) => {
          // Handle error
          console.error('Error adding customer:', error);
        }
      );
          this.http.post(url2, invoicedetails).subscribe(
            (response) => {
              const url3 = 'https://aktyres-in.stackstaging.com/php-rest-api/class/employees.php?route=editcustomers';
              const customerdata = {
                customerid : this.selectedCustomer.customerid,
               balance: invoicedetails.Balance
              
              }
                // Issue a PUT request to the API endpoint
                this.http.post(url3, customerdata).subscribe(
                  (response) => {
                  
                    console.log('Customer edited successfully:', response);
                    window.location.reload();
                  },
                  (error) => {
                    // Handle error
                    console.error('Error editing customer:', error);
                  }
                );
            },
            (error) => {
              // Handle error
              console.error('Error adding customer:', error);
            }
          );
          const url = 'https://aktyres-in.stackstaging.com/php-rest-api/class/employees.php?route=getorders';
          this.http.get(url).subscribe(
            (response: any) => {
              console.log('Orders:', response);
              this.orders = response['body']; // Assuming response is an array of objects
              this.real =  response['body'];
              this.totalPages = Math.ceil(this.orders.length / this.rowsPerPage);
              this.totalPagesArray = Array(this.totalPages).fill(0).map((x, i) => i + 1);
            
              this.populateTable(1,this.orders);
           
            },
            (error) => {
              console.error('Error fetching orders:', error);
            }
          );
          const modal = document.getElementById('openModal');
          if (modal) {
              modal.classList.remove('show');
              modal.style.display = 'none';
          }
    
       
    
        //   document.querySelectorAll('.toast').forEach(function(toast) {
        //     toast.classList.add('show');
        // });
        document.querySelectorAll('.toast').forEach(function(toast) {
          // Add the 'show' class to display the toast
          toast.classList.add('show');
          
          // Set a timeout to remove the 'show' class after 2 seconds
          setTimeout(function() {
              toast.classList.remove('show');
          }, 2000); // 2000 milliseconds = 2 seconds
      });
        
        },
        (error) => {
          // Handle error
          console.error('Error added customer:', error);
        }
      );
      var absoluteDifference;
      if(this.paydebit == 0){
        
        absoluteDifference = 0
     
      }else{
       
        absoluteDifference = Math.abs(this.paycredit - this.paydebit);
    
      }
       
      // this.recipt.push({pay:this.paydebit,balance:absoluteDifference,screenshot:this.pic,number:this.chequenumber})
    
      
    }
    else{
      window.alert("this selected customer dont have access fro loan");
    
    }
  }
  }else{
  
  if (((this.switch == 0 || this.selectedCustomer.IsActive == 0) && deb == 0) ||(this.switch == 1 || this.selectedCustomer.IsActive == 1)){
       
  
    
  
    const url = 'https://aktyres-in.stackstaging.com/php-rest-api/class/employees.php?route=createorder';
  
    const url2 = 'https://aktyres-in.stackstaging.com/php-rest-api/class/employees.php?route=createinvoice';
  
  
  
    // Issue a PUT request to the API endpoint
    this.http.post(url, orderDetails).subscribe(
      (response) => {
        console.log("response",response['OrderID'])
        invoice = response['OrderID']
        const invoicedetails = {
          // Invoiceid :invoice,
          orderId:response['OrderID'],
          Date:this.invoiceDate,
          product:JSON.stringify(this.rows),
          screenshot:this.pic,
          TotalCost:this.rows[0].premiumtotal,
          paymenttype:this.payname,
          PaymentNo:this.chequenumber,
          Credit:this.paycredit,
          Debit:deb,
          Balance: deb,
          originnum:this.bill1,
          notes:this.notes
        }

        this.recipt[0].pay = this.paycredit,
        this.recipt[0].balance  = deb,
        this.recipt[0].screenshot = this.pic ;
        this.recipt[0].number = this.chequenumber ;
        
        const reciptdetails = {
          invoice_number:invoice,
          details:JSON.stringify(this.recipt)
        }
        console.log("reciptdetails",reciptdetails)
        const url4= 'https://aktyres-in.stackstaging.com/php-rest-api/class/employees.php?route=createReceipt';
      
        this.http.post(url4, reciptdetails).subscribe(
          (response) => {
           
            // window.location.reload();
          },
          (error) => {
            // Handle error
            console.error('Error adding customer:', error);
          }
        );
        this.http.post(url2, invoicedetails).subscribe(
          (response) => {
            const url3 = 'https://aktyres-in.stackstaging.com/php-rest-api/class/employees.php?route=editcustomers';
            const customerdata = {
              customerid : this.selectedCustomer.customerid,
             balance: invoicedetails.Balance
            
            }
              // Issue a PUT request to the API endpoint
              this.http.post(url3, customerdata).subscribe(
                (response) => {
                
                  console.log('Customer edited successfully:', response);
                  window.location.reload();
                },
                (error) => {
                  // Handle error
                  console.error('Error editing customer:', error);
                }
              );
          },
          (error) => {
            // Handle error
            console.error('Error adding customer:', error);
          }
        );
        const url = 'https://aktyres-in.stackstaging.com/php-rest-api/class/employees.php?route=getorders';
        this.http.get(url).subscribe(
          (response: any) => {
            console.log('Orders:', response);
            this.orders = response['body']; // Assuming response is an array of objects
            this.real =  response['body'];
            this.totalPages = Math.ceil(this.orders.length / this.rowsPerPage);
            this.totalPagesArray = Array(this.totalPages).fill(0).map((x, i) => i + 1);
          
            this.populateTable(1,this.orders);
      

          },
          (error) => {
            console.error('Error fetching orders:', error);
          }
        );
        const modal = document.getElementById('openModal');
        if (modal) {
            modal.classList.remove('show');
            modal.style.display = 'none';
        }
  
      
  
      document.querySelectorAll('.toast').forEach(function(toast) {
        // Add the 'show' class to display the toast
        toast.classList.add('show');
        
        // Set a timeout to remove the 'show' class after 2 seconds
        setTimeout(function() {
            toast.classList.remove('show');
        }, 2000); // 2000 milliseconds = 2 seconds
    });
      
      
      },
      (error) => {
        // Handle error
        console.error('Error added customer:', error);
      }
    );
    var absoluteDifference;
    if(this.paydebit == 0){
      
      absoluteDifference = 0
   
    }else{
     
      absoluteDifference = Math.abs(this.paycredit - this.paydebit);
  
    }
     
    // this.recipt.push({pay:this.paydebit,balance:absoluteDifference,screenshot:this.pic,number:this.chequenumber})
  
    // this.recipt[0].pay = this.paycredit,
    // this.recipt[0].balance  = this.paydebit,
    // this.recipt[0].screenshot = this.pic ;
    // this.recipt[0].number = this.chequenumber ;
    
    // const reciptdetails = {
    //   invoice_number:invoice ,
    //   details:JSON.stringify(this.recipt)
    // }
    // console.log("reciptdetails",reciptdetails)
    // const url4= 'https://aktyres-in.stackstaging.com/php-rest-api/class/employees.php?route=createReceipt';
  
    // this.http.post(url4, reciptdetails).subscribe(
    //   (response) => {
       
    //     // window.location.reload();
    //   },
    //   (error) => {
    //     // Handle error
    //     console.error('Error adding customer:', error);
    //   }
    // );
  }
  else{
    window.alert("this selected customer dont have access fro loan");
  
  }
  }
  }
clear(){
  this.rows  = [{ productId: null,product:"", quantity: 1,total:0,discount:0,supertotal:0,SGST:0,CGST:0,premiumtotal:0 }];
  this.PurchaseDate = null
  this.selectedCustomer = null
  this.invoiceDate = null
  this.pic = null
  this.payname = null
  this.chequenumber = null
  this.paycredit = null
  this.bill1 = null
}

update(){
  this.orderNumber();
  this.invoicenumber();

  const notes = (document.getElementById('notes') as HTMLInputElement).value;
    const orderDetails = {
      OrderID :this.selectedrow.orderId,
      // ProductID:JSON.stringify(this.rows),
      PurchaseDate:this.PurchaseDate,
      Customer_id:this.selectedrow.customer_id
    }
  
    console.log("this.lastbal", this.lastbal +"this.paydebit" + this.paydebit+"this.paycredit"+  this.paycredit)
  
    if(this.paydebit == undefined){
      this.paydebit = 0
    }
    else if(Number.isNaN(this.paydebit)){
      this.paydebit =0    
    } 
    
    
    if(this.paycredit == undefined){
      this.paycredit = 0
    }
    else if(Number.isNaN(this.paycredit)){
      this.paycredit =0    
    } 
    var balance1 = (parseInt(this.selectedrow.balance) - parseInt(this.paycredit)) + parseInt(this.paydebit);
    const invoicedetails = {
      Invoiceid : this.selectedrow.Invoiceid,
      orderId:this.selectedrow.orderId,
      Date:this.invoiceDate,
      // product:JSON.stringify(this.rows),
      screenshot:this.pic,
      // TotalCost:this.rows[0].premiumtotal,
      paymenttype:this.payname,
      PaymentNo:this.chequenumber,
      originnum:this.bill12,
    notes:notes
    }

    console.log("invoicedetails",invoicedetails)

    console.log("orderdetails",orderDetails)

     
console.log("balance",  (this.selectedrow.balance + this.paydebit)-this.paycredit)
     

      const url = 'https://aktyres-in.stackstaging.com/php-rest-api/class/employees.php?route=editorder';

  const url2 = 'https://aktyres-in.stackstaging.com/php-rest-api/class/employees.php?route=editinvoice';

  this.http.post(url2, invoicedetails).subscribe(
    (response) => {
     
      
    },
    (error) => {
      // Handle error
      console.error('Error adding customer:', error);
    }
  );

  this.http.post(url, orderDetails).subscribe(
    (response) => {
      const modal = document.getElementById('editModal');
      if (modal) {
          modal.classList.remove('show');
          modal.style.display = 'none';
      }

      const url = 'https://aktyres-in.stackstaging.com/php-rest-api/class/employees.php?route=getorders';
    this.http.get(url).subscribe(
      (response: any) => {
       
        this.orders = response['body']; 
        this.real =  response['body']// Assuming response is an array of objects
        this.totalPages = Math.ceil(this.orders.length / this.rowsPerPage);
        this.totalPagesArray = Array(this.totalPages).fill(0).map((x, i) => i + 1);
      
        this.populateTable(1,this.orders);
        
        
      
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );

    //   document.querySelectorAll('.toast').forEach(function(toast) {
    //     toast.classList.add('show');
    // });
    document.querySelectorAll('.toast').forEach(function(toast) {
      // Add the 'show' class to display the toast
      toast.classList.add('show');
      
      // Set a timeout to remove the 'show' class after 2 seconds
      setTimeout(function() {
          toast.classList.remove('show');
      }, 2000); // 2000 milliseconds = 2 seconds
  });
    
    
    },
    (error) => {
      // Handle error
      console.error('Error added customer:', error);
    }
  );
    

  
    
   

  }


 


  filterEvents(customerId: string, fromDate: string, toDate: string) {

    this.selectedpaycustomer = this.custom.filter(item => item.customerid === customerId);
    console.log("filterEvents",this.selectedpaycustomer)
    const filterParams = {};
    let custrue = false
    let fromdate = false
    if (customerId !== "0" && customerId !== undefined && !Number.isNaN(customerId) && customerId !== '') {

      console.log("cus entered")
      filterParams['customer_id'] = customerId;
       custrue = true
       this.custrue = custrue
    }
    if (fromDate !== null && fromDate !== undefined && toDate !== null && toDate !== undefined) {
      filterParams['from_date'] = fromDate;
      this.fromDatepay = fromDate
      this.toDatepay = toDate
      filterParams['to_date'] = toDate;
      fromdate = true
      console.log("Date entered")
    }
 if ( custrue && fromdate){
  this.twoenters = true

  this.http.post<any>('https://aktyres-in.stackstaging.com/php-rest-api/class/employees.php?route=getCustomerBalanceAndInterest', filterParams).subscribe(
    (response) => {
    console.log("openingresponse",response)

    this.openingbal = response.data.opening_balance ?? 0;
    this.openingint = response.data.opening_interest_value ?? 0;
    this.closingBal = response.data.closing_balance ?? 0;
    this.closingint = response.data.closing_interest_value ?? 0;
 console.log("this.openingbal",this.openingbal)
    
    },
    (error) => {
      console.error('Failed to retrieve events:', error);
    }
  );
 }



    console.log("customerId:"+customerId+"fromDate:"+fromDate+"toDate:"+toDate)
    this.http.post<any>('https://aktyres-in.stackstaging.com/php-rest-api/class/employees.php?route=getfilter', filterParams).subscribe(
      (response) => {
        this.filteredEvents = response;
        this.real = response;
        this.totalPages = Math.ceil(this.filteredEvents.length / this.rowsPerPage);
        this.totalPagesArray = Array(this.totalPages).fill(0).map((x, i) => i + 1);
      
        this.populateTable(1,this.filteredEvents);
        console.log("this.filteredEvents",this.filteredEvents)
      },
      (error) => {
        console.error('Failed to retrieve events:', error);
      }
    );
    this.http.post<any>('https://aktyres-in.stackstaging.com/php-rest-api/class/employees.php?route=getPaymentFilterone', filterParams).subscribe(
      (response) => {
this.paymentfiltered = response['transactions']
this.paymentopen = response['opening_balance']
      })
  }
  filterEvents1(customerId: string, fromDate: string, toDate: string) {

    console.log("customerId",customerId,fromDate,toDate)
    const filterParams = {};
    let custrue = false
    let fromdate = false
    if (customerId !== "0" && customerId !== undefined && !Number.isNaN(customerId) && customerId !== '') {

      console.log("cus entered")
      filterParams['customer_id'] = customerId;
       custrue = true
     
    }
    if (fromDate !== null && fromDate !== undefined && toDate !== null && toDate !== undefined) {
      filterParams['from_date'] = fromDate;
      filterParams['to_date'] = toDate;
      fromdate = true
      console.log("Date entered")
    }
 if ( custrue && fromdate){


  this.http.post<any>('https://aktyres-in.stackstaging.com/php-rest-api/class/employees.php?route=getCustomerBalanceAndInterest', filterParams).subscribe(
    (response) => {
    console.log("paymentresponse",response)

  

    
    },
    (error) => {
      console.error('Failed to retrieve events:', error);
    }
  );
 }



    console.log("customerId:"+customerId+"fromDate:"+fromDate+"toDate:"+toDate)
    this.http.post<any>('https://aktyres-in.stackstaging.com/php-rest-api/class/employees.php?route=getfilter', filterParams).subscribe(
      (response) => {
   this.paymentevents = response

   console.log("this.paymentevents", this.paymentevents)
      },
      (error) => {
        console.error('Failed to retrieve events:', error);
      }
    );
  }
  deleteData(item){
console.log("item.orderId",item)
const filterParams = {
  orderId:item.orderId
 }


 this.http.post<any>('https://aktyres-in.stackstaging.com/php-rest-api/class/employees.php?route=deleteorder', filterParams).subscribe(
  (response) => {

    const selectedCustomer = this.customers.find(customer => customer.customerid == item.customerid);
    console.log("this.selectedCustomer",this.selectedCustomer)
     const filterParams1= {
     customerid:item.customerid,
     balance: (selectedCustomer.balance - item.Balance)
    }
    this.http.post<any>('https://aktyres-in.stackstaging.com/php-rest-api/class/employees.php?route=editcustomers', filterParams1).subscribe(
     (response) => {
   console.log("response",response)
   
     })
    const url = 'https://aktyres-in.stackstaging.com/php-rest-api/class/employees.php?route=getorders';
    this.http.get(url).subscribe(
      (response: any) => {
       
        this.orders = response['body']; 
        this.real =  response['body']// Assuming response is an array of objects
        this.totalPages = Math.ceil(this.orders.length / this.rowsPerPage);
        this.totalPagesArray = Array(this.totalPages).fill(0).map((x, i) => i + 1);
      
        this.populateTable(1,this.orders);
        
        
      
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
    document.querySelectorAll('.toast').forEach(function(toast) {
      // Add the 'show' class to display the toast
      toast.classList.add('show');
      
      // Set a timeout to remove the 'show' class after 2 seconds
      setTimeout(function() {
          toast.classList.remove('show');
      }, 2000);
      
  });
  })
  }

opencus() {
  // Construct the URL with the query parameter

  const url = "http://aktyres.in/portal/#/customer?modal=open";
  // const url = "http://localhost:4200/portal/#/customer?modal=open";
  
  // Open the new tab with the constructed URL
  const newTab = window.open(url, '', 'width=1100,height=700');
  newTab.focus();
}
openpro() {
  // Construct the URL with the query parameter
  const url = "http://aktyres.in/portal/#/product?modal=open";
  // const url = "http://localhost:4200/portal/#/product?modal=open";
  // Open the new tab with the constructed URL
  const newTab = window.open(url, '', 'width=1100,height=700');
  newTab.focus();
}
  getdata(event){
    this.receptrue = null
    this.selectedrecipt = null
    this.bills = null
    this.bill =null
    this.selectedid = null
      this.selectedres = null
    const modal = document.getElementById('getModal');
    if (modal) {
        modal.classList.add('show');
        modal.style.display = 'block';
    }

    this.selectedrecipt = event;

    console.log("event",event)
    let parsedProductIds = JSON.parse(this.selectedrecipt.product);
    // this.rows = this.rows.concat(parsedProductIds);
    this.bill = null;
    this.bill =   parsedProductIds
    console.log("bill",this.bill[0].premiumtotal)
    this.bills = this.bill[0].premiumtotal
    // this.billscredit = this.bills[0].Credit 
    // this.billsdebit = this.bills[0].Debit
    const url4 = `https://aktyres-in.stackstaging.com/php-rest-api/class/employees.php?invoice_number=${this.selectedrecipt.OrderID}&route=getReceiptDetails`;

  this.http.get(url4).subscribe(
    (response) => {
     const selectedres = response
      this.selectedid = response
      console.log("responseeeeeee",response['message'])
      if(response['message'] == "No record found for the provided invoice number."){
        this.selectedres = []
      }
      else{
        this.selectedres = JSON.parse(response["details"])
      }

      console.log("this.selectedres ",this.selectedres )
      
    },
    (error) => {
      // Handle error
      this.selectedres = []
      console.error('Error adding customer:', error);
    }
  );
    
  }

 

c(){
  document.querySelectorAll('.toast').forEach(function(toast) {
    toast.classList.add('show');
});
}
addrecipt(){
  this.receptrue = true
  this.selectedres.push({pay:0,balance:0,screenshot:"",number:0, editable: true })   
}
handleQuantityChange(){
  console.log("counter")
  this.CGST();
  this.SGST()
}
pay(event) {
  console.log("event",event)
  this.payname = event
  if(event == "GPAY"){
    this.gpay = true
    this.cheque = false
  }
  else{
    this.gpay = false;
     this.cheque = true
  }
}

  
 onFileSelected(event: any) {
  const file: File = event.target.files[0];
  const reader: FileReader = new FileReader();

  reader.onloadend = () => {
    // This code will be executed once the file reading is complete
    this.pic = reader.result as string; // Store the base64 string in the pic variable
    console.log("this.pic", this.pic); // Log the pic here
  };

  if (file) {
    reader.readAsDataURL(file);
  }
}

onFilepay(event: any,i) {
  const file: File = event.target.files[0];
  const reader: FileReader = new FileReader();

  reader.onloadend = () => {
    // This code will be executed once the file reading is complete
    this.pic1 = reader.result as string; // Store the base64 string in the pic variable
    console.log("this.pic", this.pic); // Log the pic here

    this.selectedres[i].screenshot = this.pic1;
  };

  if (file) {
    reader.readAsDataURL(file);
  }
}
paynumber(event,i){
  this.selectedres[i].number = event
  
}

fulltotal() {
  
  if (this.rows[0].discount) {
    let total = 0;
    this.rows.forEach(row => {
        total += row.total;
    });
    total -= this.rows[0].discount;
    this.rows[0].supertotal = total;// Subtract the discount from the total
    return total; // Return the final total after applying the discount
}
  let total = 0;
  this.rows.forEach(row => {
      total += row.total;
  });
  this.rows[0].supertotal = total;
  return total;
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
  
  // getProducts(){
  //   const url = 'https://aktyres-in.stackstaging.com/php-rest-api/class/employees.php?route=getproduct';
  //   this.http.get(url).subscribe(
  //     (response) => {
  //       // Handle successful response
        
  //       this.product = response['body'];
  //       console.log('this.product', this.product);
  
  //     },
  //     (error) => {
  //       // Handle error
  //       console.error('Error fetching orders:', error);
  //     }
  //   );
  // }
  paymentmodal(){
    const modal = document.getElementById('paymentModal');
    if (modal) {
        modal.classList.add('show');
        modal.style.display = 'block';
    }

  }
  toggleFilter1(){
    this.startTrigger()
    const url1 = 'https://aktyres-in.stackstaging.com/php-rest-api/class/employees.php?route=getproduct';
    this.http.get(url1).subscribe(
      (response) => {
        // Handle successful response
        
        this.product = response['body'];
        console.log('this.product', this.product);
        const modal = document.getElementById('openModal');
        if (modal) {
            modal.classList.add('show');
            modal.style.display = 'block';
        }
  
      },
      (error) => {
        // Handle error
        console.error('Error fetching orders:', error);
      }
    );
    const url = 'https://aktyres-in.stackstaging.com/php-rest-api/class/employees.php?route=Balances';
    this.http.get(url).subscribe(
      (response) => {
        // Handle successful response
        
        this.product = response['body'];
        console.log('this.product', this.product);
  
      },
      (error) => {
        // Handle error
        console.error('Error fetching orders:', error);
      }
    );

    console.log("hi")
   
  }
  showImageModal(imageData: string) {
    // Update the src attribute of the modal image with the imageData
    const modalImage = document.getElementById('modalImage') as HTMLImageElement;
    modalImage.src =  imageData;

    // Show the modal
    
    const modal = document.getElementById('viewModal');
    if (modal) {
        modal.classList.add('show');
        modal.style.display = 'block';
    }
}
closeModal(modalId: string): void {
  console.log("modalId",modalId)
  const modal = document.getElementById(modalId);
  if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
  }
}
closeModal1(modalId: string): void {

  console.log("modalId",modalId)
  this.clear()
  const modal = document.getElementById(modalId);
  if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
  }
}
// getProduct(productData: string): string {
//   // Parse the JSON string
//   const productObj = JSON.parse(productData);
//   // Check if productObj is an array and has at least one item
//   if (Array.isArray(productObj) && productObj.length > 0) {
//     // Return the product name
//     return productObj[0].product;
//   } else {
//     return ''; // Return empty string if product data is invalid or empty
//   }
// }
getProduct(productData) {
  let productObj;

  if (typeof productData === "string") {
      try {
          productObj = JSON.parse(productData);
      } catch (e) {
          console.error("Invalid JSON string:", e);
          // Handle the error or set a default value
          productObj = {};
      }
  } else if (typeof productData === "object" && productData !== null) {
      productObj = productData;
  } else {
      console.error("Invalid productData format.");
      // Handle the error or set a default value
      productObj = {};
  }
  
  // Now you can safely use productObj
  
  
  if (Array.isArray(productObj) && productObj.length > 0) {
    // Map through the array and return an array of all product names
    return productObj.map(product => product.product);
  } else {
    return []; // Return an empty array if product data is invalid or empty
  }
}


  
  deleteSelectedRow() {
   
  }
  view() {
    const modal = document.getElementById('staticBackdrop');
    if (modal) {
        modal.classList.add('show');
        modal.style.display = 'block';
    }
  }
 

}




