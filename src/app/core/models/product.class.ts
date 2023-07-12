export class Product {
    product_id: number;
    name: string;
    description: string;
    quantity: number;
    image_url: string;
    unit_price: number;
    store_id: number;
    constructor() {
        this.product_id = 0;
        this.name = '';
        this.description = '';
        this.quantity = 0;
        this.image_url = '';
        this.store_id = 0;
    }
}