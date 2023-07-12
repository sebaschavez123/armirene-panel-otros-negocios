import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearcherComponent } from './searcher.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ButtonModule } from '../button/button.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SearcherComponent
  ],
  imports: [
    CommonModule,
    NzInputModule,
    NzIconModule,
    ButtonModule,
    FormsModule
  ],
  exports:[
    SearcherComponent
  ]
})
export class SearcherModule { }
