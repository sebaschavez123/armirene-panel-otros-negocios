import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoimagePipe } from './pipes/noimage.pipe';
import { OrderNotificationComponent } from './components/order-notification/order-notification.component';



@NgModule({
  declarations: [
    NoimagePipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NoimagePipe
  ]
})
export class SharedModule { }
