import { Component, OnInit, ChangeDetectorRef, Renderer2, ViewChild, ElementRef, AfterViewInit  } from '@angular/core';
import DataTable from 'datatables.net-dt';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss']
})
export class DriverComponent implements OnInit {
  @ViewChild('imageContainer', { static: true }) imageContainer: ElementRef;
  @ViewChild('imageContainer1', { read: ElementRef }) imageContainer1: ElementRef;
  @ViewChild('imageContainer2', { read: ElementRef }) imageContainer2: ElementRef;
  
  constructor(private http: HttpClient,private renderer: Renderer2) { }
  data:any;
  table:any;
  modalImageSrc:any;
  Insurance:any;
  vehicle:any;
  RCBook:any;
  Insurance1:any;
  vehicle1:any;
  RCBook1:any;
  user:any;
  item :any;
  Pancard:any;
  License:any;
  Adhar:any;
  Pancard1:any;
  License1:any;
  Adhar1:any;
  customer:any;
  insuranceImg: any;
  ngOnInit(): void {

    const customerKey = 'customer_id';

    // Retrieve the value from local storage
    const customerIdString = localStorage.getItem(customerKey);
    console.log("customerIdString",customerIdString)
    this.customer = customerIdString
        const url = `https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=getDriverAll&customer_id=${customerIdString}`;
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
              // Uncomment and modify the below line if you want to handle button click event
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
              const rcBookImg = this.renderer.createElement('img');
              this.renderer.setAttribute(rcBookImg, 'src', item.aadhaar_pic);
              this.renderer.setStyle(rcBookImg, 'width', '50px');
              this.renderer.setStyle(rcBookImg, 'height', 'auto');
              this.renderer.setStyle(rcBookImg, 'cursor', 'pointer');
              // Uncomment and modify the below line if you want to handle image click event
              this.renderer.listen(rcBookImg, 'click', () => {
                this.showImageModal(item.aadhaar_pic);
              });
            
              const insuranceImg = this.renderer.createElement('img');
              this.renderer.setAttribute(insuranceImg, 'src', item.pancard_pic);
              this.renderer.setStyle(insuranceImg, 'width', '50px');
              this.renderer.setStyle(insuranceImg, 'height', 'auto');
              this.renderer.setStyle(insuranceImg, 'cursor', 'pointer');
              // Uncomment and modify the below line if you want to handle image click event
              this.renderer.listen(insuranceImg, 'click', () => {
                this.showImageModal(item.pancard_pic); 
              });
            
              const picImg = this.renderer.createElement('img');
              this.renderer.setAttribute(picImg, 'src', item.license_pic);
              this.renderer.setStyle(picImg, 'width', '50px');
              this.renderer.setStyle(picImg, 'height', 'auto');
              this.renderer.setStyle(picImg, 'cursor', 'pointer');
              // Uncomment and modify the below line if you want to handle image click event
              this.renderer.listen(picImg, 'click', () => {
                this.showImageModal(item.license_pic);
              });
            
              return [
                index + 1,
                item.customername,
                item.name,
                item.license_number,
                item.license_expiry_date,
                item.phone_number,
                item.address,
                item.date_of_birth,
                item.date_of_joining,
                item.emergency_contact,
                // rcBookImg,
                // insuranceImg,
                // picImg,
                button,
                // button1
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
  createuser(){
    let email:any = $("#email").val();
  
  // Regular expression to validate email
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  
  if (emailPattern.test(email)) {
      // Email is valid
      console.log("Valid email address.");
       let password =  $("#psw").val();
    let role = "driver"
    let customer_id = this.user.customerid
  const userlogin = {
    username:email,
    email:email,
    password:password,
    role:role,
    customer_id:customer_id,
    driver:this.user.id
  }
    this.http.post<any>('https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=createdriveruser', userlogin).subscribe(
      (response) => {
  
        if(response['message']=="User created successfully."){
          alert("user created successfull")
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
  clearImageContainer(container: HTMLElement) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}
generatePassword(email, length) {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
  let password = email.substring(0, 4); // Get the first four letters of the email
  for (let i = 0, n = charset.length; i < length; ++i) {
      password += charset.charAt(Math.floor(Math.random() * n));
  }
  return password;
}
  sendProductId(item){
    this.item = item
    console.log("this.item",this.item)
  
    this.clearImageContainer(this.imageContainer.nativeElement);
    this.clearImageContainer(this.imageContainer1.nativeElement);
    this.clearImageContainer(this.imageContainer2.nativeElement);
    const insuranceImg = this.renderer.createElement('img');
    this.renderer.setAttribute(insuranceImg, 'src',`https://aktyres-in.stackstaging.com/php-truck/class/${item.aadhaar_pic}` );
    this.renderer.setStyle(insuranceImg, 'width', '100px');
    this.renderer.setStyle(insuranceImg, 'height', '100px');
    this.renderer.setStyle(insuranceImg, 'cursor', 'pointer');

    // Add click event listener to show the modal with the image
    this.renderer.listen(insuranceImg, 'click', () => {
      const modalImage = document.getElementById('picPre') as HTMLImageElement;
      if (modalImage) {
        modalImage.src = `https://aktyres-in.stackstaging.com/php-truck/class/${item.aadhaar_pic}`;
        // Show the modal (Assuming you have a method or logic to show the modal)
        this.showImageModal(modalImage.src); 
      } else {
        console.error('Modal image element not found.');
      }
    });

    // Append the created image element to the container
    this.renderer.appendChild(this.imageContainer.nativeElement, insuranceImg);
    const rc_book = this.renderer.createElement('img');
    this.renderer.setAttribute(rc_book, 'src', `https://aktyres-in.stackstaging.com/php-truck/class/${item.pancard_pic}` );
    this.renderer.setStyle(rc_book, 'width', '100px');
    this.renderer.setStyle(rc_book, 'height', '100px');
    this.renderer.setStyle(rc_book, 'cursor', 'pointer');

    // Add click event listener to show the modal with the image
    this.renderer.listen(rc_book, 'click', () => {
      const modalImage = document.getElementById('picPr') as HTMLImageElement;
      if (modalImage) {
        modalImage.src = `https://aktyres-in.stackstaging.com/php-truck/class/${item.pancard_pic}`;
        // Show the modal (Assuming you have a method or logic to show the modal)
        this.showImageModal(modalImage.src); 
      } else {
        console.error('Modal image element not found.');
      }
    });

    // Append the created image element to the container
    this.renderer.appendChild(this.imageContainer1.nativeElement, rc_book);



    const pic = this.renderer.createElement('img');
    this.renderer.setAttribute(pic, 'src',`https://aktyres-in.stackstaging.com/php-truck/class/${item.license_pic}` );
    this.renderer.setStyle(pic, 'width', '100px');
    this.renderer.setStyle(pic, 'height', '100px');
    this.renderer.setStyle(pic, 'cursor', 'pointer');

    // Add click event listener to show the modal with the image
    this.renderer.listen(pic, 'click', () => {
      const modalImage = document.getElementById('picPrev') as HTMLImageElement;
      if (modalImage) {
        modalImage.src = `https://aktyres-in.stackstaging.com/php-truck/class/${item.license_pic}`;
        // Show the modal (Assuming you have a method or logic to show the modal)
        this.showImageModal(modalImage.src); 
      } else {
        console.error('Modal image element not found.');
      }
    });

    // Append the created image element to the container
    this.renderer.appendChild(this.imageContainer2.nativeElement, pic);



    console.log("item",item.insurance)
    const modal = document.getElementById('editModal');
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
  createlogin(event){
    console.log("event",event)
    this.user = event
    
    const url = `https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=checkdriver&customer_id=${this.customer}&driver_id=${ this.user.id}`;
    
      this.http.get(url).subscribe(
        (response) => {
         if(response['message'] == "no need"){
          alert("Already user created");
         }
         else if (response['message'] == "yes needy") {
          const pass = this.generatePassword(this.user.name,8)
          this.user.password = pass;
          const modal = document.getElementById('userModal');
            if (modal) {
                modal.classList.add('show');
                modal.style.display = 'block';
            }
         }
        })
    
    }
  showImageModal(imageData) {

    console.log("enetered",imageData)
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
  create(){
    const Name = (document.getElementById('Name') as HTMLInputElement).value;
  const LicenseNumber = (document.getElementById('LicenseNumber') as HTMLInputElement).value;
  const LicenseExpDate = (document.getElementById('LicenseExpDate') as HTMLInputElement).value;
  const PhoneNo = (document.getElementById('PhoneNo') as HTMLInputElement).value;
  const DateOfBirth = (document.getElementById('DateOfBirth') as HTMLInputElement).value;
  const DateOfJoining = (document.getElementById('DateOfJoining') as HTMLInputElement).value;
  const EmergencyContact = (document.getElementById('EmergencyContact') as HTMLInputElement).value;
const Address =  (document.getElementById('Address') as HTMLInputElement).value;
const email =  (document.getElementById('email') as HTMLInputElement).value;

  console.log('Name:', Name);
  console.log('LicenseNumber', LicenseNumber);
  console.log('LicenseExpDate', LicenseExpDate);
  console.log('PhoneNo', PhoneNo );
  console.log('DateOfBirth', DateOfBirth);
  console.log('DateOfJoining', DateOfJoining);
  console.log('EmergencyContact', EmergencyContact);
  console.log("Adhar", this.Adhar)
  console.log("Pancard", this.Pancard)
  console.log("License",this.License)
 

  
  const customerKey = 'customer_id';

  // Retrieve the value from local storage
  const customerIdString = localStorage.getItem(customerKey);
  console.log("customerIdString",customerIdString)
  const filterParams = {
    customerid:customerIdString,
    name:Name,
    license_number:LicenseNumber,
    license_expiry_date:LicenseExpDate,
    phone_number:PhoneNo ,
    address:Address,
    date_of_birth:DateOfBirth,
    date_of_joining:DateOfJoining,
    emergency_contact:EmergencyContact,
  aadhaar_pic:this.Adhar,
  pancard_pic:this.Pancard,
  license_pic:this.License,
  email:email
    
  }

  this.http.post<any>('https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=createDriver', filterParams).subscribe(
    (response) => {
      window.alert("created succesfull")

      this.closeModal('addModal')
      const customerKey = 'customer_id';
      const customerIdString = localStorage.getItem(customerKey);
      console.log("customerIdString",customerIdString)
          const url = `https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=getDriver&customer_id=${customerIdString}`;
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
                // Uncomment and modify the below line if you want to handle button click event
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
                const rcBookImg = this.renderer.createElement('img');
                this.renderer.setAttribute(rcBookImg, 'src', item.aadhaar_pic);
                this.renderer.setStyle(rcBookImg, 'width', '50px');
                this.renderer.setStyle(rcBookImg, 'height', 'auto');
                this.renderer.setStyle(rcBookImg, 'cursor', 'pointer');
                // Uncomment and modify the below line if you want to handle image click event
                this.renderer.listen(rcBookImg, 'click', () => {
                  this.showImageModal(item.aadhaar_pic);
                });
              
                const insuranceImg = this.renderer.createElement('img');
                this.renderer.setAttribute(insuranceImg, 'src', item.pancard_pic);
                this.renderer.setStyle(insuranceImg, 'width', '50px');
                this.renderer.setStyle(insuranceImg, 'height', 'auto');
                this.renderer.setStyle(insuranceImg, 'cursor', 'pointer');
                // Uncomment and modify the below line if you want to handle image click event
                this.renderer.listen(insuranceImg, 'click', () => {
                  this.showImageModal(item.pancard_pic); 
                });
              
                const picImg = this.renderer.createElement('img');
                this.renderer.setAttribute(picImg, 'src', item.license_pic);
                this.renderer.setStyle(picImg, 'width', '50px');
                this.renderer.setStyle(picImg, 'height', 'auto');
                this.renderer.setStyle(picImg, 'cursor', 'pointer');
                // Uncomment and modify the below line if you want to handle image click event
                this.renderer.listen(picImg, 'click', () => {
                  this.showImageModal(item.license_pic);
                });
              
                return [
                  index + 1,
                  item.name,
                  item.license_number,
                  item.license_expiry_date,
                  item.phone_number,
                  item.address,
                  item.date_of_birth,
                  item.date_of_joining,
                  item.emergency_contact,
                  rcBookImg,
                  insuranceImg,
                  picImg,
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
  update(){
    const Name = (document.getElementById('Name1') as HTMLInputElement).value;
  const LicenseNumber = (document.getElementById('LicenseNumber1') as HTMLInputElement).value;
  const LicenseExpDate = (document.getElementById('LicenseExpDate1') as HTMLInputElement).value;
  const PhoneNo = (document.getElementById('PhoneNo1') as HTMLInputElement).value;
  const DateOfBirth = (document.getElementById('DateOfBirth1') as HTMLInputElement).value;
  const DateOfJoining = (document.getElementById('DateOfJoining1') as HTMLInputElement).value;
  const EmergencyContact = (document.getElementById('EmergencyContact1') as HTMLInputElement).value;
const Address =  (document.getElementById('Address1') as HTMLInputElement).value;
const email =  (document.getElementById('email1') as HTMLInputElement).value;

  console.log('Name:', Name);
  console.log('LicenseNumber', LicenseNumber);
  console.log('LicenseExpDate', LicenseExpDate);
  console.log('PhoneNo', PhoneNo );
  console.log('DateOfBirth', DateOfBirth);
  console.log('DateOfJoining', DateOfJoining);
  console.log('EmergencyContact', EmergencyContact);
  console.log("Adhar", this.Adhar1)
  console.log("Pancard", this.Pancard1)
  console.log("License",this.License1)
 

  
  const customerKey = 'customer_id';

  // Retrieve the value from local storage
  const customerIdString = localStorage.getItem(customerKey);
  console.log("customerIdString",customerIdString)
  if(this.Adhar1== undefined || ''){
    this.Adhar1 = this.item.aadhaar_pic
  }
  if(this.Pancard1 == undefined || ''){
    this.Pancard1 = this.item.pancard_pic
  }
  if(this.License1 == undefined || ''){
    this.License1 = this.item.license_pic
  }
 
  const filterParams = {
    id:this.item.id,
    customerid:customerIdString,
    name:Name,
    license_number:LicenseNumber,
    license_expiry_date:LicenseExpDate,
    phone_number:PhoneNo ,
    address:Address,
    date_of_birth:DateOfBirth,
    date_of_joining:DateOfJoining,
    emergency_contact:EmergencyContact,
  aadhaar_pic:this.Adhar1,
  pancard_pic:this.Pancard1,
  license_pic:this.License1,
    email:email
  }

  this.http.post<any>('https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=updateDriver', filterParams).subscribe(
    (response) => {
      window.alert("created succesfull")

      this.closeModal('editModal')
      const customerKey = 'customer_id';
      const customerIdString = localStorage.getItem(customerKey);
      console.log("customerIdString",customerIdString)
          const url = `https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=getDriver&customer_id=${customerIdString}`;
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
                // Uncomment and modify the below line if you want to handle button click event
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
                const rcBookImg = this.renderer.createElement('img');
                this.renderer.setAttribute(rcBookImg, 'src', item.aadhaar_pic);
                this.renderer.setStyle(rcBookImg, 'width', '50px');
                this.renderer.setStyle(rcBookImg, 'height', 'auto');
                this.renderer.setStyle(rcBookImg, 'cursor', 'pointer');
                // Uncomment and modify the below line if you want to handle image click event
                this.renderer.listen(rcBookImg, 'click', () => {
                  this.showImageModal(item.aadhaar_pic);
                });
              
                const insuranceImg = this.renderer.createElement('img');
                this.renderer.setAttribute(insuranceImg, 'src', item.pancard_pic);
                this.renderer.setStyle(insuranceImg, 'width', '50px');
                this.renderer.setStyle(insuranceImg, 'height', 'auto');
                this.renderer.setStyle(insuranceImg, 'cursor', 'pointer');
                // Uncomment and modify the below line if you want to handle image click event
                this.renderer.listen(insuranceImg, 'click', () => {
                  this.showImageModal(item.pancard_pic); 
                });
              
                const picImg = this.renderer.createElement('img');
                this.renderer.setAttribute(picImg, 'src', item.license_pic);
                this.renderer.setStyle(picImg, 'width', '50px');
                this.renderer.setStyle(picImg, 'height', 'auto');
                this.renderer.setStyle(picImg, 'cursor', 'pointer');
                // Uncomment and modify the below line if you want to handle image click event
                this.renderer.listen(picImg, 'click', () => {
                  this.showImageModal(item.license_pic);
                });
              
                return [
                  index + 1,
                  item.name,
                  item.license_number,
                  item.license_expiry_date,
                  item.phone_number,
                  item.address,
                  item.date_of_birth,
                  item.date_of_joining,
                  item.emergency_contact,
                  rcBookImg,
                  insuranceImg,
                  picImg,
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
  open(){
    const modal = document.getElementById('addModal');
    if (modal) {
        modal.classList.add('show');
        modal.style.display = 'block';
    }
  }
  closeModal(modalId: string): void {
   
   
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        modal.style.display = 'none';
    }
    
    
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
}
