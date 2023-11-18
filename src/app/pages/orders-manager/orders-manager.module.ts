import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { OrdersManagerRoutingModule } from './orders-manager-routing.module';
import { OrdersManagerComponent } from './orders-manager.component';
import { OdersListComponent } from './oders-list/oders-list.component';
import { OrderCardComponent } from './order-card/order-card.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';


@NgModule({
  declarations: [
    OrdersManagerComponent,
    OdersListComponent,
    OrderCardComponent
  ],
  imports: [
    CommonModule,
    OrdersManagerRoutingModule,
    DragDropModule,
    NzIconModule,
    NzDropDownModule,
    NzCheckboxModule ,
    NzFormModule,
    ReactiveFormsModule,
    NzButtonModule 
  ]
})
export class OrdersManagerModule { }
