import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhoneComponent } from './phone.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from 'src/app/core/directives/directives.module';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';

const MODULES = [
  ReactiveFormsModule,
  NzFormModule,
  NzInputModule,
  NzSelectModule,
  CommonModule,
  DirectivesModule,
  NzAutocompleteModule
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
