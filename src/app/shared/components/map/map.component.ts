import { Component, OnDestroy, OnInit, Output, EventEmitter, Input, AfterViewInit } from '@angular/core';
import { selectDataMapInterface } from '../../interfaces/select-data-map.type';
import { ViewportMap } from '../view-port-map/view-port-map';
import { fromFetch } from 'rxjs/fetch';
import { Subscription, from, switchMap } from 'rxjs';
import { AppState } from 'src/app/ngrx/reducers/app.reducer';
import { Store, select } from '@ngrx/store';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';
import { saveLatLng } from 'src/app/ngrx/actions/map.actions';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  standalone: true,
  imports: [NzIconModule, CommonModule],
})
export class MapComponent implements OnInit, OnDestroy {
  @Output() sendLatLng = new EventEmitter<any>();
  map = ViewportMap.getInstance();
  @Input() selectedData: selectDataMapInterface;
  onGPS = false;
  mapSubscription: Subscription;
  @Input() customClasses: string;
  showMapStoreElement$ = this._store.pipe(select('map')); // Asegúrate de tener el nombre correcto del slice en tu estado
  constructor(private _store: Store<AppState>) { }
  ngOnInit() {
    this.setLatLng();
  }

  setLatLng() {
    this.mapSubscription = this.showMapStoreElement$.subscribe(res => {
      let { latLng: { lat, lng } } = res;
      if (lat) {
        this.selectedData.lat = lat;
        this.selectedData.lng = lng;
        this.map?.setView({ lat, lng }, 12);
        this.resolveCoordinatesToAddress({ lat, lng });
        this.map.moveMarker({ lat, lng }, 15)

      }
    })
    this.map.callbackDrop = (data) => {
      this.selectedData.lat = data?.lat;
      this.selectedData.lng = data?.lng;
      let latLng = { data }
      this._store.dispatch(saveLatLng({ latLng }));
      this.resolveCoordinatesToAddress(this.selectedData);
    }
    setTimeout(() => { this.getCurrentLocation(); }, 5);
    if (this.selectedData.lat > 0) {
      this.map.init({ lat: this.selectedData.lat, lng: this.selectedData.lng })
    }
  }

  getCurrentLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      if (this.selectedData.lat == 0) {
        this.onGPS = true;
        this.selectedData = { ...this.selectedData, lat: position.coords.latitude, lng: position.coords.longitude }
        this.map.init({ lat: position.coords.latitude, lng: position.coords.longitude })
        this.selectedData.lat = position.coords.latitude;
        this.selectedData.lng = position.coords.longitude;
        // this.setPositionMarker();
        this.resolveCoordinatesToAddress(this.selectedData);
      }
    });
  }

  resolveCoordinatesToAddress({ lat, lng }) {
    let urlInver = 'https://nominatim.openstreetmap.org/reverse?format=jsonv2&addressdetails=0&zoom=40';
    urlInver += `&lat=${lat}&lon=${lng}`;
    fromFetch(urlInver)
      .pipe(switchMap((r: any) => from(r.json())))
      .subscribe((json) => {
        console.log(json)
        let coordinates = {
          lat: Number(JSON.parse(JSON.stringify(json)).lat),
          lng: Number(JSON.parse(JSON.stringify(json)).lon)
        }
        // this.getAddress(coordinates)
        let latLng = { ...coordinates }
        this.sendLatLng.emit(coordinates);
      }, (error) => {
        console.log(error);
      });
  }

  getAddress(coordinates) {
    let url = `http://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates.lat},${coordinates.lng}&sensor=true&key=AIzaSyD4jPeNYRX_bOi_ECG32OH3U6v9ePnZUdQ`
    fromFetch(url)
      .pipe(switchMap((r: any) => from(r.json())))
      .subscribe(res => console.log(res))
  }

  ngOnDestroy() {
    this.onGPS = false;
    this.mapSubscription.unsubscribe();
  }
}
