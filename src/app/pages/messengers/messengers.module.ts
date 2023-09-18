import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessengersRoutingModule } from './messengers-routing.module';
import { MessengersComponent } from './messengers.component';
import { MessengerMapComponent } from 'src/app/shared/components/messenger-map/messenger-map.component';
import { CitiesSelectComponent } from 'src/app/shared/components/cities-select/cities-select.component';
import { MapComponent } from 'src/app/shared/components/map/map.component';


@NgModule({
  declarations: [
    MessengersComponent
  ],
  imports: [
    CommonModule,
    MessengersRoutingModule,
    CitiesSelectComponent,
    MapComponent
  ]
})
export class MessengersModule { }
