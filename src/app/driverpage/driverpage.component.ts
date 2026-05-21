import { Component, AfterViewInit, ViewChild, ElementRef,OnInit, Renderer2  } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-driverpage',
  templateUrl: './driverpage.component.html',
  styleUrls: ['./driverpage.component.scss']
})
export class DriverpageComponent implements OnInit {

  @ViewChild('calendar') calendarEl!: ElementRef;

  constructor(private route: ActivatedRoute,private http: HttpClient,private renderer: Renderer2) { }

 datatrue :any;
 driver:any
 shift:any;
 details:any
 stopPicture:any;
 startRemark:any;
 stopRemark:any;
 content:any;
 stopcurrentDateTime:any;
 driverid:any;
 uploadResults1: { file_name: string; location: string; message: string }[] = []; 
 startPicture1: { file_name: string; location: string; message: string }[] = []; 
 currentDateTime1:any
 isStarted1:any;
 customer:any;
 isStopped1:any;
 stopcurrentDateTime1:any;
 startPicture: { file_name: string; location: string; message: string }[] = []; 
 uploadMessages:any;
 isStarted:boolean
 currentDateTime:any;
 searchdetail:any
 date:any
 datashow:any;
 uploadResults: { file_name: string; location: string; message: string }[] = []; 
 isStopped:boolean
  ngOnInit(): void {
    this.datashow = false
    this.datatrue = false
    this.driver = "John Doe"
    const customerKey = 'customer_id';
    const driver = 'driver';
    this.isStarted = false
    // Retrieve the value from local storage
    const customerIdString = localStorage.getItem(customerKey);
    const driverstring = localStorage.getItem(driver);
    console.log("driverstring",driverstring)
    this.driverid = driverstring
    this.customer = customerIdString
    const url = `https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=getdrivertrip&customer_id=${customerIdString}&driver_id=${driverstring}`;
  this.http.get(url).subscribe(
    (response) => {
    console.log("response",response['body'])
    this.details = response['body']
    })
  }
  hideData() {
    this.datashow = false;
  }
  

  handleclick(){
    const rate = (document.getElementById('calendar') as HTMLInputElement).value;
    console.log("rate",rate)
    this.date = rate
    const url = `https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=getTripDetails&tripdate=${rate}&driverid=${ this.driverid}`;
    this.http.get(url).subscribe(
      (response) => {
      this.datashow = true
        this.searchdetail = response['trip_details']
      })

  }
  startTrip() {
    this.isStarted = true;
    this.currentDateTime = new Date().toLocaleString();
  }
  startTrip1() {
    this.isStarted1 = true;
    this.currentDateTime1 = new Date().toLocaleString();
  }
  // Function to stop the trip
  stopTrip() {
    this.isStopped = true;
    this.stopcurrentDateTime = new Date().toLocaleString();
  }
  stopTrip1() {
    this.isStopped1 = true;
    this.stopcurrentDateTime1 = new Date().toLocaleString();
  }
  closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
    this.startPicture = []
    this.uploadResults = []
  }
  closeModal1() {
    this.startPicture1 = []
    this.uploadResults1 = []
    const modal = document.getElementById('modaldetail');
    modal.style.display = 'none';
  }
  fromto(item){
    let details
    let content
    const url = `https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=checkTrip&tripid=${item.id}`;
    this.http.get(url).subscribe(
      (response) => {
      console.log("response",response['body'])
      details  = response['message']
      content = response['data']
      this.content = response['data']
      const start_pictures = JSON.parse(this.content.start_pictures)
      const stop_pictures = JSON.parse(this.content.stop_pictures)
      this.startPicture1.push(...start_pictures)
      this.uploadResults1.push(...stop_pictures)
     console.log("details",details)
     this.shift = item
     console.log("clicked", item)
     this.datatrue = true
      if (details == "No trip data found"){
       console.log("entered")
       const modal = document.getElementById('modal');
       modal.style.display = 'block';
      }
      else if (details == "Trip found"){
       const modal = document.getElementById('modaldetail');
       modal.style.display = 'block';
   if(this.content.shift_start_time == null || "" || undefined){
    this.isStarted1 = false
   
   }else if (this.content.shift_start_time){
     this.isStarted1 = true
   
   }
   if(this.content.shift_end_time == null || "" || undefined){
     
     this.isStopped1 = false
    }else if (this.content.shift_end_time){
     
      this.isStopped1 = true
    }
      }
  
      })
      
 

  }

  
  handleStopPicture(event: any) {
    const files = event.target.files; // Get all selected files
    if (files.length > 0) {
      const uploadPromises = Array.from(files).map(file => {
        return new Promise<{ filename: string; data: string }>((resolve, reject) => {
          if (file instanceof File) { // Ensure the file is an instance of File
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
              const base64Data = reader.result?.toString().split(',')[1]; // Get the base64 data
              if (base64Data) {
                resolve({
                  filename: file.name,
                  data: base64Data
                });
              } else {
                reject(new Error("Failed to read file as base64"));
              }
            };
            reader.onerror = () => {
              reject(new Error("Failed to read file"));
            };
          } else {
            reject(new Error("File is not a File instance"));
          }
        });
      });
  
      Promise.all(uploadPromises)
        .then(results => {
          const details = results; // Array of file objects
  
          // Send the details to the API
          this.http.post<any>('https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=uploaddriverFile', details)
            .subscribe(
              (response: { file_name: string; location: string; message: string }[]) => {
                console.log('Upload successful:', response);
                
                // Append response to uploadResults array
                this.uploadResults.push(...response); // Use spread operator to add to the existing array
  console.log("his.uploadResults",this.uploadResults)
              },
              error => {
                console.error('Upload failed:', error);
                // Store error message in the array
                this.uploadResults.push({
                  file_name: '',
                  location: '',
                  message: 'Upload failed: ' + error.message
                });
              }
            );
        })
        .catch(error => {
          console.error('Error processing files:', error);
          this.uploadResults.push({
            file_name: '',
            location: '',
            message: 'Error processing files: ' + error.message
          });
        });
    }
  }
  
  handleStopPicture1(event: any) {
    const files = event.target.files; // Get all selected files
    if (files.length > 0) {
      const uploadPromises = Array.from(files).map(file => {
        return new Promise<{ filename: string; data: string }>((resolve, reject) => {
          if (file instanceof File) { // Ensure the file is an instance of File
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
              const base64Data = reader.result?.toString().split(',')[1]; // Get the base64 data
              if (base64Data) {
                resolve({
                  filename: file.name,
                  data: base64Data
                });
              } else {
                reject(new Error("Failed to read file as base64"));
              }
            };
            reader.onerror = () => {
              reject(new Error("Failed to read file"));
            };
          } else {
            reject(new Error("File is not a File instance"));
          }
        });
      });
  
      Promise.all(uploadPromises)
        .then(results => {
          const details = results; // Array of file objects
  
          // Send the details to the API
          this.http.post<any>('https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=uploaddriverFile', details)
            .subscribe(
              (response: { file_name: string; location: string; message: string }[]) => {
                console.log('Upload successful:', response);
                
                // Append response to uploadResults array
                this.uploadResults1.push(...response); // Use spread operator to add to the existing array
  console.log("his.uploadResults",this.uploadResults1)
              },
              error => {
                console.error('Upload failed:', error);
                // Store error message in the array
                this.uploadResults1.push({
                  file_name: '',
                  location: '',
                  message: 'Upload failed: ' + error.message
                });
              }
            );
        })
        .catch(error => {
          console.error('Error processing files:', error);
       
        });
    }
  }
  
  deleteFile(index: number) {
    // Remove the file from the uploadResults array
    this.uploadResults.splice(index, 1);
  }
  deleteFile1(index: number) {
    // Remove the file from the uploadResults array
    this.uploadResults1.splice(index, 1);
  }
   
  deletestartFile(index: number) {
    // Remove the file from the uploadResults array
    this.startPicture.splice(index, 1);
  }
  deletestartFile1(index: number) {
    // Remove the file from the uploadResults array
    this.startPicture1.splice(index, 1);
  }

  handleStartPicture(event: any) {
    const files = event.target.files; // Get all selected files
    if (files.length > 0) {
      const uploadPromises = Array.from(files).map(file => {
        return new Promise<{ filename: string; data: string }>((resolve, reject) => {
          if (file instanceof File) { // Ensure the file is an instance of File
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
              const base64Data = reader.result?.toString().split(',')[1]; // Get the base64 data
              if (base64Data) {
                resolve({
                  filename: file.name,
                  data: base64Data
                });
              } else {
                reject(new Error("Failed to read file as base64"));
              }
            };
            reader.onerror = () => {
              reject(new Error("Failed to read file"));
            };
          } else {
            reject(new Error("File is not a File instance"));
          }
        });
      });
  
      Promise.all(uploadPromises)
        .then(results => {
          const details = results; // Array of file objects
  
          // Send the details to the API
          this.http.post<any>('https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=uploaddriverFile', details)
            .subscribe(
              (response: { file_name: string; location: string; message: string }[]) => {
                console.log('Upload successful:', response);
                
                // Append response to uploadResults array
                this.startPicture.push(...response); // Use spread operator to add to the existing array
  console.log("his.uploadResults",this.uploadResults)
              },
              error => {
                console.error('Upload failed:', error);
                // Store error message in the array
               
              }
            );
        })
        .catch(error => {
          console.error('Error processing files:', error);
          this.uploadResults.push({
            file_name: '',
            location: '',
            message: 'Error processing files: ' + error.message
          });
        });
    }
  }

  handleStartPicture1(event: any) {
    const files = event.target.files; // Get all selected files
    if (files.length > 0) {
      const uploadPromises = Array.from(files).map(file => {
        return new Promise<{ filename: string; data: string }>((resolve, reject) => {
          if (file instanceof File) { // Ensure the file is an instance of File
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
              const base64Data = reader.result?.toString().split(',')[1]; // Get the base64 data
              if (base64Data) {
                resolve({
                  filename: file.name,
                  data: base64Data
                });
              } else {
                reject(new Error("Failed to read file as base64"));
              }
            };
            reader.onerror = () => {
              reject(new Error("Failed to read file"));
            };
          } else {
            reject(new Error("File is not a File instance"));
          }
        });
      });
  
      Promise.all(uploadPromises)
        .then(results => {
          const details = results; // Array of file objects
  
          // Send the details to the API
          this.http.post<any>('https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=uploaddriverFile', details)
            .subscribe(
              (response: { file_name: string; location: string; message: string }[]) => {
                console.log('Upload successful:', response);
                
                // Append response to uploadResults array
                this.startPicture1.push(...response); // Use spread operator to add to the existing array

              },
              error => {
                console.error('Upload failed:', error);
                // Store error message in the array
               
              }
            );
        })
        .catch(error => {
          console.error('Error processing files:', error);
       
        });
    }
  }
  formatDateToDB(dateString: string): string {
    // Create a new Date object from the string

    if (dateString == undefined ||"" ||null){
      return ""
    }
    else{
      const date = new Date(dateString);
    
      // Get individual components (year, month, day, hour, minute, second)
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are 0-indexed
      const day = ('0' + date.getDate()).slice(-2);
      const hours = ('0' + date.getHours()).slice(-2);
      const minutes = ('0' + date.getMinutes()).slice(-2);
      const seconds = ('0' + date.getSeconds()).slice(-2);
  
      // Return the formatted date as YYYY-MM-DD HH:MM:SS
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
   
}

  submit(){
    const vehicle_id= (document.getElementById('Vehicle') as HTMLInputElement).value;
    const tripdate = (document.getElementById('tripdate') as HTMLInputElement).value;
    
    const StartRemark = (document.getElementById('StartRemark') as HTMLInputElement).value;
    const stopRemark = (document.getElementById('stopRemark') as HTMLInputElement).value;
     const sumbitdetails = {
      vehicle_id:this.shift.truck_no,
      current_driver_id	:this.driverid,
      shift_start_time:this.formatDateToDB(this.currentDateTime),
      shift_end_time:this.formatDateToDB(this.stopcurrentDateTime),
      start_remark	:StartRemark,
      stop_remark:stopRemark,
      start_pictures: JSON.stringify(this.startPicture),
      stop_pictures: JSON.stringify(this.uploadResults),
      customer_ID:this.customer,
      tripdate:tripdate,
      tripid:this.details[0].id
     }
     
     console.log("sumbitdetails",sumbitdetails)
     console.log("this.details",this.details)
     this.http.post<any>('https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=createDriverShift', sumbitdetails)
     .subscribe(     (response) =>{
      this.startPicture = []
      this.uploadResults = []
      if(response['message'] == "Driver shift updated successfully") {
      this.closeModal()
      window.alert("Driver shift created successfully")
     }
     }
      )
  }

  update(){
    let starttime
    let stoptime
    const tripdate = (document.getElementById('tripdate') as HTMLInputElement).value;
    
    const StartRemark = (document.getElementById('StartRemark1') as HTMLInputElement).value;
    const stopRemark = (document.getElementById('stopRemark1') as HTMLInputElement).value;
 if (this.content.shift_start_time == null || undefined || ""){
   starttime = this.currentDateTime1
 }else{
  starttime = this.content.shift_start_time
 }
 if (this.content.shift_end_time == null || undefined || ""){
  stoptime = this.stopcurrentDateTime
}else{
  stoptime = this.content.shift_end_time
}
    const sumbitdetails = {
      shift_change_id: this.content.shift_change_id,
      vehicle_id:this.shift.truck_no,
      current_driver_id	:this.driverid,
      shift_start_time:this.formatDateToDB(starttime),
      shift_end_time:this.formatDateToDB(stoptime),
      start_remark	:StartRemark,
      stop_remark:stopRemark,
      start_pictures: JSON.stringify(this.startPicture1),
      stop_pictures: JSON.stringify(this.uploadResults1),
      customer_ID:this.customer,
      tripdate:this.shift.trip_date,
      tripid:this.details[0].id
     }
 

     console.log("sumbitdetails",sumbitdetails)
     this.http.post<any>('https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=updateDriverShift', sumbitdetails)
     .subscribe(     (response) =>{
      console.log("messageofdetail",response["message"])
     if(response['message'] == "Driver shift updated successfully") {
      this.startPicture1 = []
      this.uploadResults1 = []
      this.closeModal1()
      window.alert("updated created successfully")
     }
     }
      )
  }
   

}
