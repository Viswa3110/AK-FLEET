import { Component, OnInit, ChangeDetectorRef, Renderer2, ViewChild, ElementRef, AfterViewInit  } from '@angular/core';
import DataTable from 'datatables.net-dt';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-uploadfiles',
  templateUrl: './uploadfiles.component.html',
  styleUrls: ['./uploadfiles.component.scss']
})
export class UploadfilesComponent implements OnInit {

  imageUrl = 'https://www.researchgate.net/profile/Priscila-Farias-3/publication/332517289/figure/fig7/AS:749215688953857@1555638348119/Truck-body-scheme-designed-from-photos-of-truck-bodies-produced-by-Carrocerias-Garcia-in.jpg';
  data :any
  isCollapsed = true;
  selectedPosition = '';
  globalSearchText = '';
  showPreview:any;
  tableData = [];
  selectedFile:any;
  filteredData = [];
  filtereddata:any
  unsafeUrl:any;
  table:any
  selectedrow:any;
  isedit = false
  fileUrl2:any
  fileUrl3:any
  editdate:any;
  selectedbefore:any;
  selectedafter:any;
  selectdate:any
  selectedFile1:any;
  unsafeUrl1:any;
  fileUrl1:any;
  showtable = false
  pdfBeforeUrl:any
  pdfAfterUrl:any
  showModal:any;
  dateFilter = '';
  fileUrl:any;
  positionFilter = '';

  searchText = '';
  customer:any
  from:any
  isBefore:any
  to:any
  selectedcustomer:any
 truck:any;
 selectedvehicle:any;

  constructor(private http: HttpClient,private renderer: Renderer2,private sanitizer: DomSanitizer) { }

  ngOnInit() {


    // const url = `https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=getTruck&customer_id=${customerIdString}`;
    // this.http.get(url).subscribe(
    //   (response) => {
    const url = 'https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=getCustomers';
    this.http.get(url).subscribe(
      (response) => {

        this.customer =  response['body'];
        console.log("this.customer",this.customer)
      })
 
  }


  selectcustomer(event){
this.selectedcustomer
     const url = `https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=getTruck&customer_id=${event}`;
    this.http.get(url).subscribe(
      (response) => {
this.truck =  response['body'];
        console.log("response truck",response)
      })
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


this.showtable = true


      }
    )
  }
  filter1(vehicle,from,to){

    const filter = {
      vehicle:vehicle,
    from_date :from,
    to_date:to
    }
    const url = `https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=getAlloyFilter`;
    this.http.post(url,filter).subscribe(
      (response) => {
console.log("response",response)
this.data = response


this.showtable = true


      }
    )
  }
  closePreview2(modalId){
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        modal.style.display = 'none';
    }
  }
  // Function to preview the file
  previewFile() {
    const modal = document.getElementById('innermodal');
    if (modal) {
        modal.classList.add('show');
        modal.style.display = 'block';
    }
  }
  editpreviewFile() {
    const modal = document.getElementById('innermodal2');
    if (modal) {
        modal.classList.add('show');
        modal.style.display = 'block';
    }
  }
  editpreviewFile1() {
    const modal = document.getElementById('innermodal3');
    if (modal) {
        modal.classList.add('show');
        modal.style.display = 'block';
    }
  }
  previewFile1(){
    const modal = document.getElementById('innermodal1');
    if (modal) {
        modal.classList.add('show');
        modal.style.display = 'block';
    }
  }
  // Function to close the preview
  closePreview() {
    this.showPreview = false;
    const modal = document.getElementById('innermodal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
  }
  }

  // Function to unselect the file
  unselectFile() {
    this.selectedFile = null;
    this.fileUrl = null;
    this.showPreview = false;
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = ''; // Reset the file input
    }
  }
  editunselectFile() {
    console.log("entered")
    this.selectedbefore = null;
    this.fileUrl2 = null;

    const fileInput = document.getElementById('file-upload2') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = ''; // Reset the file input
    }
  }
  editunselectFile1() {
    this.selectedafter = null;
    this.fileUrl3 = null;

    const fileInput = document.getElementById('file-upload3') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = ''; // Reset the file input
    }
  }
  unselectFile1() {
    this.selectedFile1 = null;
    this.fileUrl1 = null;
    this.showPreview = false;
    const fileInput = document.getElementById('file-upload1') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = ''; // Reset the file input
    }
  }
  // Check if the selected file is an image
  isImage(file: File | null): boolean {
    return file ? file.type.startsWith('image/') : false;
  }

  // Check if the selected file is a PDF
  isPDF(file: File | null): boolean {
    return file ? file.type === 'application/pdf' : false;
  }
  triggerFileUpload(event: MouseEvent) {
    event.preventDefault();
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }
  triggerFileUpload2(event: MouseEvent) {
    event.preventDefault();
    const fileInput = document.getElementById('file-upload2') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }
  triggerFileUpload3(event: MouseEvent) {
    event.preventDefault();
    const fileInput = document.getElementById('file-upload3') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }
  triggerFileUpload1(event: MouseEvent) {
    event.preventDefault();
    const fileInput = document.getElementById('file-upload1') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }
  // Function to handle file selection
  // handleFileInput(event: Event) {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files && input.files.length > 0) {
  //     this.selectedFile = input.files[0];
  //     this.fileUrl = URL.createObjectURL(this.selectedFile); 
  //     console.log('Selected file:', this.fileUrl);
  //   }
  // }
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
          if (response && response.length > 0) {
            const pdfUrl = response[0].location; // Extract the PDF location from response

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
  handleFileInput2(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedbefore = input.files[0]; // Store the selected file
      this.convertToBase64(this.selectedbefore).then((base64Data) => {
        // Create the payload
        const payload = [{
          filename: this.selectedbefore?.name,
          data: base64Data
        }];

        // Call the backend to upload the file
        this.uploadFile(payload).subscribe((response: any) => {
          if (response && response.length > 0) {
            const pdfUrl = response[0].location; // Extract the PDF location from response

            // Build the unsafe URL
            const unsafeUrl = 'https://aktyres-in.stackstaging.com/php-truck/class/' + pdfUrl;
            console.log("unsafeUrl", this.unsafeUrl);
            
            // Sanitize the URL
            this.fileUrl2 = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
          }
        });
      });
    }
  }
  handleFileInput3(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedafter = input.files[0]; // Store the selected file
      this.convertToBase64(this.selectedafter).then((base64Data) => {
        // Create the payload
        const payload = [{
          filename: this.selectedafter?.name,
          data: base64Data
        }];

        // Call the backend to upload the file
        this.uploadFile(payload).subscribe((response: any) => {
          if (response && response.length > 0) {
            const pdfUrl = response[0].location; // Extract the PDF location from response

            // Build the unsafe URL
            const unsafeUrl = 'https://aktyres-in.stackstaging.com/php-truck/class/' + pdfUrl;
            console.log("unsafeUrl", this.unsafeUrl);
            
            // Sanitize the URL
            this.fileUrl3 = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
          }
        });
      });
    }
  }
  handleFileInput1(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile1 = input.files[0]; // Store the selected file
      this.convertToBase64(this.selectedFile1).then((base64Data) => {
        // Create the payload
        const payload = [{
          filename: this.selectedFile1?.name,
          data: base64Data
        }];

        // Call the backend to upload the file
        this.uploadFile(payload).subscribe((response: any) => {
          if (response && response.length > 0) {
            const pdfUrl = response[0].location; // Extract the PDF location from response

            // Build the unsafe URL
            this.unsafeUrl1 = 'https://aktyres-in.stackstaging.com/php-truck/class/' + pdfUrl;
            console.log("unsafeUrl", this.unsafeUrl);
            
            // Sanitize the URL
            this.fileUrl1 = this.sanitizer.bypassSecurityTrustResourceUrl(this.unsafeUrl);
          }
        });
      });
    }
  }
  uploadFile(payload: any) {
    const uploadUrl = 'https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=uploadPDF'; // Add your API endpoint here
    return this.http.post(uploadUrl, payload);
  }
  // Function to convert file to Base64
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
  edit(row){
console.log("editrow",row)
this.selectedrow = row
this.fileUrl2 = this.sanitizer.bypassSecurityTrustResourceUrl(row.before);
this.fileUrl3 = this.sanitizer.bypassSecurityTrustResourceUrl(row.after);
this.selectedbefore = {name:this.extractFileName(row.before)}
this.selectedafter ={name: this.extractFileName(row.after)} 
this.editdate = row.date
this.isedit = true
  }
extractFileName(url){
    // Split the URL by '/' and get the last part
    const parts = url.split('/');
    return parts[parts.length - 1];
  }
  sumbit(){
    const payment = {
      date:this.selectdate,
      vehicle:this.selectedvehicle,
      before:this.fileUrl.changingThisBreaksApplicationSecurity
      ,
      customerid:this.selectedcustomer,
      after:this.fileUrl.changingThisBreaksApplicationSecurity

    }
    console.log("payment",payment)
    this.http.post<any>('https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=createAlloyRecord', payment).subscribe(
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

      this.filter1(payment.vehicle,payment.date,payment.date)
  }
  createon(){
 this.isedit = false
  }
  update(){
    const payment = {
      date:this.editdate,
      id:this.selectedrow.id,
      
      before:this.fileUrl2.changingThisBreaksApplicationSecurity,
      after:this.fileUrl2.changingThisBreaksApplicationSecurity

    }
    console.log("payment",payment)
  
    this.http.post<any>('https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=editAlloyRecord', payment).subscribe(
      (response) => {
        window.alert("Edited Successfully")
        document.querySelectorAll('.toast').forEach(function(toast) {
          // Add the 'show' class to display the toast
          toast.classList.add('show');
          
          // Set a timeout to remove the 'show' class after 2 seconds
          setTimeout(function() {
              toast.classList.remove('show');
          }, 2000); // 2000 milliseconds = 2 seconds
      });
      })

      this.filter1(this.selectedvehicle,payment.date,payment.date)
  }
  closeModal() {
    this.showModal = false;
    this.pdfBeforeUrl = '';
    this.pdfAfterUrl = '';
    const modal = document.getElementById('showModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
  }
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
  selectvehicle(event){
this.selectedvehicle = event

  }

  


}
