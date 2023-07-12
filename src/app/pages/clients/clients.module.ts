import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { SearcherModule } from 'src/app/shared/components/searcher/searcher.module';
import { ClientsComponent } from './clients.component';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { TableModule } from 'src/app/shared/components/table/table.module';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ClientFormComponent } from './client-form/client-form.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { PhoneModule } from 'src/app/shared/components/phone/phone.module';

const antdModule = [
  NzFormModule,
  NzInputModule,
  NzSelectModule,
  NzModalModule
]
@NgModule({
  declarations: [ClientsComponent, ClientFormComponent],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    SearcherModule,
    ButtonModule,
    TableModule,
    NzModalModule,
    PhoneModule,
    ...antdModule
  ]
})
export class ClientsModule { }
