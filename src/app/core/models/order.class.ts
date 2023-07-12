import { FormGroup } from "@angular/forms";
import { BUSINESS_DATA, Storage } from "../storage";
import { Client } from "./client.class";
import { environment } from "src/environments/environment";

export class Order {
    orderId: number;
    business_id: number;
    business_order_id: number;
    total_value: number;
    user_tip: number;
    incentive_value: number;
    delivery_value: number;
    vehicle_type: number;
    payment_method: number;
    city: string;
    instructions: string;
    products: Array<any>;
    client_info: Client;
    country: string;
    token: number;
    state: string;
    storeId: number
    constructor() {
        this.orderId = 0;
        this.business_id = Storage.getAll(BUSINESS_DATA).id;
        this.business_order_id = 0;
        this.total_value = 0;
        this.user_tip = 0;
        this.incentive_value = 0;
        this.delivery_value = 0;
        this.vehicle_type = 0;
        this.payment_method = 0;
        this.city = "";
        this.instructions = "";
        this.products = [{
            product_id: 0,
            name: 'demo product',
            description: 'producto demo creado para la prueba de otros negocios',
            quantity: 0,
            image_url: null,
            unit_price: 0,
            store_id: null
        }];
        this.client_info = {
            city: '',
            email: '',
            address: '',
            first_name: '',
            last_name: '',
            lat: 0,
            lng: 0,
            phone: '',
            state: '',
            dni: ''
        };
        this.country = environment.indicator;
        this.token = 0;
        this.storeId = 0;
    }
}