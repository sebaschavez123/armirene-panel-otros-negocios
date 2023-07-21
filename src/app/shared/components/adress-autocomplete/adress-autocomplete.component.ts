import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { Subscription } from 'rxjs';
import { saveLatLng } from 'src/app/ngrx/actions/map.actions';
import { AppState } from 'src/app/ngrx/reducers/app.reducer';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-adress-autocomplete',
  templateUrl: './adress-autocomplete.component.html',
  styleUrls: ['./adress-autocomplete.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    GooglePlaceModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule
  ]
})
export class AdressAutocompleteComponent implements OnDestroy {
  center;
  defaultBounds;
  options;
  formattedAddress;
  @Input() parentForm: any;
  closeAddressAutocomplete: Subscription;

  constructor(private _store: Store<AppState>) {
    this.closeAddressAutocomplete = this._store.select('map').subscribe(res => {
      console.log(res, "res")
      let { latLng, latLng: { lat, lng } } = res;
      this.center = { lat, lng };
      console.log(this.center, "center")
      this.defaultBounds = {
        north: this.center.lat + 1,
        south: this.center.lat - 1,
        east: this.center.lng + 1,
        west: this.center.lng - 1,
      }
      this.options = {
        componentRestrictions: {
          country: [environment.indicator],
        },
        bounds: this.defaultBounds,
        types: ['geocode'],
      }
      console.log(this.options)
    })
  }

  public handleAddressChange(address: any) {
    this.parentForm.get('address').setValue(address.formatted_address)
    var latLng = { lat: address.geometry.location.lat(), lng: address.geometry.location.lng() };
    this._store.dispatch(saveLatLng({ latLng }))
  }

  ngOnDestroy() {
    this.closeAddressAutocomplete.unsubscribe();
  }
}
