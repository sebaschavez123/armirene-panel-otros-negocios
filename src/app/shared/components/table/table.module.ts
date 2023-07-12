import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

@NgModule({
  declarations: [
    TableComponent
  ],
  imports: [
    CommonModule,
    NzTableModule,
    NzIconModule,
    NzToolTipModule
  ],
  exports:[
    TableComponent
  ]
})
export class TableModule { }
