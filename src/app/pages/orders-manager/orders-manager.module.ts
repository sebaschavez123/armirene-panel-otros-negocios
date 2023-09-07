import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { OrdersManagerRoutingModule } from './orders-manager-routing.module';
import { OrdersManagerComponent } from './orders-manager.component';
import { OdersListComponent } from './oders-list/oders-list.component';
import { OrderCardComponent } from './order-card/order-card.component';


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
  ]
})
export class OrdersManagerModule { }
