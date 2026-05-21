import { Component, OnInit, ChangeDetectorRef, Renderer2 } from '@angular/core';
import DataTable from 'datatables.net-dt';
import config from 'datatables.net-dt';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(private route: ActivatedRoute,private http: HttpClient,private renderer: Renderer2) { }
  data :any;
table:any;
createpro:any;
createrate:any;
createpro1:any;
productone:any;
createrate1:any;
pro: string = '';
rate: string = '';
pro1:string = ''; 
 ngOnInit(): void {
  this.route.queryParams.subscribe(params => {
    // If the 'modal' parameter is set to 'open', open the modal
    if (params.modal === 'open') {
      this.open()
    }
  });
  const url = 'https://aktyres-in.stackstaging.com/php-rest-api/class/employees.php?route=getproduct';
  this.http.get(url).subscribe(
    (response) => {
      // Handle successful response
      
      this.data = response['body'];
      console.log('this.product', this.data);
      this.data.sort((a, b) => b.ProductID - a.ProductID);
      const tableData = this.data.map((item, index) => {
        const button = this.renderer.createElement('button');
        this.renderer.addClass(button, 'btn');
        this.renderer.addClass(button, 'btn-info');
        this.renderer.appendChild(button, this.renderer.createText('Edit'));
        this.renderer.listen(button, 'click', () => {
          this.sendProductId(item.ProductID);
        });

        return [
          index + 1,
          item.Name,
          item.Rate,
          button
        ];
      });

      // Initialize DataTable with transformed data
      this.table =  new DataTable('#myTable', {
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
 create(){
  const filterParams = {
    Name: this.createpro,
    Price: this.createrate
  }
  this.http.post<any>('https://aktyres-in.stackstaging.com/php-rest-api/class/employees.php?route=createproduct', filterParams).subscribe(
      (response) => {
        window.alert("created succesfull")

        this.closeModal('getModal')
        const url = 'https://aktyres-in.stackstaging.com/php-rest-api/class/employees.php?route=getproduct';
        this.http.get(url).subscribe(
          (response) => {
            // Handle successful response
            
            this.data = response['body'];
            console.log('this.product', this.data);
            this.data.sort((a, b) => b.ProductID - a.ProductID);
            const tableData = this.data.map((item, index) => {
              const button = this.renderer.createElement('button');
              this.renderer.addClass(button, 'btn');
              this.renderer.addClass(button, 'btn-info');
              this.renderer.appendChild(button, this.renderer.createText('Edit'));
              this.renderer.listen(button, 'click', () => {
                this.sendProductId(item.ProductID);
              });
      
              return [
                index + 1,
                item.Name,
                item.Rate,
                button
              ];
            });
            this.table.destroy();
            // Initialize DataTable with transformed data
            this.table =  new DataTable('#myTable', {
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
  const modal = document.getElementById('getModal1');
  if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
  }
  const url4 = `https://aktyres-in.stackstaging.com/php-rest-api/class/employees.php?route=getproductone&ProductID=${productId}`;

  this.http.get(url4).subscribe(
    (response) => {
     
      this.productone = response['body'];
      console.log("this.productone",this.productone)

      this.pro = this.productone[0].Name
      this.rate = this.productone[0].Rate
      this.pro1 = this.productone[0].Name
      console.log("this.pro",this.pro)
    
    },
    (error) => {
      // Handle error
      console.error('Error adding customer:', error);
    }
  );

  // Handle sending productId here
  console.log('Product ID:',productId);
  // Add your logic to send productId wherever needed
}

update(){


  const productName = (document.getElementById('productName') as HTMLInputElement).value;
    const rate = (document.getElementById('ratenumber') as HTMLInputElement).value;

    console.log('ProductName:', productName);
    console.log('Rate:', rate);
  const url = 'https://aktyres-in.stackstaging.com/php-rest-api/class/employees.php?route=editproduct';

  const customerdata = {
    
      ProductID: this.productone[0].ProductID,
      Name: productName,
      Rate:rate
  
  }
 
  this.http.post(url, customerdata).subscribe(
    (response) => {
    
      window.alert("Customer edited successfully")
      this.closeModal('getModal1') 
      const url = 'https://aktyres-in.stackstaging.com/php-rest-api/class/employees.php?route=getproduct';
      this.http.get(url).subscribe(
        (response) => {
          // Handle successful response
          
          this.data = response['body'];
          console.log('this.product', this.data);
          this.data.sort((a, b) => b.ProductID - a.ProductID);
          const tableData = this.data.map((item, index) => {
            const button = this.renderer.createElement('button');
            this.renderer.addClass(button, 'btn');
            this.renderer.addClass(button, 'btn-info');
            this.renderer.appendChild(button, this.renderer.createText('Edit'));
            this.renderer.listen(button, 'click', () => {
              this.sendProductId(item.ProductID);
            });
    
            return [
              index + 1,
              item.Name,
              item.Rate,
              button
            ];
          });
          this.table.destroy();
          // Initialize DataTable with transformed data
          this.table =  new DataTable('#myTable', {
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
      // Handle error
      console.error('Error editing customer:', error);
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
