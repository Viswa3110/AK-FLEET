import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DriverComponent } from './driver/driver.component';
import { TruckComponent } from './truck/truck.component';
import { UploadfilesComponent } from './uploadfiles/uploadfiles.component';
import { CustomerframeComponent } from './customerframe/customerframe.component';







@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
 
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    DriverComponent,
    TruckComponent,
    UploadfilesComponent,
    CustomerframeComponent
   

    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
