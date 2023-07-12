export class AuthResponse {
    data: any;
    message: string;
    status: string;
    constructor() {
        this.data = {};
        this.message = ''
        this.status = '';
    }
}
