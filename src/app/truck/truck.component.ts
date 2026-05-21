import { Component, OnInit, ChangeDetectorRef, Renderer2, ViewChild, ElementRef, AfterViewInit  } from '@angular/core';
import DataTable from 'datatables.net-dt';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-truck',
  templateUrl: './truck.component.html',
  styleUrls: ['./truck.component.scss']
})
export class TruckComponent implements OnInit {
  @ViewChild('imageContainer', { read: ElementRef }) imageContainer: ElementRef;
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
item :any;
customer:any;
insuranceImg: any;


  ngOnInit(): void {
    const customerKey = 'customer_id';
    this.customr()
// Retrieve the value from local storage
const customerIdString = localStorage.getItem(customerKey);
console.log("customerIdString",customerIdString)
    const url = `https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=getTruckForAll&customer_id=${customerIdString}`;
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
        
          // Create the image elements
          const rcBookImg = this.renderer.createElement('img');
          this.renderer.setAttribute(rcBookImg, 'src', `https://aktyres-in.stackstaging.com/php-truck/class/${item.rc_book}`);
          this.renderer.setStyle(rcBookImg, 'width', '50px');
          this.renderer.setStyle(rcBookImg, 'height', 'auto');
          this.renderer.setStyle(rcBookImg, 'cursor', 'pointer');
          // Uncomment and modify the below line if you want to handle image click event
          this.renderer.listen(rcBookImg, 'click', () => {
            this.showImageModal(item.rc_book);
          });
        
          const insuranceImg = this.renderer.createElement('img');
          this.renderer.setAttribute(insuranceImg, 'src', `https://aktyres-in.stackstaging.com/php-truck/class/${item.insurance}`);
          this.renderer.setStyle(insuranceImg, 'width', '50px');
          this.renderer.setStyle(insuranceImg, 'height', 'auto');
          this.renderer.setStyle(insuranceImg, 'cursor', 'pointer');
          // Uncomment and modify the below line if you want to handle image click event
          this.renderer.listen(insuranceImg, 'click', () => {
            this.showImageModal(item.insurance); 
          });
        
          const picImg = this.renderer.createElement('img');
          this.renderer.setAttribute(picImg, 'src', `https://aktyres-in.stackstaging.com/php-truck/class/${item.pic}`);
          this.renderer.setStyle(picImg, 'width', '50px');
          this.renderer.setStyle(picImg, 'height', 'auto');
          this.renderer.setStyle(picImg, 'cursor', 'pointer');
          // Uncomment and modify the below line if you want to handle image click event
          this.renderer.listen(picImg, 'click', () => {
            this.showImageModal(item.pic);
          });
        
          return [
            index + 1,
            item.name,
            item.registration_number,
            item.chassis_number,
            item.engine_number,
            item.make,
            item.model,
            item.year_of_manufacture,
            item.wheels,
            item.tyre_type,
            item.load_capacity,
            item.fuel_type,
            item.insurance_number,
            item.insurance_expiry_date,
            item.last_service_date,
            // rcBookImg,
            // insuranceImg,
            // picImg,
            button
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
  customr(){
    const url = 'https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=getCustomers';
  this.http.get(url).subscribe(
    (response) => {
      this.customer = response['body'];
    })
    
  }
  update(){

    const RegistrationNo = (document.getElementById('Registration1') as HTMLInputElement).value;
  const ChassisNo = (document.getElementById('Chassis1') as HTMLInputElement).value;
  const EngineeNo = (document.getElementById('Enginee1') as HTMLInputElement).value;
  const Maker = (document.getElementById('Maker1') as HTMLInputElement).value;
  const Model = (document.getElementById('Model1') as HTMLInputElement).value;
  const Yearofmanufacturing = (document.getElementById('Yearofmanufacturing1') as HTMLInputElement).value;
  const Wheels = (document.getElementById('Wheels1') as HTMLInputElement).value;
  const TyreType = (document.getElementById('TyreType1') as HTMLInputElement).value;
  const FuelType = (document.getElementById('FuelType1') as HTMLInputElement).value;
  const Insurance = (document.getElementById('Insurance') as HTMLInputElement).value;
  const InsuranceExpDate = (document.getElementById('Insurance.Exp.Date1') as HTMLInputElement).value;
  const LastService = (document.getElementById('Last.Service1') as HTMLInputElement).value;
 

  console.log('Name:', RegistrationNo);
  console.log('ChassisNo:', ChassisNo);
  console.log('EngineeNo:', EngineeNo);
  console.log('Maker:', Maker);
  console.log('Model:', Model);
  console.log('Yearofmanufacturing:', Yearofmanufacturing);
  console.log('Wheels', Wheels);
  console.log('TyreType:', TyreType);
  console.log('FuelType:', FuelType);
  console.log('Insurance:', Insurance);
  console.log('InsuranceExpDate:', InsuranceExpDate);
  console.log("LastService",LastService)


  const customerKey = 'customer_id';
  const customerIdString = localStorage.getItem(customerKey);
  if(this.RCBook1== undefined || ''){
    this.RCBook1 = this.item.rc_book
  }
  if(this.Insurance1 == undefined || ''){
    this.Insurance1 = this.item.Insurance
  }
  if(this.vehicle1 == undefined || ''){
    this.vehicle1 = this.item.pic
  }

  const filterParams = {
    id:this.item.id,
    customerid:customerIdString,
    registration_number:RegistrationNo,
    Chassis_number:ChassisNo,
    engine_number:EngineeNo,
    make:Maker,
    model:Model,
    year_of_manufacture:Yearofmanufacturing,
    wheels:Wheels,
    tyre_type:TyreType,
    fuel_Type:FuelType,
    insurance_number:Insurance,
    insurance_expiry_date:InsuranceExpDate,
    last_service_date:LastService,
    rc_book:this.RCBook1,
     insurance:this.Insurance1, 
   pic:this.vehicle1
  }
  this.http.post<any>('https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=updateTruck', filterParams).subscribe(
    (response) => {
      window.alert("created succesfull")

      this.closeModal('editModal')
      const url = `https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=getTruck&customer_id=${customerIdString}`;
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
          
            // Create the image elements
            const rcBookImg = this.renderer.createElement('img');
            this.renderer.setAttribute(rcBookImg, 'src', `${item.rc_book}`);
            this.renderer.setStyle(rcBookImg, 'width', '50px');
            this.renderer.setStyle(rcBookImg, 'height', 'auto');
            this.renderer.setStyle(rcBookImg, 'cursor', 'pointer');
            // Uncomment and modify the below line if you want to handle image click event
            this.renderer.listen(rcBookImg, 'click', () => {
              this.showImageModal(item.rc_book);
            });
          
            const insuranceImg = this.renderer.createElement('img');
            this.renderer.setAttribute(insuranceImg, 'src', item.insurance);
            this.renderer.setStyle(insuranceImg, 'width', '50px');
            this.renderer.setStyle(insuranceImg, 'height', 'auto');
            this.renderer.setStyle(insuranceImg, 'cursor', 'pointer');
            // Uncomment and modify the below line if you want to handle image click event
            this.renderer.listen(insuranceImg, 'click', () => {
              this.showImageModal(item.insurance); 
            });
          
            const picImg = this.renderer.createElement('img');
            this.renderer.setAttribute(picImg, 'src', `${item.pic}`);
            this.renderer.setStyle(picImg, 'width', '50px');
            this.renderer.setStyle(picImg, 'height', 'auto');
            this.renderer.setStyle(picImg, 'cursor', 'pointer');
            // Uncomment and modify the below line if you want to handle image click event
            this.renderer.listen(picImg, 'click', () => {
              this.showImageModal(item.pic);
            });
          
            return [
              index + 1,
              item.registration_number,
              item.chassis_number,
              item.engine_number,
              item.make,
              item.model,
              item.year_of_manufacture,
              item.wheels,
              item.tyre_type,
              item.load_capacity,
              item.fuel_type,
              item.insurance_number,
              item.insurance_expiry_date,
              item.last_service_date,
              rcBookImg,
              insuranceImg,
              picImg,
              button
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
    })

   
  }
  sendProductId(item){
    this.item = item
    // const modalImage = document.getElementById('picPr') as HTMLImageElement;
    // modalImage.src =  item.insurance;

    // Create and set up the insurance image element

    const insuranceImg = this.renderer.createElement('img');
    this.renderer.setAttribute(insuranceImg, 'src', `https://aktyres-in.stackstaging.com/php-truck/class/${item.insurance}`);
    this.renderer.setStyle(insuranceImg, 'width', '100px');
    this.renderer.setStyle(insuranceImg, 'height', '100px');
    this.renderer.setStyle(insuranceImg, 'cursor', 'pointer');

    // Add click event listener to show the modal with the image
    this.renderer.listen(insuranceImg, 'click', () => {
      const modalImage = document.getElementById('picPre') as HTMLImageElement;
      if (modalImage) {
        
        modalImage.src = `https://aktyres-in.stackstaging.com/php-truck/class/${item.insurance}`;
        // Show the modal (Assuming you have a method or logic to show the modal)
        this.showImageModal(modalImage.src); 
      } else {
        console.error('Modal image element not found.');
      }
    });

    // Append the created image element to the container
    this.renderer.appendChild(this.imageContainer.nativeElement, insuranceImg);
    const rc_book = this.renderer.createElement('img');
    this.renderer.setAttribute(rc_book, 'src', `https://aktyres-in.stackstaging.com/php-truck/class/${item.rc_book}`);
    this.renderer.setStyle(rc_book, 'width', '100px');
    this.renderer.setStyle(rc_book, 'height', '100px');
    this.renderer.setStyle(rc_book, 'cursor', 'pointer');

    // Add click event listener to show the modal with the image
    this.renderer.listen(rc_book, 'click', () => {
      const modalImage = document.getElementById('picPr') as HTMLImageElement;
      if (modalImage) {
        modalImage.src = `https://aktyres-in.stackstaging.com/php-truck/class/${item.rc_book}`;
        // Show the modal (Assuming you have a method or logic to show the modal)
        this.showImageModal(modalImage.src); 
      } else {
        console.error('Modal image element not found.');
      }
    });

    // Append the created image element to the container
    this.renderer.appendChild(this.imageContainer1.nativeElement, rc_book);



    const pic = this.renderer.createElement('img');
    this.renderer.setAttribute(pic, 'src',`https://aktyres-in.stackstaging.com/php-truck/class/${item.pic}` );
    this.renderer.setStyle(pic, 'width', '100px');
    this.renderer.setStyle(pic, 'height', '100px');
    this.renderer.setStyle(pic, 'cursor', 'pointer');

    // Add click event listener to show the modal with the image
    this.renderer.listen(pic, 'click', () => {
      const modalImage = document.getElementById('picPrev') as HTMLImageElement;
      if (modalImage) {
        modalImage.src = `https://aktyres-in.stackstaging.com/php-truck/class/${item.pic}`;
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
  open(){
    const modal = document.getElementById('addModal');
    if (modal) {
        modal.classList.add('show');
        modal.style.display = 'block';
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
  create(){
    const RegistrationNo = (document.getElementById('RegistrationNo') as HTMLInputElement).value;
  const ChassisNo = (document.getElementById('ChassisNo') as HTMLInputElement).value;
  const EngineeNo = (document.getElementById('EngineeNo') as HTMLInputElement).value;
  const Maker = (document.getElementById('Maker') as HTMLInputElement).value;
  const Model = (document.getElementById('Model') as HTMLInputElement).value;
  const Yearofmanufacturing = (document.getElementById('Yearofmanufacturing') as HTMLInputElement).value;
  const Wheels = (document.getElementById('Wheels') as HTMLInputElement).value;
  const TyreType = (document.getElementById('TyreType') as HTMLInputElement).value;
  const FuelType = (document.getElementById('FuelType') as HTMLInputElement).value;
  const Insurance = (document.getElementById('Insurance') as HTMLInputElement).value;
  const InsuranceExpDate = (document.getElementById('Insurance.Exp.Date') as HTMLInputElement).value;
  const LastService = (document.getElementById('Last.Service') as HTMLInputElement).value;
 

  console.log('Name:', RegistrationNo);
  console.log('ChassisNo:', ChassisNo);
  console.log('EngineeNo:', EngineeNo);
  console.log('Maker:', Maker);
  console.log('Model:', Model);
  console.log('Yearofmanufacturing:', Yearofmanufacturing);
  console.log('Wheels', Wheels);
  console.log('TyreType:', TyreType);
  console.log('FuelType:', FuelType);
  console.log('Insurance:', Insurance);
  console.log('InsuranceExpDate:', InsuranceExpDate);
  console.log("LastService",LastService)

  
  const customerKey = 'customer_id';

  // Retrieve the value from local storage
  const customerIdString = localStorage.getItem(customerKey);
  console.log("customerIdString",customerIdString)
  const filterParams = {
    customerid:this.customer,
    registration_number:RegistrationNo,
    Chassis_number:ChassisNo,
    engine_number:EngineeNo,
    make:Maker,
    model:Model,
    year_of_manufacture:Yearofmanufacturing,
    wheels:Wheels,
    tyre_type:TyreType,
    fuel_Type:FuelType,
    insurance_number:Insurance,
    insurance_expiry_date:InsuranceExpDate,
    last_service_date:LastService,
    rc_book:this.RCBook,
     insurance:this.Insurance, 
   pic:this.vehicle
  }

  this.http.post<any>('https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=createTruck', filterParams).subscribe(
    (response) => {
      window.alert("created succesfull")

      this.closeModal('addModal')
      const customerKey = 'customer_id';
      const customerIdString = localStorage.getItem(customerKey);
      console.log("customerIdString",customerIdString)
          const url = `https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=getTruck&customer_id=${customerIdString}`;
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
        
          // Create the image elements
          const rcBookImg = this.renderer.createElement('img');
          this.renderer.setAttribute(rcBookImg, 'src', `data:image/jpeg;base64,${item.rc_book}`);
          this.renderer.setStyle(rcBookImg, 'width', '50px');
          this.renderer.setStyle(rcBookImg, 'height', 'auto');
          this.renderer.setStyle(rcBookImg, 'cursor', 'pointer');
          // Uncomment and modify the below line if you want to handle image click event
          this.renderer.listen(rcBookImg, 'click', () => {
            this.showImageModal(item.rc_book);
          });
        
          const insuranceImg = this.renderer.createElement('img');
          this.renderer.setAttribute(insuranceImg, 'src', `data:image/jpeg;base64,${item.insurance}`);
          this.renderer.setStyle(insuranceImg, 'width', '50px');
          this.renderer.setStyle(insuranceImg, 'height', 'auto');
          this.renderer.setStyle(insuranceImg, 'cursor', 'pointer');
          // Uncomment and modify the below line if you want to handle image click event
          this.renderer.listen(insuranceImg, 'click', () => {
            this.showImageModal(item.insurance);
          });
        
          const picImg = this.renderer.createElement('img');
          this.renderer.setAttribute(picImg, 'src', `data:image/jpeg;base64,${item.pic}`);
          this.renderer.setStyle(picImg, 'width', '50px');
          this.renderer.setStyle(picImg, 'height', 'auto');
          this.renderer.setStyle(picImg, 'cursor', 'pointer');
          // Uncomment and modify the below line if you want to handle image click event
          this.renderer.listen(picImg, 'click', () => {
            this.showImageModal(item.pic);
          });
        
          return [
            index + 1,
            item.registration_number,
            item.chassis_number,
            item.engine_number,
            item.make,
            item.model,
            item.year_of_manufacture,
            item.wheels,
            item.tyre_type,
            item.load_capacity,
            item.fuel_type,
            item.insurance_number,
            item.insurance_expiry_date,
            item.last_service_date,
            rcBookImg,
            insuranceImg,
            picImg,
            button
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
  closeModal(modalId: string): void {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        modal.style.display = 'none';
    }
  }
}
