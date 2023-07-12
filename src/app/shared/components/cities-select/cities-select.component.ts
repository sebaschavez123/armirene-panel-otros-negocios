import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';
import { STATES, Storage } from 'src/app/core/storage';
import { CitiesSelectVM } from 'src/app/core/view-model/cities-select.vm';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/ngrx/reducers/app.reducer';
import { saveLatLng } from 'src/app/ngrx/actions/map.actions';
const MODULES = [
  ReactiveFormsModule,
  NzFormModule,
  NzInputModule,
  NzSelectModule,
  CommonModule,
]
@Component({
  selector: 'app-cities-select',
  templateUrl: './cities-select.component.html',
  styleUrls: ['./cities-select.component.scss'],
  standalone: true,
  imports: [...MODULES]
})
export class CitiesSelectComponent implements OnInit {
  @Input() parentForm: any;
  @Input() ifDisable: boolean = false;
  states = Storage.getAll(STATES);
  public cities = new Array;

  constructor(
    private _vm: CitiesSelectVM,
    private _store: Store<AppState>
  ) { }

  ngOnInit() {
    this.uploadCities();
  }

  uploadCities() {
    let state = this.parentForm.controls['state'].value;
    if (state) {
      this.changeState(this.parentForm.controls['state'].value)
    }
  }

  changeState(stateName: string) {
    let stateId = this.states.filter(state =>
      state.name == stateName
    )[0]?.id;
    this._vm.getCities(stateId).subscribe(cities => this.cities = cities);
  }

  changeMunicipality(cityName) {
    let city = this.cities.filter(city =>
      city.name == cityName
    )[0]
    let { lat, lng } = city
    let latLng = { lat, lng };
    this._store.dispatch(saveLatLng({ latLng }))
  }
}
