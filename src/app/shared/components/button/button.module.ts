import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';
import { LoadingModule } from '../loading/loading.module';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [
    ButtonComponent
  ],
  imports: [
    CommonModule,
    LoadingModule,
    NzIconModule
  ],
  exports : [
    ButtonComponent
  ]
})
export class ButtonModule { }
