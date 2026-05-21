import { Component, OnInit, ChangeDetectorRef, Renderer2, ViewChild, ElementRef, AfterViewInit  } from '@angular/core';
import DataTable from 'datatables.net-dt';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
  @ViewChild('imageContainer', { read: ElementRef }) imageContainer: ElementRef;
  @ViewChild('imageContainer1', { read: ElementRef }) imageContainer1: ElementRef;
  @ViewChild('imageContainer2', { read: ElementRef }) imageContainer2: ElementRef;
  constructor(private http: HttpClient,private renderer: Renderer2) { }
  data:any;
table:any;
driver:any;
fromedit:any;
Editdriverno:any;
editto:any;
supertotal:any;
arrivalDate:any;
returnDate:any;
checkway11:any;
expenseedit:any;
expenseedit1:any;
supertotal1:any;
Editdriverno1:any;
lEditreturnlocation3:any;
lEditlocation3:any;
lEditlocation4:any;
selecttru:any;
selectdriv:any;
selectdrivv:any
EditcalculatedDistance1:any;
lEditreturnlocation2:any;
EditcalculatedDistance:any;
lEditlocation2:any;
currcustomer:any;
complaint1:any
complaint:any;
lEditlocation:any;
fuellevel1:any;
Editgtruckno:any;
rows233:any;
date2:any
rows23:any
modalImageSrc:any;
Insurance:any;
vehicle:any;
Rremark:any;
fuellevel:any;
carmileage:any;
remark:any
RCBook:any;
date:any;
date1:any;
loc:any;
truckno3:any;
driverno3:any; 
loc1:any;
loc2:any;
loc3:any;
broker:any;
broker1:any;
mileage2:any;
expense:any;
calculatedDistance1:any;
Insurance1:any;
vehicle1:any;
distance1:any;
distance:any;
location:any;
location1:any;
expense1:any;
location2:any;
truckno1:any;
driverno1:any;
truckno:any;
driverno:any;
location3:any;
RCBook1:any;
mileage:any;
calculatedDistance:any;
item :any;
truck:any;
petrol :any;
selectedfrom:any;
selectedto:any;
selectedfrom1:any;
selectedto1:any;
insuranceImg: any;
selectedRow: any;
      isCollapsed = true;
      selectedPosition = '';
      globalSearchText = '';
      checkway = false
      checkway1 = false
      tableData = [];
      selected:any;
      dataorigin:any;
  
   rows = [{ item: "",weight:"", driver_advance: 0,is_single:0,tripid:0,tonnage_rate:0,total:0,balance:0,remarks:"" }];
   expenseamount = [{ item: "", amount:0,remark:"" }];

   Editexpenseamount = [{ item: "", amount:0,remark:"" }];

   rows1 = [{ item: "",weight:"", driver_advance: 0,is_single:1,tripid:0,tonnage_rate:0,total:0,balance:0,remarks:"" }];

  
      ngOnInit() {
        this.fetchPetrolPrice()
        const customerKey = 'customer_id';

        // Retrieve the value from local storage
        const customerIdString = localStorage.getItem(customerKey);
        this.currcustomer = customerIdString
        console.log("customerIdString",customerIdString)
        const url1 = `https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=getTruck&customer_id=${customerIdString}`;
        this.http.get(url1).subscribe(
          (response) => {
          this.truck = response['body'];
          console.log("truck",this.truck )
          })
          const url2 = `https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=getDriver&customer_id=${customerIdString}`;
          this.http.get(url2).subscribe(
            (response) => {

              this.driver = response['body'];
            }  )
            const url = `https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=gettrip&customer_id=${customerIdString}`;
            this.http.get(url).subscribe(
              (response) => {
                // Handle successful response
                
                this.data = response['body'];
                this.dataorigin = response['body']
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
                
                
                  return [
                    button,
                    index + 1,
                    item.truck_no,
                    item.driver,
                    item.Rdriver,
                    item.trip_date,
                    item.reverse_date,
                    // item.mobile_number,
                    // item.current_km,
                    item.from_location,
                    item.to_location,
                    item.supertotal
                    //  item.Rfrom,
                    //  item.Rto,
                    // item.fuel_level,
                    // item.complaint,
                    // item.remark,
                    // item.reverse_remark,
                    // item.tyre_condition,
                    // item.Rmobile_number,
                    // item.broker,
                    // item.broker1
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
      filterEvents(){
  const filter ={
    from_date:this.arrivalDate,
    to_date:this.returnDate,
    truck_no:this.selecttru,
    driver:this.selectdriv,
    Rdriver: this.selectdrivv
  }
  this.http.post<any>('https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=getTripFilter', filter).subscribe(
    (response) => {
      this.data = response;
      console.log('this.product', response);
      
      const tableData = this.data.map((item, index) => {
        const button = this.renderer.createElement('button');
        this.renderer.addClass(button, 'btn');
        this.renderer.addClass(button, 'btn-info');
        this.renderer.appendChild(button, this.renderer.createText('Edit'));
        // Uncomment and modify the below line if you want to handle button click event
        this.renderer.listen(button, 'click', () => {
          this.sendProductId(item);
        });
      
      
        return [
          button,
          index + 1,
          item.truck_no,
          item.driver,
          item.Rdriver,
          item.trip_date,
          item.reverse_date,
          item.supertotal,
          // item.mobile_number,
          // item.current_km,
          item.from_location,
          item.to_location,
          
          //  item.Rfrom,
          //  item.Rto,
          // item.fuel_level,
          // item.complaint,
          // item.remark,
          // item.reverse_remark,
          // item.tyre_condition,
          // item.Rmobile_number,
          // item.broker,
          // item.broker1
        ];
      });
      this.table.destroy();
      // Initialize DataTable with transformed data
      this.table = new DataTable('#myTable', {
        data: tableData,
      });
     
    })
}
       updateTripId( newTripId) {
         this.rows.map(trip => {
          trip.tripid = newTripId;
        
        });

        this.rows1.map(trip => {
          trip.tripid = newTripId;
        
        });
      }
      returnevent(){
       this.data = this.dataorigin
       const tableData = this.data.map((item, index) => {
        const button = this.renderer.createElement('button');
        this.renderer.addClass(button, 'btn');
        this.renderer.addClass(button, 'btn-info');
        this.renderer.appendChild(button, this.renderer.createText('Edit'));
        // Uncomment and modify the below line if you want to handle button click event
        this.renderer.listen(button, 'click', () => {
          this.sendProductId(item);
        });
      
      
        return [
          button,
          index + 1,
          item.truck_no,
          item.driver,
          item.Rdriver,
          item.trip_date,
          item.reverse_date,
          // item.mobile_number,
          // item.current_km,
          item.from_location,
          item.to_location,
          item.supertotal
          //  item.Rfrom,
          //  item.Rto,
          // item.fuel_level,
          // item.complaint,
          // item.remark,
          // item.reverse_remark,
          // item.tyre_condition,
          // item.Rmobile_number,
          // item.broker,
          // item.broker1
        ];
      });
      this.table.destroy();
      // Initialize DataTable with transformed data
      this.table = new DataTable('#myTable', {
        data: tableData,
      });
      this.arrivalDate = ""
      this.returnDate = ""
      }

      truck1(event){
        console.log("event",event)
        const matchedObject = this.truck.find(obj => obj.id == event);
        this.truckno = matchedObject
        console.log("this.truckno",this.truckno)
      }

      Edittruck(event){
        console.log("event",event)
        const matchedObject = this.truck.find(obj => obj.id == event);
        this.Editgtruckno = matchedObject
        console.log("this.truckno",this.Editgtruckno)
      }
      
      truckno2(event){
        console.log("event",event)
        const matchedObject = this.truck.find(obj => obj.id == event);
        this.truckno3 = matchedObject
        console.log("this.truckno",this.truckno)
      }
      driverno2(event){

        console.log("event1",event)
const matchedObject = this.driver.find(obj => obj.id == event);
this.driverno3 = matchedObject
console.log("this.driverno3",this.driverno3)
      }
      driver1(event){

        console.log("event1",event)
const matchedObject = this.driver.find(obj => obj.id == event);
this.driverno = matchedObject
console.log("this.driverno",this.driverno)
      }

      Editdriver1(event){

        console.log("event1",event)
const matchedObject = this.driver.find(obj => obj.id == event);
this.Editdriverno = matchedObject
console.log("this.driverno",this.Editdriverno)
      }
      Editreturndriver1(event){

        console.log("event1",event)
const matchedObject = this.driver.find(obj => obj.id == event);
this.Editdriverno1 = matchedObject
console.log("this.driverno",this.Editdriverno1)
      }
      edittrip(){

        let fuel_level =  $("#myInput").val();
       let complaint= $("#Editcomplaint").val();
      let  trip_date = $("#editdate").val();
      let broker = $("#brokername").val();
      let truck_no = $("#truckno").val();
      let driver =  $("#editdriver").val();
      let from_location = $("#fromedit").val();
      let to_location = $("#editto").val();
      let remark = $("#remark").val();
      let reverse_date = $("#editretrundate").val();
      let broker1 = $("#editreturnbroker").val();
      let Rdriver = $("#returndriver").val();
       let Rfrom = $("#returnfrom2").val();
       let Rto = $("#returnto2").val();
       let reverse_remark = $("#retrunremark").val();
       let current_km = $("#currentkm").val();
       let mobile = $("#editdriver").val();
       let Rmobile = $("#returndriver").val();
let mobile_number
let Rmobile_number
let driverid
let Rdriverid
       if(this.Editdriverno == undefined){
        mobile_number = mobile
       }
       if(this.Editdriverno){
        mobile_number = this.Editdriverno.phone_number
       }
       if(this.Editdriverno1 == undefined){
        Rmobile_number = mobile
       }
       if(this.Editdriverno1){
        Rmobile_number = this.Editdriverno1.phone_number
       }

       if(this.Editdriverno == undefined){
        driverid =   this.item.driverid 
       }
       if(this.Editdriverno ){
        driverid=   this.Editdriverno.id
       }
       if(this.Editdriverno1 == undefined){
        Rdriverid =   this.item.Rdriverid 
       }
       if(this.Editdriverno1){
        Rdriverid =   this.Editdriverno1.id
       }

       if(this.Editdriverno == undefined){
        driver =   this.item.driver
       }
       if(this.Editdriverno ){
        driver=   this.Editdriverno.name
       }
       if(this.Editdriverno1 == undefined){
        Rdriver =   this.item.Rdriver
       }
       if(this.Editdriverno1){
        Rdriver =   this.Editdriverno1.name
       }
        const submit = {
          id:this.item.id,
          truck_no:truck_no,
          driverid:driverid,
          Rdriverid:Rdriverid,
          driver:driver,
          Rdriver:Rdriver,
          from_location:from_location,
          to_location:to_location,
          trip_date:trip_date,
           reverse_date:reverse_date,
           Rfrom:Rfrom,
          Rto:Rto,
          remark:remark,
          reverse_remark:reverse_remark,
          current_km:Number(current_km),
          fuel_level:fuel_level,
          complaint:complaint,
          // customerid:this.currcustomer,
          mobile_number:mobile_number,
          Rmobile_number:Rmobile_number,
          broker:broker,
          broker1:broker1,
          driverexpense: JSON.stringify(this.expenseedit),
          Rdriverexpense: JSON.stringify(this.expenseedit1)

        }

        console.log("submit",submit)
        this.http.post<any>('https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=editTrip', submit).subscribe(
          (response) => {
          
           const combinedArray = [...this.rows23, ...this.rows233];
           this.http.post<any>('https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=editTripDetail', combinedArray).subscribe(
            (response) => {
           const url = `https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=gettrip&customer_id=${this.currcustomer}`;
           this.http.get(url).subscribe(
             (response) => {

              const modal = document.getElementById('editModal');
              if (modal) {
                  modal.classList.remove('show');
                  modal.style.display = 'none';
              }
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
               
               
               
         return [
          button,
          index + 1,
          item.truck_no,
          item.driver,
          item.Rdriver,
          item.trip_date,
          item.reverse_date,
          // item.mobile_number,
          // item.current_km,
          item.from_location,
          item.to_location,
          item.supertotal
          // item.fuel_level,
          // item.complaint,
          // item.remark,
          // item.reverse_remark,
          // item.tyre_condition,
          // item.Rmobile_number,
          // item.broker,
          // item.broker1
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
        
        
          })
      }
      selecttruck(event){
  this.selecttru = event
      }
      selectdriver(event){
        this.selectdriv = event
            }
            selectdriverr(event){
              this.selectdrivv = event
                  }
                  calculateTotal() {
                    let ttotal = 0;
                
                    // Check if 'rows' is defined and not empty before summing
                    if (Array.isArray(this.rows) && this.rows.length > 0) {
                        for (let i = 0; i < this.rows.length; i++) {
                            ttotal += Number(this.rows[i].total) || 0; // Handle potential NaN values
                        }
                    }
                
                    // Check if 'rows1' is defined and not empty before summing
                    if (Array.isArray(this.rows1) && this.rows1.length > 0) {
                        for (let i = 0; i < this.rows1.length; i++) {
                            ttotal += Number(this.rows1[i].total) || 0;
                        }
                    }
                
                    // Check if 'expenseamount' is defined and not empty before summing
                    if (Array.isArray(this.expenseamount) && this.expenseamount.length > 0) {
                        for (let i = 0; i < this.expenseamount.length; i++) {
                            ttotal += Number(this.expenseamount[i].amount) || 0;
                        }
                    }
                
                    // Check if 'Editexpenseamount' is defined and not empty before summing
                    if (Array.isArray(this.Editexpenseamount) && this.Editexpenseamount.length > 0) {
                        for (let i = 0; i < this.Editexpenseamount.length; i++) {
                            ttotal += Number(this.Editexpenseamount[i].amount) || 0;
                        }
                    }
                
                    // Set the total to supertotal and return
                    this.supertotal = ttotal;
                    return ttotal;
                }
                
                
                calculateTotal1() {
                  let ttotal = 0;
              
                  // Check if 'rows23' exists and is not null before summing
                  if (this.rows23 && Array.isArray(this.rows23) && this.rows23.length > 0) {
                      for (let i = 0; i < this.rows23.length; i++) {
                          ttotal += Number(this.rows23[i].total) || 0;
                      }
                  }
              
                  // Check if 'rows233' exists and is not null before summing
                  if (this.rows233 && Array.isArray(this.rows233) && this.rows233.length > 0) {
                      for (let i = 0; i < this.rows233.length; i++) {
                          ttotal += Number(this.rows233[i].total) || 0;
                      }
                  }
              
                  // Check if 'expenseedit' exists and is not null before summing
                  if (this.expenseedit && Array.isArray(this.expenseedit) && this.expenseedit.length > 0) {
                      for (let i = 0; i < this.expenseedit.length; i++) {
                          ttotal += Number(this.expenseedit[i].amount) || 0;
                      }
                  }
              
                  // Check if 'expenseedit1' exists and is not null before summing
                  if (this.expenseedit1 && Array.isArray(this.expenseedit1) && this.expenseedit1.length > 0) {
                      for (let i = 0; i < this.expenseedit1.length; i++) {
                          ttotal += Number(this.expenseedit1[i].amount) || 0;
                      }
                  }
              
                  // Set the total to supertotal1 and return
                  this.supertotal1 = ttotal;
                  return ttotal;
              }
              
      trip(){
const ttotal = this.calculateTotal()
console.log("ttotal",ttotal)

        console.log("item",this.driverno)
        console.log("selectedfrom1",this.selectedfrom1)
        const submit = {
          truck_no:this.truckno.registration_number,
          driver:this.driverno.name,
          driverid:this.driverno.id,
          Rdriverid:this.driverno3.id,
          Rdriver:this.driverno3.name,
          from_location:this.selectedfrom.name,
          to_location:this.selectedto.name,
          trip_date:this.date1,
          reverse_date:this.date2,
          Rfrom:this.selectedfrom1.name,
          Rto:this.selectedto1.name,
          remark:this.remark,
          reverse_remark:this.Rremark,
          current_km:this.carmileage,
          fuel_level:this.fuellevel,
          complaint:this.complaint,
          customerid:this.currcustomer,
          mobile_number:this.driverno.phone_number,
          Rmobile_number:this.driverno3.phone_number,
          broker:this.broker,
          broker1:this.broker1,
          driverexpense: JSON.stringify(this.expenseamount),
          Rdriverexpense: JSON.stringify(this.Editexpenseamount),
          supertotal: ttotal

        }
console.log("submit",submit)
this.http.post<any>('https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=createTrip', submit).subscribe(
  (response) => {
   console.log("responsecreatetrip",response["trip_details"].id)
   this.updateTripId(response["trip_details"].id)
   const combinedArray = [...this.rows, ...this.rows1];
   this.http.post<any>('https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=createTripDetail', combinedArray).subscribe(
    (response) => {
   const url = `https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=gettrip&customer_id=${this.currcustomer}`;
   this.http.get(url).subscribe(
     (response) => {
       // Handle successful response
       const modal = document.getElementById('openModal');
       if (modal) {
           modal.classList.remove('show');
           modal.style.display = 'none';
       }
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
       
       
         return [
          button,
          index + 1,
          item.truck_no,
          item.driver,
          item.Rdriver,
          item.trip_date,
          item.reverse_date,
          // item.mobile_number,
          // item.current_km,
          item.from_location,
          item.to_location,
          item.supertotal
          // item.fuel_level,
          // item.complaint,
          // item.remark,
          // item.reverse_remark,
          // item.tyre_condition,
          // item.Rmobile_number,
          // item.broker,
          // item.broker1
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


  })
      }
      selectlocation (event){

        const url1 = `https://nominatim.openstreetmap.org/search?q=${event}&format=json`;
        this.http.get(url1).subscribe(
          (response) => {
          this.location = response;
          console.log("this.location",this.location)
          })


      }

      Editlocation (event){

        const url1 = `https://nominatim.openstreetmap.org/search?q=${event}&format=json`;
        this.http.get(url1).subscribe(
          (response) => {
          this.lEditlocation = response;
          console.log("this.location",this.lEditlocation)
          })


      }
      Editlocation1 (event){

        const url1 = `https://nominatim.openstreetmap.org/search?q=${event}&format=json`;
        this.http.get(url1).subscribe(
          (response) => {
          this.lEditlocation2 = response;
          console.log("this.location2",this.lEditlocation2)
          })


      }
      Editlocation3 (event){

        const url1 = `https://nominatim.openstreetmap.org/search?q=${event}&format=json`;
        this.http.get(url1).subscribe(
          (response) => {
          this.lEditlocation3 = response;
          console.log("this.location2",this.lEditlocation3)
          })


      }
      Editlocation4 (event){

        const url1 = `https://nominatim.openstreetmap.org/search?q=${event}&format=json`;
        this.http.get(url1).subscribe(
          (response) => {
          this.lEditlocation4 = response;
          console.log("this.location2",this.lEditlocation4)
          })


      }
    //   async  fetchPetrolPrice() {
    //     try {
    //         const response = await fetch('https://www.goodreturns.in/petrol-price-in-perambalur.html');
    //         const text = await response.text();
    //         const parser = new DOMParser();
    //         const doc = parser.parseFromString(text, 'text/html');
            
    //         // Modify this selector based on the actual structure of the page
    //         const priceElement = doc.querySelector('.class-name-of-price-element');
    //         const petrolPrice = priceElement ? priceElement.textContent : 'Price not found';
    
    //         const priceDisplay = document.getElementById('price-display');
    //         priceDisplay.textContent = `Petrol Price in Perambalur: ${petrolPrice}`;
    //     } catch (error) {
    //         console.error('Error fetching petrol price:', error);
    //     }
    // }
    async  fetchPetrolPrice() {
      try {
          const response = await fetch('https://www.goodreturns.in/diesel-price-in-perambalur.html');
          const text = await response.text();
          const parser = new DOMParser();
          const doc = parser.parseFromString(text, 'text/html');
          
          // Select the fuel-block-details element
          const priceElement = doc.querySelector('.gd-fuel-price');
          const petrolPrice = priceElement ? priceElement.textContent.trim() : 'Price not found';
          
          const priceMatch = petrolPrice.match(/₹\s*(\d+\.\d+)/);
          const petrolPrice1 = priceMatch ? parseFloat(priceMatch[1]).toFixed(2) : 'Price not found';
          this.petrol  = petrolPrice1 
          const priceDisplay = document.getElementById('price-display');
          priceDisplay.textContent = `Petrol Price in Perambalur: ${petrolPrice}`;
          const priceDisplay1 = document.getElementById('price-display1');
          priceDisplay1.textContent = `Petrol Price in Perambalur: ${petrolPrice}`;
          console.log("petrolPrice",petrolPrice)
      } catch (error) {
          console.error('Error fetching petrol price:', error);
      }
  }
   calculateExpense(distance, mileage, petrolPrice) {
    // Ensure the input values are valid numbers
    if (isNaN(distance) || isNaN(mileage) || isNaN(petrolPrice)) {
        throw new Error('Invalid input values. Please provide numbers for distance, mileage, and petrol price.');
    }

    // Calculate the expense
    const expense = (distance / mileage) * petrolPrice;
    this.expense = expense.toFixed(2)
    // Return the rounded expense
    return expense.toFixed(2);
}

calculateExpense1(distance, mileage, petrolPrice) {
  // Ensure the input values are valid numbers
  if (isNaN(distance) || isNaN(mileage) || isNaN(petrolPrice)) {
      throw new Error('Invalid input values. Please provide numbers for distance, mileage, and petrol price.');
  }

  // Calculate the expense
  const expense = (distance / mileage) * petrolPrice;
  this.expense1 = expense.toFixed(2)
  // Return the rounded expense
  return expense.toFixed(2);
}

    
      selectlocation1 (event){

        const url1 = `https://nominatim.openstreetmap.org/search?q=${event}&format=json`;
        this.http.get(url1).subscribe(
          (response) => {
          this.location1 = response;
          console.log("this.location",this.location)
          })


      }
      selectlocation2 (event){

        const url1 = `https://nominatim.openstreetmap.org/search?q=${event}&format=json`;
        this.http.get(url1).subscribe(
          (response) => {
          this.location2 = response;
          console.log("this.location",this.location)
          })


      }

      Editreturnlocation2 (event){

        const url1 = `https://nominatim.openstreetmap.org/search?q=${event}&format=json`;
        this.http.get(url1).subscribe(
          (response) => {
          this.lEditreturnlocation2 = response;
          console.log("this.lEditreturnlocation2",this.lEditreturnlocation2)
          })


      }
      Editreturnlocation3 (event){

        const url1 = `https://nominatim.openstreetmap.org/search?q=${event}&format=json`;
        this.http.get(url1).subscribe(
          (response) => {
          this.lEditreturnlocation3 = response;
          console.log("this.lEditreturnlocation3",this.lEditreturnlocation3)
          })


      }
      selectlocation3 (event){

        const url1 = `https://nominatim.openstreetmap.org/search?q=${event}&format=json`;
        this.http.get(url1).subscribe(
          (response) => {
          this.location3 = response;
          console.log("this.location",this.location)
          })


      }
      mileage1(event){
        this.calculateExpense(this.distance,event,this.petrol)
      }
      mileage23(event){
    this.calculateExpense1(this.distance,event,this.petrol)
      }
      tolocation(event){
        
        const to = this.selectedto
        const from = this.selectedfrom
        console.log("to",to)
        console.log("from",from)

      this.calculatedDistance = this.haversineDistance(from.lat,from.lon,to.lat,to.lon)
      }
      Edittolocation(event){
        
        // const to = this.selectedto
        // const from = this.selectedfrom
  
      
      // this.EditcalculatedDistance = this.haversineDistance(from.lat,from.lon,to.lat,to.lon)
      }
      Edittolocation1(event){
        
        const to = this.selectedto
        const from = this.selectedfrom
        console.log("to",to)
        console.log("from",from)

      this.EditcalculatedDistance1 = this.haversineDistance(from.lat,from.lon,to.lat,to.lon)
      }
      tolocation1(event){
        
        const to = this.selectedto1
        const from = this.selectedfrom1
        console.log("to",to)
        console.log("from",from)

      this.calculatedDistance1= this.haversineDistance1(from.lat,from.lon,to.lat,to.lon)
      }
      getlioc(event){
console.log("event",event)
      }
       haversineDistance(lat1, lon1, lat2, lon2) {
        const toRad = (value) => value * Math.PI / 180;
        
        const R = 6371; // Radius of the Earth in kilometers
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Distance in kilometers
        this.distance = distance
        return distance;
        }

        haversineDistance1(lat1, lon1, lat2, lon2) {
          const toRad = (value) => value * Math.PI / 180;
          
          const R = 6371; // Radius of the Earth in kilometers
          const dLat = toRad(lat2 - lat1);
          const dLon = toRad(lon2 - lon1);
          const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          const distance = R * c; // Distance in kilometers
          this.distance1 = distance
          return distance;
          }

selectProduct(event,i){
      console.log("event", event,i)
      this.rows[i].item = event
      }

      select(event,i){
        console.log("event", event,i)
        this.expenseamount[i].item = event
        }
        select2(event,i){
          console.log("event", event,i)
          this.expenseedit1[i].item = event
          }
          select12(event,i){
            console.log("event", event,i)
            this.expenseedit[i].item = event
            }
        select1(event,i){
          console.log("event", event,i)
          this.Editexpenseamount[i].item = event
          }
      selectweight(event,i){
        console.log("event", event,i)
        this.rows[i].weight= event
      }
      selectadvance(event,i){
        console.log("event", event,i)
        this.rows[i].driver_advance = event
      }
      selecttonerate(event,i){
        console.log("event", event,i)
        this.rows[i].tonnage_rate= event
        let num = Number(this.rows[i].weight);
        this.rows[i].total = (this.rows[i].tonnage_rate * num);
        this.calculateTotal()
      }
      selecttotal(){
    
      }

      Balance(event,i){
        console.log("event", event,i)
        this.rows[i].balance = event
      }
      Remarks(event,i){
        this.rows[i].remarks = event
        console.log(this.rows)
      }
      Rem(event,i){
        this.expenseamount[i].remark = event
        console.log(this.expenseamount)
      }
      Remamount(event,i){
        this.expenseamount[i].amount = event
        console.log(this.expenseamount)
        this.calculateTotal()
      }
      Remamount2(event,i){
        this.expenseedit1[i].amount = event
        console.log(this.expenseedit1)
        this.calculateTotal1()
      }
      Remamount12(event,i){
        this.expenseedit[i].amount = event
        console.log(this.expenseedit1)
        this.calculateTotal1()
      }
      Rem1(event,i){
        this.Editexpenseamount[i].remark = event
        console.log(this.Editexpenseamount)
      }
      Rem12(event,i){
        this.expenseedit[i].remark = event
        console.log(this.Editexpenseamount)
      }
      Rem22(event,i){
        this.expenseedit1[i].remark = event
        
      }
      Remamount1(event,i){
        this.Editexpenseamount[i].amount = event
        console.log(this.Editexpenseamount)
        this.calculateTotal()
      }
editProduct(event,i){
  console.log("event", event,i)
  this.rows23[i].item = event
  }
  editweight(event,i){
    console.log("event", event,i)
    this.rows23[i].weight= event
  }
  editadvance(event,i){
    console.log("event", event,i)
    this.rows23[i].driver_advance = event
  }
  edittonerate(event,i){
    console.log("event", event,i)
    this.rows23[i].tonnage_rate= event
    let num = Number(this.rows23[i].weight);
    this.rows23[i].total = (this.rows23[i].tonnage_rate * num);
    this.calculateTotal1()
  }
  edittotal(){

  }

  editBalance(event,i){
    console.log("event", event,i)
    this.rows23[i].balance = event
  }
  editRemarks(event,i){
    this.rows23[i].remarks = event
    console.log(this.rows)
  }

      addRow() {
        this.rows.push({ item: "",weight:"", driver_advance: 0,is_single:0,tripid:0,tonnage_rate:0,total:0,balance:0,remarks:"" }
        )
    }
    addexpense() {
      this.expenseamount.push({ item: "", amount:0,remark:"" }
      )
  }
  addexpense1() {
    this.expenseedit.push({ item: "", amount:"",remark:"" }
    )
}
removeexpense1() {
  this.expenseedit.push({ item: "", amount:"",remark:"" }
  )
}
addexpense2() {
  this.expenseedit1.push({ item: "", amount:"",remark:"" }
  )
}
removeexpense2() {
  this.expenseedit1.push({ item: "", amount:"",remark:"" }
  )
}
  Editexpense() {
    this.Editexpenseamount.push({ item: "", amount:0,remark:"" }
    )
}
Editremoveexpense(){
  this.Editexpenseamount.pop()
}
  removeexpense(){
    this.expenseamount.pop()
  }
    EditRow() {
      this.rows23.push({ item: "",weight:"", driver_advance: 0,is_single:0,tripid:0,tonnage_rate:0,total:0,balance:0,remarks:"" }
      )
  }
    removeRow(){
      this.rows.pop()
    }
    EditremoveRow(){
      this.rows23.pop()
    }
    selectProduct1(event,i){
      console.log("event", event,i)
      this.rows1[i].item = event
      }
      selectweight1(event,i){
        console.log("event", event,i)
        this.rows1[i].weight= event
      }
      selectadvance1(event,i){
        console.log("event", event,i)
        this.rows1[i].driver_advance = event
      }
      selecttonerate1(event,i){
        console.log("event", event,i)
        this.rows1[i].tonnage_rate= event
        let num = Number(this.rows1[i].weight);
        this.rows1[i].total = (this.rows1[i].tonnage_rate * num);
        console.log("this.rows1[i].total ",this.rows1[i].total )
        this.calculateTotal()
      }
      selecttotal1(){
    
      }

      Balance1(){

      }
      Remarks1(event,i){
        this.rows1[i].balance = event
        console.log(this.rows)
      }

      editselectProduct1(event,i){
        console.log("event", event,i)
        this.rows233[i].item = event
        }
        editselectweight1(event,i){
          console.log("event", event,i)
          this.rows233[i].weight= event
        }
       editselectadvance1(event,i){
          console.log("event", event,i)
          this.rows233[i].driver_advance = event
        }
        editselecttonerate1(event,i){
          console.log("event", event,i)
          this.rows233[i].tonnage_rate= event
          let num = Number(this.rows233[i].weight);
    this.rows233[i].total = (this.rows233[i].tonnage_rate * num);
    this.calculateTotal1()
  }
        editselecttotal1(){
      
        }
  
        editBalance1(){
  
        }
        editRemarks1(event,i){
          this.rows233[i].balance = event
          console.log(this.rows)
        }
  
      

      addRow1() {
        this.rows1.push({ item: "",weight:"", driver_advance: 0,is_single:1,tripid:0,tonnage_rate:0,total:0,balance:0,remarks:"" }
        )
    }
    
    EditaddRow1() {
      this.rows23.push({ item: "",weight:"", driver_advance: 0,is_single:1,tripid:0,tonnage_rate:0,total:0,balance:0,remarks:"" }
      )
  }
  EditaddRow12() {
    this.rows233.push({ item: "",weight:"", driver_advance: 0,is_single:1,tripid:0,tonnage_rate:0,total:0,balance:0,remarks:"" }
    )
}

    deleteRow1() {
      this.rows1.pop()
      
  }
  
  EditdeleteRow1() {
    this.rows23.pop()
    
}
EditdeleteRow21() {
  this.rows233.pop()
  
}   
 selectVehicle(event: Event, vehicle: string) {
        const checkbox1 = document.getElementById('vehicle1') as HTMLInputElement;
        const checkbox2 = document.getElementById('vehicle2') as HTMLInputElement;
        
        if (vehicle === 'vehicle1' && checkbox1.checked) {
          checkbox2.checked = false;
          this.checkway = false
        } else if (vehicle === 'vehicle2' && checkbox2.checked) {
          checkbox1.checked = false;
          this.checkway= true
        }
      }
      selectVehicle1(event: Event, vehicle: string) {
        const checkbox1 = document.getElementById('vehicle11') as HTMLInputElement;
        const checkbox2 = document.getElementById('vehicle21') as HTMLInputElement;
        
        if (vehicle === 'vehicle11' && checkbox1.checked) {
          checkbox2.checked = false;
          this.checkway11 = false
        } else if (vehicle === 'vehicle21' && checkbox2.checked) {
          checkbox1.checked = false;
          this.checkway11= true
        }
      }
      open(){
        const modal = document.getElementById('openModal');
        if (modal) {
            modal.classList.add('show');
            modal.style.display = 'block';
        }
      }

      sendProductId(item){
        this.item = item
        this.expenseedit =  JSON.parse(item.driverexpense)
        this.expenseedit1 =  JSON.parse(item.Rdriverexpense)
        console.log("this.expenseedit",this.expenseedit)
        console.log("this.expenseedit1",this.expenseedit1)
        this.http.get<any>(`https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=getTripdetail&tripid=${this.item.id}`).subscribe(
          (response) => {
            console.log("reponse",response['body'])
            let rows23 = response['body']

            console.log("rows23['is_single']",rows23.is_single)
            this.rows23= rows23.filter(row => row.is_single == 0);
  console.log("this.rows23",this.rows23)

  this.rows233= rows23.filter(row => row.is_single == 1);
  console.log("  this.rows233",  this.rows233)
this.calculateTotal1()
            const modal = document.getElementById('editModal');
            if (modal) {
                modal.classList.add('show');
                modal.style.display = 'block';
            }          })
       
      // const  rows231 = JSON.stringify(rows23)
      //   this.rows23 = rows231
      
      
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
