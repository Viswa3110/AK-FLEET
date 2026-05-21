import { Component, OnInit, ChangeDetectorRef, Renderer2 } from '@angular/core';
import DataTable from 'datatables.net-dt';
import config from 'datatables.net-dt';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

 
  constructor(private route: ActivatedRoute,private http: HttpClient,private renderer: Renderer2) { }
  data :any;
table:any;
modalImageSrc:any;
createpro:any;
createrate:any;
selectedcus:any;
switch1:any;
user:any;
main:any;
isLoading = false;
pancardData1:any;
adharData1:any;
createpro1:any;
productone:any;
switch:any;
createrate1:any;
pro: string = '';
rate: string = '';
pro1:string = ''; 
pancardData: string | ArrayBuffer;
adharData: string | ArrayBuffer;
 ngOnInit(): void {
  this.route.queryParams.subscribe(params => {
    // If the 'modal' parameter is set to 'open', open the modal
    if (params.modal === 'open') {
      this.open()
    }
  });
  const url = 'https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=getCustomers';
  this.http.get(url).subscribe(
    (response) => {
      // Handle successful response
     
      this.data = response['body'];
      console.log('this.product', this.data);
      const tableData = this.data.map((item, index) => {
        const button = this.renderer.createElement('button');
        this.renderer.addClass(button, 'btn');
        this.renderer.addClass(button, 'btn-info');
        this.renderer.appendChild(button, this.renderer.createText('Edit'));
        this.renderer.listen(button, 'click', () => {
          this.sendProductId(item);
        });
        const button1 = this.renderer.createElement('button1');
        this.renderer.addClass(button1, 'btn');
        this.renderer.addClass(button1, 'btn-info');
        this.renderer.appendChild(button1, this.renderer.createText('user'));
        this.renderer.listen(button1, 'click', () => {
          this.createlogin(item);
        });
      
        // Create the image elements
        const pancardImg = this.renderer.createElement('img');
        this.renderer.setAttribute(pancardImg, 'src', item.pancard);
        this.renderer.setStyle(pancardImg, 'width', '50px');
        this.renderer.setStyle(pancardImg, 'height', 'auto');
        this.renderer.setStyle(pancardImg, 'cursor', 'pointer');
        this.renderer.listen(pancardImg, 'click', () => {
          this.showImageModal(item.pancard);
        });
      
        const adharImg = this.renderer.createElement('img');
        this.renderer.setAttribute(adharImg, 'src', item.adhar);
        this.renderer.setStyle(adharImg, 'width', '50px');
        this.renderer.setStyle(adharImg, 'height', 'auto');
        this.renderer.setStyle(adharImg, 'cursor', 'pointer');
        this.renderer.listen(adharImg, 'click', () => {
          this.showImageModal(item.adhar);
        });
//         const pancardImg = this.renderer.createElement('div');
// if (item.pancard != null || item.pancard !== "" || item.pancard !== undefined) {
//   const imgElement = this.renderer.createElement('img');
//   this.renderer.setAttribute(imgElement, 'src', item.pancard);
//   this.renderer.setStyle(imgElement, 'width', '50px');
//   this.renderer.setStyle(imgElement, 'height', 'auto');
//   this.renderer.setStyle(imgElement, 'cursor', 'pointer');
//   this.renderer.listen(imgElement, 'click', () => {
//     this.showImageModal(item.pancard);
//   });
//   this.renderer.appendChild(pancardImg, imgElement);
// } else {
//   const textNode = this.renderer.createText('No');
//   this.renderer.appendChild(pancardImg, textNode);
// }

// const adharImg = this.renderer.createElement('div');
// if (item.adhar != null || item.adhar !== "" || item.adhar !== undefined ) {
//   const imgElement = this.renderer.createElement('img');
//   this.renderer.setAttribute(imgElement, 'src', item.adhar);
//   this.renderer.setStyle(imgElement, 'width', '50px');
//   this.renderer.setStyle(imgElement, 'height', 'auto');
//   this.renderer.setStyle(imgElement, 'cursor', 'pointer');
//   this.renderer.listen(imgElement, 'click', () => {
//     this.showImageModal(item.adhar);
//   });
//   this.renderer.appendChild(adharImg, imgElement);
// } else {
//   const textNode = this.renderer.createText('No');
//   this.renderer.appendChild(adharImg, textNode);
// }

      
        return [
          index + 1,
          item.name,
          item.mobile_number,
          item.gst,
          item.companyname,
          item.companyAddress,
          item.RefferedBy,
          item.CreditLimit,
          item.email,
          item.balance,
          pancardImg,
          adharImg,
          button,
          button1
        ];
      });
      
      // Initialize DataTable with transformed data
      this.table = new DataTable('#myTable', {
        data: tableData,
      });
      
    // this.initializeDataTable();

    },
    (error) => {
      // Handle error
      console.error('Error fetching orders:', error);
    }
  );
 
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

 previewFile(event: Event, previewElementId: string,dataField: string) {
  const fileInput = event.target as HTMLInputElement;
  const file = fileInput.files[0];
  const preview = document.getElementById(previewElementId) as HTMLImageElement;

  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      preview.src = reader.result as string;
      preview.style.display = 'block';
      this[dataField] = reader.result;
    };
    reader.readAsDataURL(file);
  } else {
    preview.src = '';
    preview.style.display = 'none';
    this[dataField] = '';
  }
}


 create(){

  const name = (document.getElementById('Name') as HTMLInputElement).value;
  const mobileNumber = (document.getElementById('mobile_number') as HTMLInputElement).value;
  const companyName = (document.getElementById('companyname') as HTMLInputElement).value;
  const companyAddress = (document.getElementById('companyAdd') as HTMLInputElement).value;
  const referredBy = (document.getElementById('refferedby') as HTMLInputElement).value;
  const creditLimit = (document.getElementById('creditlimit') as HTMLInputElement).value;
  const email = (document.getElementById('email1') as HTMLInputElement).value;
  const balance = (document.getElementById('balance') as HTMLInputElement).value;
  const GST = (document.getElementById('GST') as HTMLInputElement).value;
  console.log('Name:', name);
  console.log('Mobile Number:', mobileNumber);
  console.log('Company Name:', companyName);
  console.log('Company Address:', companyAddress);
  console.log('Referred By:', referredBy);
  console.log('Credit Limit:', creditLimit);
  console.log('Email:', email);
  console.log('Balance:', balance);
  console.log('Pancard Data:', this.pancardData);
  console.log('Adhar Data:', this.adharData);
  console.log('Switch:', this.switch);

  

  const filterParams = {
    
    name:name,
    mobile_number:mobileNumber,
    companyname:companyName,
    companyAddress:companyAddress,
    RefferedBy:referredBy,
    CreditLimit:creditLimit,
    email:email,
    balance:balance,
    pancard:this.pancardData,
    adhar:this.adharData,
    IsActive:this.switch,
     gst: GST
  
  }
  this.http.post<any>('https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=createcustomer', filterParams).subscribe(
      (response) => {
        window.alert("created succesfull")

        this.closeModal('getModal')
        const url = 'https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=getCustomers';
  this.http.get(url).subscribe(
    (response) => {
      // Handle successful response
      
      this.data = response['body'];
      console.log('this.product', this.data);
      const tableData = this.data.map((item, index) => {
        const button = this.renderer.createElement('button');
        this.renderer.addClass(button, 'btn');
        this.renderer.addClass(button, 'btn-info');
        this.renderer.appendChild(button, this.renderer.createText('Edit'));
        this.renderer.listen(button, 'click', () => {
          this.sendProductId(item);
        });
        const button1 = this.renderer.createElement('button1');
        this.renderer.addClass(button1, 'btn');
        this.renderer.addClass(button1, 'btn-info');
        this.renderer.appendChild(button1, this.renderer.createText('user'));
        this.renderer.listen(button1, 'click', () => {
          this.createlogin(item);
        });
        // Create the image elements
        const pancardImg = this.renderer.createElement('img');
        this.renderer.setAttribute(pancardImg, 'src', item.pancard);
        this.renderer.setStyle(pancardImg, 'width', '50px');
        this.renderer.setStyle(pancardImg, 'height', 'auto');
        this.renderer.setStyle(pancardImg, 'cursor', 'pointer');
        this.renderer.listen(pancardImg, 'click', () => {
          this.showImageModal(item.pancard);
        });
      
        const adharImg = this.renderer.createElement('img');
        this.renderer.setAttribute(adharImg, 'src', item.adhar);
        this.renderer.setStyle(adharImg, 'width', '50px');
        this.renderer.setStyle(adharImg, 'height', 'auto');
        this.renderer.setStyle(adharImg, 'cursor', 'pointer');
        this.renderer.listen(adharImg, 'click', () => {
          this.showImageModal(item.adhar);
        });
      
        return [
          index + 1,
          item.name,
          item.mobile_number,
          item.gst,
          item.companyname,
          item.companyAddress,
          item.RefferedBy,
          item.CreditLimit,
          item.email,
          item.balance,
          pancardImg,
          adharImg,
          button,
          button1
        ];
      });
      this.table.destroy();
      // Initialize DataTable with transformed data
      this.table = new DataTable('#myTable', {
        data: tableData,
      });
      
    // this.initializeDataTable();

    },
    (error) => {
      // Handle error
      console.error('Error fetching orders:', error);
    }
  );
      },
      (error) => {
        console.error('Failed to retrieve events:', error);
      }
    );
 }
hi(){
 this.data = [
   [
       "Tiger Nixon",
       "System Architect",
       "Edinburgh",
       "5421",
       "2011/04/25",
       "$3,120"
   ]
]
this.table.destroy();
this.table = new DataTable('#myTable', {
 data: this.data
});

}
 generatePassword(email, length) {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
  let password = email.substring(0, 4); // Get the first four letters of the email
  for (let i = 0, n = charset.length; i < length; ++i) {
      password += charset.charAt(Math.floor(Math.random() * n));
  }
  return password;
}
createlogin(event){
console.log("event",event)
this.user = event

const url = `https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=check&customer_id=${this.user.customerid}`;

  this.http.get(url).subscribe(
    (response) => {
     if(response['message'] == "no need"){
      alert("Already user created");
     }
     else if (response['message'] == "yes needy") {
      const pass = this.generatePassword(this.user.email,8)
      this.user.password = pass;
      const modal = document.getElementById('userModal');
        if (modal) {
            modal.classList.add('show');
            modal.style.display = 'block';
        }
     }
    })

}

createuser(){
  let email:any = $("#email").val();

// Regular expression to validate email
const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

if (emailPattern.test(email)) {
    // Email is valid
    console.log("Valid email address.");
     let password =  $("#psw").val();
  let role = "user"
  let customer_id = this.user.customerid
const userlogin = {
  username:email,
  email:email,
  password:password,
  role:role,
  customer_id:customer_id
}
  this.http.post<any>('https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=create_user', userlogin).subscribe(
    (response) => {

      if(response['message']=="User created successfully."){
        alert("user created successfull")
        const emaildata = {
          to:email,
          subject:"Welcome to AK Tyres",
          message: ` Hi ${email} Your customer port credentials are url=https://aktypers-customer-panel.vercel.app/auth/login. Your email is ${email} and password is ${password}` 
        }
        this.http.post<any>('https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=sendMail', emaildata).subscribe(
          (response) => {
           
          })

      }
      const modal = document.getElementById('userModal');
  if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
  }

    })
} else {
    // Email is invalid
    console.log("Invalid email address.");
    // You can also display an error message to the user if needed
    $("#emailError").text("Please enter a valid email address.");
}

  // let email =  $("#email").val();
 

}
initializeDataTable(): void {
  this.table = new DataTable('#myTable', {
    data: this.data
  });
}
open(){
  const modal = document.getElementById('getModal');
      if (modal) {
          modal.classList.add('show');
          modal.style.display = 'block';
      }
}
sendProductId(productId: any): void {
  
this.selectedcus = productId;
const picPreview1 = document.getElementById('picPreview1') as HTMLImageElement;
picPreview1.src = this.selectedcus.pancard;
const picPreview21 = document.getElementById('pic') as HTMLImageElement;
picPreview21.src = this.selectedcus.adhar;
  this.adharData1 = this.selectedcus.adhar;
  this.pancardData1 = this.selectedcus.pancard;
this.main = this.selectedcus.IsActive;
const modal = document.getElementById('getModal1');
  if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
  }

console.log("this.selectedcus.IsActive",this.selectedcus.IsActive)

  // Handle sending productId here
  console.log('Product ID:',productId);
  // Add your logic to send productId wherever needed
}

update(){
  const name = (document.getElementById('Name1') as HTMLInputElement).value;
  const mobileNumber = (document.getElementById('mobile_number1') as HTMLInputElement).value;
  const companyName = (document.getElementById('companyname1') as HTMLInputElement).value;
  const companyAddress = (document.getElementById('companyAdd1') as HTMLInputElement).value;
  const referredBy = (document.getElementById('refferedby1') as HTMLInputElement).value;
  const creditLimit = (document.getElementById('creditlimit1') as HTMLInputElement).value;
  const email = (document.getElementById('email1') as HTMLInputElement).value;
  const balance = (document.getElementById('balance1') as HTMLInputElement).value;
  const gst = (document.getElementById('GST1') as HTMLInputElement).value;

  console.log('Name:', name);
  console.log('Mobile Number:', mobileNumber);
  console.log('Company Name:', companyName);
  console.log('Company Address:', companyAddress);
  console.log('Referred By:', referredBy);
  console.log('Credit Limit:', creditLimit);
  console.log('Email:', email);
  console.log('Balance:', balance);
  console.log('Pancard Data:', this.pancardData1);
  console.log('Adhar Data:', this.adharData1);
  console.log('Switch:', this.main);
  const filterParams = {
    customerid:this.selectedcus.customerid,
    name:name,
    mobile_number:mobileNumber,
    companyname:companyName,
    companyAddress:companyAddress,
    RefferedBy:referredBy,
    CreditLimit:creditLimit,
    email:email,
    balance:balance,
    pancard:this.pancardData1,
    adhar:this.adharData1,
    IsActive:this.main,
    gst:gst
  
  
  }
  this.http.post<any>('https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=editcustomers', filterParams).subscribe(
    (response) => {
      window.alert("Edited succesfull")

      this.closeModal('getModal1')
      const url = 'https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=getCustomers';
this.http.get(url).subscribe(
  (response) => {
    // Handle successful response
    
    this.data = response['body'];
    console.log('this.product', this.data);
    const tableData = this.data.map((item, index) => {
      const button = this.renderer.createElement('button');
      this.renderer.addClass(button, 'btn');
      this.renderer.addClass(button, 'btn-info');
      this.renderer.appendChild(button, this.renderer.createText('Edit'));
      this.renderer.listen(button, 'click', () => {
        this.sendProductId(item);
      });
      const button1 = this.renderer.createElement('button1');
      this.renderer.addClass(button1, 'btn');
      this.renderer.addClass(button1, 'btn-info');
      this.renderer.appendChild(button1, this.renderer.createText('user'));
      this.renderer.listen(button1, 'click', () => {
        this.createlogin(item);
      });
    
      // Create the image elements
      const pancardImg = this.renderer.createElement('img');
      this.renderer.setAttribute(pancardImg, 'src', item.pancard);
      this.renderer.setStyle(pancardImg, 'width', '50px');
      this.renderer.setStyle(pancardImg, 'height', 'auto');
      this.renderer.setStyle(pancardImg, 'cursor', 'pointer');
      this.renderer.listen(pancardImg, 'click', () => {
        this.showImageModal(item.pancard);
      });
    
      const adharImg = this.renderer.createElement('img');
      this.renderer.setAttribute(adharImg, 'src', item.adhar);
      this.renderer.setStyle(adharImg, 'width', '50px');
      this.renderer.setStyle(adharImg, 'height', 'auto');
      this.renderer.setStyle(adharImg, 'cursor', 'pointer');
      this.renderer.listen(adharImg, 'click', () => {
        this.showImageModal(item.adhar);
      });
    
      return [
        index + 1,
        item.name,
        item.mobile_number,
        item.gst,
        item.companyname,
        item.companyAddress,
        item.RefferedBy,
        item.CreditLimit,
        item.email,
        item.balance,
        pancardImg,
        adharImg,
        button,
        button1
      ];
    });
    this.table.destroy();
    
    // Initialize DataTable with transformed data
    this.table = new DataTable('#myTable', {
      data: tableData,
    });
    this.pancardData1 = null
    this.adharData1 = null
  // this.initializeDataTable();

  },
  (error) => {
    // Handle error
    console.error('Error fetching orders:', error);
  }
);
    },
    (error) => {
      console.error('Failed to retrieve events:', error);
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
}
