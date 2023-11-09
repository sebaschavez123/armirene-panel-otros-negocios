import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoNumbersDirective } from './no-numbers.directive';
import { PositivesNumberDirective } from './positives-number.directive';



@NgModule({
  declarations: [
    NoNumbersDirective,
    PositivesNumberDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NoNumbersDirective,
    PositivesNumberDirective
  ]
})
export class DirectivesModule { }
