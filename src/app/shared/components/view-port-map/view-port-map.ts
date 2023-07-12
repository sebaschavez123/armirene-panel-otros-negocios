import * as L from 'leaflet';

export class ViewportMap {
    private static instance: ViewportMap;
    private mapL: any;
    private vmap = {
        lat: 4.68234,
        lng: -74.043835,
        zoom: 15,
        dragMarker: true,
    }
    private layerGroup: any;
    private readonly iconMap = L.icon({
        iconUrl: '/assets/svg/new_pin.svg',
        iconSize: [25, 35],
        popupAnchor: [0, -12],
    });
    private addressMarker: any;
    private polygonMap;
    callbackDrop: any;
    private constructor() { }

    public static getInstance(): ViewportMap {
        if (!ViewportMap.instance) {
            ViewportMap.instance = new ViewportMap();
        }
        return ViewportMap.instance;
    }

    init(currentPos) {
        setTimeout(() => {
            this.mapL = L.map('viewport-map', {
                center: [
                    currentPos.lat || this.vmap.lat,
                    currentPos.lng || this.vmap.lng
                ],
                zoom: this.vmap.zoom,
            });
            this.layerGroup = L.layerGroup().addTo(this.mapL);
            const layerCss = L.tileLayer(
                // 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
                'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                {
                    maxZoom: 19,
                    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                },
            );
            layerCss.addTo(this.mapL);

            // this.mapL.scrollWheelZoom.disable();
            this.addMarker({ lat: currentPos.lat, lng: currentPos.lng, zoom: 15, dragMarker: true });
            this.mapL.on('click', (e) => { this.eventClick(e); });
            this.mapL.on('focus', () => { this.mapL.scrollWheelZoom.enable(); });
            this.mapL.on('blur', () => { this.mapL.scrollWheelZoom.disable(); });
        }, 200);
    }

    eventClick(e) {
        this.moveMarker(e.latlng);
        if (this.callbackDrop) { this.callbackDrop(e.latlng) }
    }

    addMarker(marker) {
        this.addressMarker = L.marker([marker.lat, marker.lng], {
            title: 'address',
            icon: this.iconMap,
            draggable: true,
        }).addTo(this.layerGroup);

        if (marker.dragMarker) {
            this.addressMarker.on('dragend', (markerDrag) => {
                const coords = markerDrag.target._latlng;
                if (markerDrag.distance > 300) { this.setView(coords); }
                if (this.callbackDrop) {
                    this.callbackDrop(coords);
                }
            });
        }
    }

    moveMarker({ lat, lng }, zoom = 16) {
        if (!this.addressMarker) { return; }
        const ncords = L.latLng(lat, lng);
        this.addressMarker.setLatLng(ncords);
    }

    setView({ lat, lng }, zoom = 16) {
        this.mapL?.setView({ lat, lng }, zoom);
    }

    invalidateSize(sw = true) { this.invalidateSize(sw); }

    setZoom(zoom) { this.mapL.setZoom(zoom); }

    panTo({ lat, lng }) { this.mapL.setZoomAround({ lat, lng }); }

    setZoomAround(pos, zoom: number) {
        this.mapL.flyToBounds(pos, zoom);
    }

    addPolygon(coordinates, options = {}) {
        const params = { color: '#3cd898', weight: 4, opacity: 0.5, fill: false, ...options };
        return new Promise((resolve) => {
            if (coordinates.length > 0) {
                const polygonMap = L.polygon(coordinates, params);
                setTimeout(() => {
                    polygonMap.addTo(this.mapL);
                    // this.mapL.fitBounds(polygonMap.getBounds());
                    return resolve(null);
                }, 1500);
            };
        })
    }

}