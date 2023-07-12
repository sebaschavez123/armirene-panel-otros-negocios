import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BranchOfficeCardComponent } from './branch-office-card.component';
import { SharedModule } from '../../shared.module';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [
    BranchOfficeCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NzIconModule
  ],
  exports:[
    BranchOfficeCardComponent
  ]
})
export class BranchOfficeCardModule { }
