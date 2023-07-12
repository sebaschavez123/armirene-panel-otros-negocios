export class Client {
    address: string;
    city: string;
    email: string;
    first_name: string;
    last_name: string;
    lat: number;
    lng: number
    phone: string;
    state: string;
    dni: string;
    constructor() {
        this.address = '';
        this.city = '';
        this.email = ''
        this.first_name = '';
        this.last_name = '';
        this.lat = 0;
        this.lng = 0;
        this.phone = '';
        this.state = '';
        this.dni = '';
    }
}