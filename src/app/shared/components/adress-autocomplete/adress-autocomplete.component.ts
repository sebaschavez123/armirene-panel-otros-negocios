import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { Subscription } from 'rxjs';
import { saveLatLng, saveWarningAddress } from 'src/app/ngrx/actions/map.actions';
import { AppState } from 'src/app/ngrx/reducers/app.reducer';
import { environment } from 'src/environments/environment';
import { NgxGpAutocompleteModule } from '@angular-magic/ngx-gp-autocomplete';
@Component({
  selector: 'app-adress-autocomplete',
  templateUrl: './adress-autocomplete.component.html',
  styleUrls: ['./adress-autocomplete.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NgxGpAutocompleteModule

  ]
})
export class AdressAutocompleteComponent implements OnDestroy, OnInit {
  center;
  defaultBounds;
  options;
  formattedAddress;
  @Input() parentForm: any;
  closeAddressAutocomplete: Subscription;
  warningAddress: boolean
  constructor(private _store: Store<AppState>) {
    this.closeAddressAutocomplete = this._store.select('map').subscribe(res => {
      let { latLng: { lat, lng }, warningAddress } = res;
      this.warningAddress = warningAddress;
      this.center = { lat, lng };
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

  ngOnInit(): void {
    if (!this.parentForm.get('address').value && this.warningAddress) {
      this._store.dispatch(saveWarningAddress({ warningAddress: false }))
    }
  }

  public handleAddressChange(address: any) {
    this.parentForm.get('address').setValue(address.formatted_address)
    var latLng = { lat: address.geometry.location.lat(), lng: address.geometry.location.lng() };
    this._store.dispatch(saveLatLng({ latLng }));
    this._store.dispatch(saveWarningAddress({ warningAddress: false }))
  }

  changeDir(e) {
    this._store.dispatch(saveWarningAddress({ warningAddress: true }))
  }

  ngOnDestroy() {
    this.closeAddressAutocomplete.unsubscribe();
  }
}
