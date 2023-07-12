import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { LoadingService } from 'src/app/services/loading.service';

@NgModule({
  declarations: [
    SpinnerComponent
  ],
  imports: [
    CommonModule
  ],
  exports : [
    SpinnerComponent
  ],
  providers : [
    LoadingService
  ]
})
export class LoadingModule { }
