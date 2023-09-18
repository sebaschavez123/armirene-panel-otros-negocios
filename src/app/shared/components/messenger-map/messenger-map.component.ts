import { Component } from '@angular/core';
import * as L from 'leaflet';

interface MapItem {
  lat: number;
  lng: number;
  title: string;
}
@Component({
  selector: 'app-messenger-map',
  templateUrl: './messenger-map.component.html',
  styleUrls: ['./messenger-map.component.scss'],
  standalone: true
})
export class MessengerMapComponent {
  private map: any;

  mapItems: MapItem[] = [
    { lat: 40.7128, lng: -74.0060, title: 'Nueva York' },
    { lat: 34.0522, lng: -118.2437, title: 'Los Ángeles' },
    // Agrega más elementos de ejemplo aquí
  ];

  constructor() { }

  ngOnInit(): void {
    this.initializeMap();
    this.addMarkers();
  }

  private initializeMap(): void {
    this.map = L.map('map').setView([this.mapItems[0].lat, this.mapItems[0].lng], 4);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);
  }

  private addMarkers(): void {
    this.mapItems.forEach(item => {
      L.marker([item.lat, item.lng]).addTo(this.map).bindPopup(item.title);
    });
  }
}
