import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhoneComponent } from './phone.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ReactiveFormsModule } from '@angular/forms';

const MODULES = [
  ReactiveFormsModule,
  NzFormModule,
  NzInputModule,
  NzSelectModule,
  CommonModule,
]

@NgModule({
  declarations: [
    PhoneComponent
  ],
  imports: [
    ...MODULES
  ],
  exports: [
    PhoneComponent
  ]
})
export class PhoneModule { }
