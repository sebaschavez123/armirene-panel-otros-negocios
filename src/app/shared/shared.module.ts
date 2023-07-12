import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoimagePipe } from './pipes/noimage.pipe';



@NgModule({
  declarations: [
    NoimagePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NoimagePipe
  ]
})
export class SharedModule { }
