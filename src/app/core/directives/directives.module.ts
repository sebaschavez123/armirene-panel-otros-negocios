import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoNumbersDirective } from './no-numbers.directive';



@NgModule({
  declarations: [
    NoNumbersDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NoNumbersDirective
  ]
})
export class DirectivesModule { }
