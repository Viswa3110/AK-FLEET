import { Component, OnInit, ChangeDetectorRef, Renderer2 } from '@angular/core';
import DataTable from 'datatables.net-dt';
import config from 'datatables.net-dt';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

// declare var $: any;
import * as $ from 'jquery';


// Import DataTables and its Bootstrap 4 extension
import 'datatables.net';
interface uploadedFiles1 {
  filename: string;
  data: string; // Assuming base64 string for the file
  previewUrl?: string; // Optional property for the preview URL
}
interface uploadedFiles2 {
  filename: string;
  data: string; // Assuming base64 string for the file
  previewUrl?: string; // Optional property for the preview URL
}
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  data:any;
  selectedFile1:any;
  table:any;
  uploadimage:any;
  updateitem:any;
  selectedFile:any;
  edituploadedfile : { filename: string }[] = []; 
  customer:any;
  uploadedFiles1:[uploadedFiles1]
  truckno:any;
  uploadedFiles: { filename: string }[] = []; // To store returned filenames
  apiEndpoint = 'https://your-api-endpoint.com/upload'; // Replace with your upload API endpoint
  deleteApiEndpoint = 'https://your-api-endpoint.com/delete'; 
  complaint = {
    customer_id: null,
    truck_id: null,
    filename: null,
    complaint_description: '',
    status: 'Pending'
  };
  baseURL = 'https://aktyres-in.stackstaging.com/php-truck/class/';

  complaints = [];

  constructor(private route: ActivatedRoute,private http: HttpClient,private renderer: Renderer2) { }

  ngOnInit(): void {
    this.customr()
    // Fetch complaints for a specific customer when the component loads
    this.getComplaintsByCustomerId(123); // Replace with actual customer_id
  }
  selectcustomer(event){
console.log("selectcustomer",event)
this.truck(event)
  }
  convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = () => {
        const base64String = reader.result as string;
        // Remove the "data:image/[format];base64," part
        const cleanBase64 = base64String.replace(/^data:image\/[a-zA-Z]+;base64,/, '');
        resolve(cleanBase64);
      };
  
      reader.onerror = error => reject(error);
  
      reader.readAsDataURL(file); // Read the file as Data URL to get Base64
    });
  }
  constructFileURL(filename: string): string {

    console.log()
 
    return `${this.baseURL}${filename}`;
  }

  constructFileURL1(filename: string) {
    const fileURL = `${this.baseURL}${filename}`;
    console.log(fileURL);  // Log the URL to verify it's correct

    // Create a temporary anchor element
    const a = document.createElement('a');
    a.href = fileURL;
    a.download = filename;  // Use the filename as the downloaded file's name
    document.body.appendChild(a);  // Append the anchor to the DOM
    a.click();  // Programmatically click the anchor to trigger the download
    document.body.removeChild(a);  // Clean up by removing the anchor
}

  downloadFile(filename: string): void {
    const fileURL = this.constructFileURL(filename);
  
    const link = document.createElement('a');
    link.href = fileURL;
    link.target = '_blank'; // Opens the file in a new tab if possible
    link.download = filename; // Suggests the file name for download
  
    // Trigger the download
    link.click();
  }
  
   getTodayDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  updatecomplaint(){
    const editcustomer = (document.getElementById('editcustomer') as HTMLInputElement).value;
  const truck = (document.getElementById('editregistration') as HTMLInputElement).value;
  const editcomplaint = (document.getElementById('editcomplaint') as HTMLInputElement).value;
  const editcomplaintdesc = (document.getElementById('editcomplaintdesc') as HTMLInputElement).value;
  const editstatus = (document.getElementById('editstatus') as HTMLInputElement).value;
    const update ={
      complaint_id: this.updateitem?.[0]?.complaint_id,
      customer_id: editcustomer,
       truck_id:truck,
      status: editstatus,
      filename:JSON.stringify(this.edituploadedfile),
      complaint_description:editcomplaintdesc,
      complaint_date:editcomplaint,
      updated_by:"admin",
      updated_date:this.getTodayDate() 
     }
     this.http.post<any>('https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=updateComplaint', update).subscribe(
      (response) => {
        console.log("update",response)
        if(response['message'] == "Complaint updated successfully"){
       this.closeModal('userModal')
       const url = `https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=getComplaints`;
      this.http.get<any[]>(url).subscribe(
        (response) => {
          this.closeModal('createModal')
          this.complaints = response['body'];
          this.data = response['body']
          console.log("getresponse",response)
          const tableData = this.data.map((item, index) => {
            const button = this.renderer.createElement('button');
            this.renderer.addClass(button, 'btn');
            this.renderer.addClass(button, 'btn-info');
            this.renderer.appendChild(button, this.renderer.createText('Edit'));
            this.renderer.listen(button, 'click', () => {
              this.sendProductId(item);
            });
  
            const dateObj = new Date(item.complaint_date);
  
  // Format the date as dd-mm-yyyy
  const formattedDate = dateObj.toLocaleDateString('en-GB').replace(/\//g, '-');
          return [
            index + 1,
            item.complaint_id,
            item.name,
            formattedDate,
            item.complaint_description,
            item.registration_number,
            item.status,
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
          console.error('Error retrieving complaints:', error);
        }
      );
        }

      })
     
  }
  uploadFile(payload: any) {
    const uploadUrl = 'https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=uploaddriverFile'; // Add your API endpoint here
    return this.http.post(uploadUrl, payload);
  }
  onFileSelect(event: Event): void {
    console.log("entered")
    const input = event.target as HTMLInputElement;
  
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0]; // Store the selected file
  
      // Convert the file to Base64
      this.convertToBase64(this.selectedFile).then((base64Data) => {
        // Create the payload
        const payload = [
          {
            filename: this.selectedFile.name,
            data: base64Data,
          },
        ];
  
        // Send files to API
        this.uploadFile(payload).subscribe({
          next: (response: any) => {
           
            // Update the uploadedFiles array with the returned location
            this.uploadedFiles = [
              ...this.uploadedFiles,
              { filename: response[0].location }, 
              
              // Assuming response contains the 'location' key
            ];
            console.log("this.uploadedFiles",this.uploadedFiles)
          },
          error: (err) => {
            console.error('File upload failed:', err);
          },
        });
      });
    }
  }

  onFileSelect1(event: Event): void {
    const input = event.target as HTMLInputElement;
  
    if (input.files && input.files.length > 0) {
      this.selectedFile1 = input.files[0]; // Store the selected file
  
      // Convert the file to Base64
      this.convertToBase64(this.selectedFile1).then((base64Data) => {
        // Create the payload
        const payload = [
          {
            filename: this.selectedFile1.name,
            data: base64Data,
          },
        ];
  
        // Send files to API
        this.uploadFile(payload).subscribe({
          next: (response: any) => {
            console.log("uploadfiles",response)
            // Update the uploadedFiles array with the returned location
            this.edituploadedfile = [
              ...this.edituploadedfile,
              { filename: response[0].location }, // Assuming response contains the 'location' key
            ];
            console.log("this.edituploadedfile",this.edituploadedfile)
          },
          error: (err) => {
            console.error('File upload failed:', err);
          },
        });
      });
    }
  }
  isImage(filename: string): boolean {
    return /\.(jpg|jpeg|png|gif)$/i.test(filename);
  }
  

  setPreviewUrls(): void {
    for (let i = 0; i < this.uploadedFiles1.length; i++) {
      const file = this.uploadedFiles1[i];
      if (this.isImage(file.filename)) {
        file.previewUrl = file.data; // Assuming the base64 data is already available
      } else {
        file.previewUrl = null;
      }
    }
  }
  

  // Handle file preview
  previewFile(file: any): void {
    this.selectedFile = file;
  }
  previewFile1(file: any): void {
    this.selectedFile1 = file;
  }
  // Close the preview
  closePreview(): void {
    this.selectedFile = null;
  }

  
  complaintsubmit(){
    const customer = (document.getElementById('customer') as HTMLInputElement).value;
  const truck = (document.getElementById('truck') as HTMLInputElement).value;
  const complaintDescription = (document.getElementById('complaintDescription') as HTMLInputElement).value;
  const complaintdate = (document.getElementById('complaintdate') as HTMLInputElement).value;
 const complaint ={
  customer_id:customer,
  truck_id:truck,
  filename:JSON.stringify(this.uploadedFiles),
  complaint_description: complaintDescription,
  status:"Pending",
  complaint_date:complaintdate,
 }  
 this.http.post<any>('https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=createComplaint', complaint).subscribe(
  (response) => {
    if (response['message'] =  "Complaint created successfully"){


      const url = `https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=getComplaints`;
      this.http.get<any[]>(url).subscribe(
        (response) => {
          this.closeModal('createModal')
          this.complaints = response['body'];
          this.data = response['body']
          console.log("getresponse",response)
          const tableData = this.data.map((item, index) => {
            const button = this.renderer.createElement('button');
            this.renderer.addClass(button, 'btn');
            this.renderer.addClass(button, 'btn-info');
            this.renderer.appendChild(button, this.renderer.createText('Edit'));
            this.renderer.listen(button, 'click', () => {
              this.sendProductId(item);
            });
  
            const dateObj = new Date(item.complaint_date);
  
  // Format the date as dd-mm-yyyy
  const formattedDate = dateObj.toLocaleDateString('en-GB').replace(/\//g, '-');
          return [
            index + 1,
            item.complaint_id,
            item.name,
            formattedDate,
            item.complaint_description,
            item.registration_number,
            item.status,
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
          console.error('Error retrieving complaints:', error);
        }
      );
    }
  })


}
  deleteFile(file: { filename: string }, index: number): void {
    this.uploadedFiles.splice(index, 1);
  }
  deleteFile1(file: { filename: string }, index: number): void {
    this.edituploadedfile.splice(index, 1);
  }
  adjustTextareaHeight(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    if (textarea) {
      textarea.style.height = 'auto'; // Reset the height to recalculate
      textarea.style.height = textarea.scrollHeight + 'px'; // Adjust height based on content
    }
  }
  
  customr(){
    const url = 'https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=getCustomers';
  this.http.get(url).subscribe(
    (response) => {
      this.customer = response['body'];
    })
    
  }
  open(){
    const modal = document.getElementById('createModal');
    if (modal) {
        modal.classList.add('show');
        modal.style.display = 'block';
    }
  }
 truck(item){
  const url1 = `https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=getTruck&customer_id=${item}`;
  this.http.get(url1).subscribe(
    (response) => {
    this.truckno = response['body'];
    console.log("truck",this.truck )
    })
 }
  // Method to create a complaint and call the API
  onSubmit(): void {
    if (this.complaint.customer_id && this.complaint.truck_id && this.complaint.complaint_description) {
      const userlogin = { // Define the user object to be sent in the API request
        action: 'createComplaint', // Action that identifies the API operation
        ...this.complaint
      };

      this.http.post<any>('https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=createComplaint', userlogin)
        .subscribe(
          (response) => {
            console.log('Complaint created:', response);
            this.getComplaintsByCustomerId(this.complaint.customer_id); // Refresh complaints list
            this.resetForm();
          },
          (error) => {
            console.error('Error creating complaint:', error);
          }
        );
    }
  }

  // Method to fetch complaints by customer_id
  getComplaintsByCustomerId(customerId: number): void {
    const url = `https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=getComplaints`;
    this.http.get<any[]>(url).subscribe(
      (response) => {
        this.complaints = response['body'];
        this.data = response['body']
        console.log("getresponse",response)
        const tableData = this.data.map((item, index) => {
          const button = this.renderer.createElement('button');
          this.renderer.addClass(button, 'btn');
          this.renderer.addClass(button, 'btn-info');
          this.renderer.appendChild(button, this.renderer.createText('Edit'));
          this.renderer.listen(button, 'click', () => {
            this.sendProductId(item);
          });

          const dateObj = new Date(item.complaint_date);

// Format the date as dd-mm-yyyy
const formattedDate = dateObj.toLocaleDateString('en-GB').replace(/\//g, '-');
        return [
          index + 1,
          item.complaint_id,
          item.name,
          formattedDate,
          item.complaint_description,
          item.registration_number,
          item.status,
          button

        ];
      });
      
      this.table = new DataTable('#myTable', {
        data: tableData,
      });
      
  
      },
      (error) => {
        console.error('Error retrieving complaints:', error);
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
  sendProductId(item){
    console.log("edit",item)
    this.updateitem = this.data.filter(map => map.complaint_id === item.complaint_id);
    ;
    console.log("this.updateitem",this.updateitem)
const dateObj = new Date(item.complaint_date);

try {
  this.edituploadedfile = JSON.parse(item.filename);
} catch (error) {
  console.log('Error parsing JSON:', error);
  this.edituploadedfile = []
}

console.log("edituploadedfile",this.edituploadedfile)
// Format the date as yyyy-MM-dd
const formattedDate = dateObj.toISOString().split('T')[0];
this.updateitem.complaint_date = formattedDate;

    console.log("this.updateitem.complaint_date",this.updateitem.complaint_date)
    const modal = document.getElementById('userModal');
  if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
  }
  }
  // Method to handle file changes
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.complaint.filename = file.name; // Set filename
    }
  }

  // Method to reset the form after submission
  resetForm(): void {
    this.complaint = {
      customer_id: null,
      truck_id: null,
      filename: null,
      complaint_description: '',
      status: 'Pending'
    };
  }
 
  
}
