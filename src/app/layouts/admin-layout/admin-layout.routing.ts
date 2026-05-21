import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { CustomerComponent } from '../../customer/customer.component';
import {DeleteComponent} from  '../../delete/delete.component';
import { ProductComponent } from '../../product/product.component';
import{DriverComponent} from '../../driver/driver.component';
import {TruckComponent} from '../../truck/truck.component';
import {DriverpageComponent} from '../../driverpage/driverpage.component';
import {UploadfilesComponent} from '../../uploadfiles/uploadfiles.component';
import {TyrepressureComponent} from '../../tyrepressure/tyrepressure.component'
import{CustomerframeComponent} from '../../customerframe/customerframe.component'
export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'dashboard',      component: DashboardComponent },
    {path:'customerframe',    component:CustomerframeComponent},    
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'customer',        component: CustomerComponent },
    { path: 'product',        component: ProductComponent },
    { path: 'Delete',        component: DeleteComponent },
    {path:'Driver', component:DriverComponent},
    {path:'Truck', component:TruckComponent},
    {path:'DriverPage', component:DriverpageComponent},
    {path:'TyreEntry', component:TyrepressureComponent},
    {path:'AlloyResult',component:UploadfilesComponent}
];
