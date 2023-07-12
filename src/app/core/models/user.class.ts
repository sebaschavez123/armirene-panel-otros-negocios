export class User {
    id: number;
    name: string;
    lastName: string;
    phone: string;
    email: string;
    businessId: Array<string>
    constructor() {
        this.name = '';
        this.lastName = '';
        this.phone = '';
        this.email = '';
        this.businessId = [];
    }
}
