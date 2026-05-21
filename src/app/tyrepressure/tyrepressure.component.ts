import { Component, OnInit, ChangeDetectorRef, Renderer2, ViewChild, ElementRef, AfterViewInit  } from '@angular/core';
import DataTable from 'datatables.net-dt';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tyrepressure',
  templateUrl: './tyrepressure.component.html',
  styleUrls: ['./tyrepressure.component.scss'],
  providers: [DatePipe]
})
export class TyrepressureComponent implements OnInit {
  selectedcustomer:any
  customer:any
  truck :any
  position:any
  commonDate:any
  data:any
  selectedcus:any
  showtable = false
  selectedvehicle :any
  item = { Date: new Date() };
  from:any
  to:any
  table:any;
  tyredata:any
  constructor(private http: HttpClient,private datePipe: DatePipe,private renderer: Renderer2,private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  
    const url = 'https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=getCustomers';
    this.http.get(url).subscribe(
      (response) => {

        this.customer =  response['body'];
        console.log("this.customer",this.customer)
      })
const  tableData= [{}]
      this.table = new DataTable('#myTable', {
        data: tableData,
      });
  }

  formatDate(date: any): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd HH:mm:ss') || ''; // Default to empty string if null/undefined
  }
submit(){
  console.log("this.position",this.position)
  const requiredFields = [
    "Depth", "Toberun", "actualDep", "fixedDep", 
    "recorded_at", "truck_id", "tyre_position", "tyre_pressure"
  ];
  
  this.position = this.position.map(item => {
    // Ensure all required fields exist in the object
    requiredFields.forEach(field => {
      if (!(field in item)) {
        item[field] = null;  // Set to null if missing
      }
    });
    return item;
  });

  console.log("this.position",this.position)
  const url = `https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=createTyrePressure`;
  this.http.post(url,this.position).subscribe(
    (response) => {
      const modal = document.getElementById('modalcreate');
      if (modal) {
          modal.classList.remove('show');
          modal.style.display = 'none';
      } 
   if (response["message"] == "Records created successfully."){
  
    const modal = document.getElementById('modalcreate');
    if (modal) {
        modal.classList.remove('show');
        modal.style.display = 'none';
    }
    
    this.showtable = true;
  // this.position =   this.generateTyreOptions(this.data.total_tyres, this.data.total_axles, this.data.axtyre);
  // Parse the JSON string in axtyre
// this.data[0].axtyre = JSON.parse(this.data[0].axtyre);

// // Ensure other fields are parsed as numbers if needed
// this.data[0].total_axles = Number(this.data[0].total_axles);
// this.data[0].total_tyres = Number(this.data[0].total_tyres);

// // Use the parsed values in generateTyreOptions
// this.position = this.generateTyreOptions2(

// this.data[0].total_axles,
// this.data[0].axtyre
// ).map((position) => {
// return {
// ...position
// };
// });

  
  console.log(" this.position ", this.position )
  
    console.log("tyrek", response);
    const url = `https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=getTyrePressureDetails&customer_id=${this.selectedcustomer}&truck_id=${this.position[0].truck_id}`
    this.http.get(url).subscribe((response) => {
      this.data = response['body'];
      const tableData = this.data.map((item, index) => {
        const button = this.renderer.createElement('button');
        this.renderer.addClass(button, 'btn');
        this.renderer.addClass(button, 'btn-info');
        this.renderer.appendChild(button, this.renderer.createText('Edit'));
        this.renderer.listen(button, 'click', () => {
          this.makeEditable(item, index); // Pass index when making row editable
        });
  
        return [
          index + 1, // Serial Number
          item.tyre_position,
          item.tyre_pressure,
          item.fixedDep,
          item.actualDep,
          item.Depth,
          item.Toberun,
          item.recorded_at,
          button
        ];
      });
  
      // Destroy existing DataTable if it exists
      if (this.table) {
        this.table.destroy();
      }
  
      // Initialize DataTable with the new data
      setTimeout(() => {
        this.table = new DataTable('#myTable', {
          data: tableData,
          columns: [
            { title: "Sl.No" },
            { title: "Tyre Position" },
            { title: "Pressure" },
            { title: "Fixed Depth" },
            { title: "Actual Depth" },
            { title: "Depth" },
            { title: "Toberun" },
            { title: "Date" },
            { title: "Action" }
          ],
          paging: true,
          searching: true,
          lengthMenu: [10, 25, 50, 100],
          pageLength: 10
        });
      }, 0);
    })
    


    document.querySelectorAll('.toast').forEach(function(toast) {
      // Add the 'show' class to display the toast
      toast.classList.add('show');
      
      // Set a timeout to remove the 'show' class after 2 seconds
      setTimeout(function() {
          toast.classList.remove('show');
      }, 2000); // 2000 milliseconds = 2 seconds
  });
   }



    }
  )
}
  // Handle change in input and update the item.Date
  onDateChange(newDate: string): void {
    const parsedDate = new Date(newDate);
    if (!isNaN(parsedDate.getTime())) { // Check if the date is valid
      this.item.Date = parsedDate;
    }
  }
  selectcustomer(event){
    this.selectedcustomer = event
         const url = `https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=getTruck&customer_id=${event}`;
        this.http.get(url).subscribe(
          (response) => {
    this.truck =  response['body'];
            console.log("response truck",response)
          })
      }
   

    // selectvehicle(event) {
    //   this.selectedvehicle = event;
    //   const url = `https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=getTyrePressureDetails&customer_id=${this.selectedcustomer}&truck_id=${event}`;
    
    //   this.http.get(url).subscribe((response) => {
    //     this.data = response['body'];
    //     this.showtable = true;
    //     console.log("tyrek", response);
    
    //     const tableData = this.data.map((item, index) => {
    //       const button = this.renderer.createElement('button');
    //                 this.renderer.addClass(button, 'btn');
    //                 this.renderer.addClass(button, 'btn-info');
    //                 this.renderer.appendChild(button, this.renderer.createText('Edit'));
    //                 this.renderer.listen(button, 'click', () => {
    //                   this.sendProductId(item);
    //                 });
    //       return [
    //         index + 1, // Serial Number
    //         item.tyre_position,
    //         item.tyre_pressure,
    //         item.recorded_at,
    //         button
    //       ];
    //     });
    
    //     // Destroy existing DataTable if it exists
    //     if (this.table) {
    //       this.table.destroy();
    //     }
    
    //     // Initialize DataTable with the new data
    //     setTimeout(() => {
    //       this.table = new DataTable('#myTable', {
    //         data: tableData,
    //         columns: [
    //           { title: "Sl.No" },
    //           { title: "Tyre Position" },
    //           { title: "Pressure" },
    //           { title: "Date" },
    //           { title: "Action"}
    //         ],
    //         paging: true,
    //         searching: true,
    //         lengthMenu: [10, 25, 50, 100],
    //         pageLength: 10
    //       });
    //     }, 0);
    //   });
    // }
    // generateTyreOptions(totalTyres: number, totalAxles: number): Array<any> {
    //   const tyrePositions = [];
    //   let positionCounter = 1;
    
    //   // Generate tyre positions based on the number of axles and tyres
    //   for (let axle = 1; axle <= totalAxles; axle++) {
    //     const tyresPerAxle = Math.min(2, totalTyres - tyrePositions.length); // Max 2 tyres per axle
    //     for (let tyre = 1; tyre <= tyresPerAxle; tyre++) {
    //       tyrePositions.push({
    //         id: `Axle-${axle}-Tyre-${tyre}`,
    //         position: `Axle ${axle} - Tyre ${tyre}`
    //       });
    //     }
    //   }
    
    //   return tyrePositions;
    // }
    closeModal(modalId: string): void {
      const modal = document.getElementById(modalId);
      if (modal) {
          modal.classList.remove('show');
          modal.style.display = 'none';
      }
    }
    getdata(){
      if (this.selectedcustomer &&  this.selectedvehicle){
        console.log("this.selectedcustomer &&  this.selectedvehicle",this.selectedcustomer +  this.selectedvehicle)
        const modal = document.getElementById('modalcreate');
        if (modal) {
            modal.classList.add('show');
            modal.style.display = 'block';
        }
      }
      else{
        window.alert('Please select Customer and Vehicle')
      }

    } 
    openModal(modalId: string): void {
      const modal = document.getElementById(modalId);
      if (modal) {
          modal.classList.add('show');
          modal.style.display = 'block';
      }
    }
    selectvehicle(event) {
      this.selectedvehicle = event;
      const url1 = ` https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=getTyreConfig&truck_id=${event}`
      const url = `https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=getTyrePressureDetails&customer_id=${this.selectedcustomer}&truck_id=${event}`;
    
      this.http.get(url1).subscribe((response) => {

        this.position = this.generateTyreOptions2(
      
          response['body'][0].total_axles,
          JSON.parse( response['body'][0].axtyre)
        ).map((tyre_position) => {
          console.log("tyre_position",tyre_position)
          return {
            ...tyre_position,
            
            truck_id:event
          };
        });

        console.log("this.position",this.position)
        // console.log("JSON.parse(response['body'][0].total_axles)",JSON.parse(response['body'][0].total_axles))
        // console.log("this.position ",this.generateTyreOptions2(
        //  response['body'][0].total_axles,
        //  JSON.parse( response['body'][0].axtyre)
        // ) )
      })
      this.http.get(url).subscribe((response) => {
        this.data = response['body'];
        this.showtable = true;
      // this.position =   this.generateTyreOptions(this.data.total_tyres, this.data.total_axles, this.data.axtyre);
      // Parse the JSON string in axtyre
this.data[0].axtyre = JSON.parse(this.data[0].axtyre);

// Ensure other fields are parsed as numbers if needed
this.data[0].total_axles = Number(this.data[0].total_axles);
this.data[0].total_tyres = Number(this.data[0].total_tyres);

// Use the parsed values in generateTyreOptions
this.position = this.generateTyreOptions2(

  this.data[0].total_axles,
  this.data[0].axtyre
).map((tyre_position) => {
  return {
    ...tyre_position,
    
    truck_id:event
  };
});

      
      console.log(" this.position ", this.position )
      
        console.log("tyrek", response);
    
        const tableData = this.data.map((item, index) => {
          const button = this.renderer.createElement('button');
          this.renderer.addClass(button, 'btn');
          this.renderer.addClass(button, 'btn-info');
          this.renderer.appendChild(button, this.renderer.createText('Edit'));
          this.renderer.listen(button, 'click', () => {
            this.makeEditable(item, index); // Pass index when making row editable
          });
    
          return [
            index + 1, // Serial Number
            item.tyre_position,
            item.tyre_pressure,
            item.fixedDep,
            item.actualDep,
            // item.Depth,
            item.Toberun,
            item.recorded_at,
            button
          ];
        });
    
        // Destroy existing DataTable if it exists
        if (this.table) {
          this.table.destroy();
        }
    
        // Initialize DataTable with the new data
        setTimeout(() => {
          this.table = new DataTable('#myTable', {
            data: tableData,
            columns: [
              { title: "Sl.No" },
              { title: "Tyre Position" },
              { title: "Pressure" },
              { title: "Fixed Depth" },
              { title: "Current Depth" },
              // { title: "Depth" },
              { title: "Toberun" },
              { title: "Date" },
              { title: "Action" }
            ],
            paging: true,
            searching: true,
            lengthMenu: [10, 25, 50, 100],
            pageLength: 10
          });
        }, 0);
      });
    }
    onDate(event){
      console.log("event",event)
      this.position.forEach(position => {
        position.recorded_at =  event.target.value;
      });
    }
 // ... existing code ...

onfixedDepth(event) {
  
  this.position.forEach(position => {
position.fixedDep = event.target.value;
  });
}

// ... existing code ...
    makeEditable(item, index) {

      this.selectedcus = item
      // this.selectedcus.recorded_at = new Date(this.selectedcus.recorded_at).toISOString().split('T')[0];
      this.selectedcus.recorded_at = new Date(this.selectedcus.recorded_at + " UTC").toISOString().split("T")[0];

      const modal = document.getElementById('getModal1');
  if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
  }

    }
  //   makeEditable(item, index) {
  //     // Get the row element where the "Edit" button was clicked
  //     const row = this.table.row(index).node();
    
  //     // Save the original values for reverting
  //     const originalItem = { ...item };
    
  //     // Find the tyre position, tyre pressure, and recorded at cells
  //     const tyrePositionCell = row.cells[1];
  //     const tyrePressureCell = row.cells[2];
  //     const recordedAtCell = row.cells[3];
    
  //     // Get tyre positions from generateTyreOptions (same as your current logic)
  //     const totalTyres = item.total_tyres; // Example, use the actual total tyres
  //     const totalAxles = item.total_axles;  // Example, use the actual total axles
  //     const axtyre = item.axtyre;
  //  // Example
  //     const tyrePositions = this.generateTyreOptions(totalTyres, totalAxles, axtyre);
    
  //     // Create a select dropdown for tyre position (same as your current logic)
  //     const selectTyrePosition = this.renderer.createElement('select');
  //     tyrePositions.forEach(option => {
  //       const optionElement = this.renderer.createElement('option');
  //       this.renderer.setAttribute(optionElement, 'value', option.position);
  //       this.renderer.appendChild(optionElement, this.renderer.createText(option.position));
  //       this.renderer.appendChild(selectTyrePosition, optionElement);
  //     });
    
  //     // Replace the tyre position cell content with the select element
  //     this.renderer.setProperty(tyrePositionCell, 'innerHTML', '');
  //     this.renderer.appendChild(tyrePositionCell, selectTyrePosition);
    
  //     // Set the current value of the dropdown
  //     this.renderer.setProperty(selectTyrePosition, 'value', item.tyre_position);
    
  //     // Add a listener to update the tyre position when the user selects a new option
  //     this.renderer.listen(selectTyrePosition, 'change', (event) => {
  //       item.tyre_position = event.target.value;  // Update the tyre position in the item object
  //       console.log('Updated tyre position:', item.tyre_position);
  //     });
    
  //     // Replace tyre pressure and recorded at cells with input fields
  //     this.renderer.setProperty(tyrePressureCell, 'innerHTML', `<input type="text" value="${item.tyre_pressure}">`);
  //     this.renderer.setProperty(recordedAtCell, 'innerHTML', `<input type="text" value="${item.recorded_at}">`);
    
  //     // Create and display the tick and cancel buttons
  //     const tickButton = this.renderer.createElement('button');
  //     this.renderer.addClass(tickButton, 'btn');
  //     this.renderer.addClass(tickButton, 'btn-success');
  //     this.renderer.appendChild(tickButton, this.renderer.createText('✔'));
    
  //     const cancelButton = this.renderer.createElement('button');
  //     this.renderer.addClass(cancelButton, 'btn');
  //     this.renderer.addClass(cancelButton, 'btn-danger');
  //     this.renderer.appendChild(cancelButton, this.renderer.createText('✘'));
    
  //     // Replace the action cell with the tick and cancel buttons
  //     const actionCell = row.cells[4];
  //     this.renderer.setProperty(actionCell, 'innerHTML', '');
  //     this.renderer.appendChild(actionCell, tickButton);
  //     this.renderer.appendChild(actionCell, cancelButton);
    
  //     // Add event listener for the "tick" button (save changes)
  //     this.renderer.listen(tickButton, 'click', () => {
  //       // Update the values in the item object
  //       item.tyre_pressure = row.cells[2].querySelector('input').value;
  //       item.recorded_at = row.cells[3].querySelector('input').value;
    
  //       // Save the changes to the backend or perform any necessary actions
  //       console.log('Updated Item:', item);
  //       this.saveChanges(item, index); // Custom function to save data, pass index here
  //     });
    
  //     // Add event listener for the "X" button (cancel editing)
  //     this.renderer.listen(cancelButton, 'click', () => {
  //       // Revert the item back to its original state
  //       item.tyre_position = originalItem.tyre_position;
  //       item.tyre_pressure = originalItem.tyre_pressure;
  //       item.recorded_at = originalItem.recorded_at;
    
  //       // Revert the UI to the original state
  //       this.updateRow(row, item, index);
  //     });
  //   }
    
    saveChanges() {

      console.log(" this.selectedvehicle ", this.selectedvehicle )
      const tyre_position = (document.getElementById('Name1') as HTMLInputElement).value;
  const tyre_pressure = (document.getElementById('mobile_number1') as HTMLInputElement).value;
  const recorded_at = (document.getElementById('companyname1') as HTMLInputElement).value;
  const Depth = (document.getElementById('companyAdd1') as HTMLInputElement).value;
  const Toberun = (document.getElementById('Toberun') as HTMLInputElement).value;
  const fixedDep = (document.getElementById('fixedDep') as HTMLInputElement).value;
  const actualDep = (document.getElementById('ActualDep') as HTMLInputElement).value;
 
      // Update the underlying data array with the new values
  let item = this.selectedcus
  console.log("ïtem",item)
    const submititem = {
     
pressure_id: item.pressure_id,
tyre_position: tyre_position,
tyre_pressure: tyre_pressure,
recorded_at:recorded_at,
Depth:Depth,
actualDep:actualDep,
fixedDep:fixedDep,
Toberun:Toberun
    }

    const url = `https://aktyres-in.stackstaging.com/php-truck/class/employees.php?route=editTyrePressure`;
    this.http.post(url,submititem).subscribe(
      (response) => {
  
     if (response["message"] == "Record updated successfully."){
      this.selectvehicle(this.selectedvehicle)

      const modal = document.getElementById('getModal1');
      if (modal) {
          modal.classList.add('show');
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
     }
  
  
  
      }
    )
    
    }
    
    updateRow(row, item, index) {
      // Update tyre position cell
      row.cells[1].innerHTML = item.tyre_position;
    
      // Update tyre pressure and recorded at cells
      row.cells[2].innerHTML = item.tyre_pressure;
      row.cells[3].innerHTML = item.recorded_at;
    
      // Revert the action cell back to the original "Edit" button
      const actionCell = row.cells[4];
      this.renderer.setProperty(actionCell, 'innerHTML', '');
      const editButton = this.renderer.createElement('button');
      this.renderer.addClass(editButton, 'btn');
      this.renderer.addClass(editButton, 'btn-info');
      this.renderer.appendChild(editButton, this.renderer.createText('Edit'));
      this.renderer.listen(editButton, 'click', () => {
        this.makeEditable(item, index);
      });
      this.renderer.appendChild(actionCell, editButton);
    }
    
    generateTyreOptions(totalTyres, totalAxles, axtyre) {

      console.log("totalAxles",totalAxles)
      console.log("axtyre",axtyre)
      const layout = [];
      for (let axle = 0; axle < totalAxles; axle++) {
        const axleTyres = axtyre[axle].tyre; // Number of tyres on this axle
        for (let side = 0; side < axleTyres; side++) {
          layout.push(
            { position: `${axle + 1}L${side}` }, // Left side
            { position: `${axle + 1}R${side}` }  // Right side
          );
        }
      }
      return layout;
    }
    
    generateTyreOptions1(totalTyres, totalAxles, axtyre) {

      console.log("totalAxles",totalAxles)
      console.log("axtyre",axtyre)
      const layout = [];
      for (let axle = 0; axle < totalAxles; axle++) {
        const axleTyres = axtyre[axle].tyre; // Number of tyres on this axle
        for (let side = 0; side < axleTyres; side++) {
          layout.push(
            { tyre_position: `${axle + 1}L${side}` }, // Left side
            { tyre_position: `${axle + 1}R${side}` }  // Right side
          );
        }
      }
      return layout;
    }
  generateTyreOptions2(totalAxles, axtyre) {
    const layout = [];
  
    // Loop through all axles
    for (let axle = 0; axle < totalAxles; axle++) {
      const axleTyres = axtyre[axle].tyre; // Number of tyres on this axle
      const leftTyres = [];
      const rightTyres = [];
  
      // Loop through each tyre position (Left and Right)
      for (let side = 0; side < axleTyres; side++) {
        leftTyres.push( { tyre_position: `${axle + 1}L${side}` });  // Left side tyres
        rightTyres.push( { tyre_position: `${axle + 1}R${side}` } ); // Right side tyres
      }
  
      // Combine left and right tyres in the required order (L first, then R)
      layout.push(...leftTyres, ...rightTyres);
    }
  
    return layout; // Return the final layout
  }
    
    
    
    
    
          sendProductId(event){}

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
      
        
        
        this.showtable = true
        
        
              }
            )
          }
}
