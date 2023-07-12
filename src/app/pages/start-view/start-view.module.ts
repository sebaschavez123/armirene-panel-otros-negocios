import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartViewRoutingModule } from './start-view-routing.module';
import { BranchOfficeCardModule } from 'src/app/shared/components/branch-office-card/branch-office-card.module';
import { StartViewComponent } from './start-view.component';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { BranchOfficeFormComponent } from '../../shared/components/branch-office-form/branch-office-form.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { MessagesComponent } from 'src/app/shared/components/messages/messages.component';
import { MessagesService } from 'src/app/services/messages.service';

const antdModule = [
  NzModalModule
]

@NgModule({
  declarations: [
    StartViewComponent,
  ],
  imports: [
    CommonModule,
    BranchOfficeFormComponent,
    StartViewRoutingModule,
    BranchOfficeCardModule,
    ButtonModule,
    MessagesComponent,
    ...antdModule
  ]
})
export class StartViewModule { }
