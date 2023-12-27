import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { OrdersComponent } from './orders.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzFormModule } from 'ng-zorro-antd/form';
import { PhoneModule } from 'src/app/shared/components/phone/phone.module';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { OrderTotalComponent } from './order-total/order-total.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CitiesSelectComponent } from 'src/app/shared/components/cities-select/cities-select.component';
import { OrderMessageComponent } from './order-message/order-message.component';
import { MapComponent } from 'src/app/shared/components/map/map.component';
import { TableModule } from 'src/app/shared/components/table/table.module';
import { AdressAutocompleteComponent } from 'src/app/shared/components/adress-autocomplete/adress-autocomplete.component';
import { DirectivesModule } from 'src/app/core/directives/directives.module';
import { OrderMessengerComponent } from './order-messenger/order-messenger.component';
import { LoadingModule } from 'src/app/shared/components/loading/loading.module';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { ConfirmAddressPopupComponent } from 'src/app/shared/components/confirm-address-popup/confirm-address-popup.component';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

const antdModule = [
  NzFormModule,
  NzInputModule,
  NzSelectModule,
  NzIconModule,
  NzStepsModule,
  NzRadioModule,
  NzAutocompleteModule,
  NzDatePickerModule,
  ConfirmAddressPopupComponent
]

@NgModule({
  declarations: [
    OrdersComponent,
    OrderFormComponent,
    OrderTotalComponent,
    OrderSummaryComponent,
    OrderMessageComponent,
    OrderMessengerComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    ButtonModule,
    ReactiveFormsModule,
    PhoneModule,
    FormsModule,
    MapComponent,
    CitiesSelectComponent,
    AdressAutocompleteComponent,
    TableModule,
    DirectivesModule,
    LoadingModule,
    ...antdModule
  ]
})
export class OrdersModule { }
