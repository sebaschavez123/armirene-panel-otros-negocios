export class OrderStates {
    addressDetail: boolean;
    indications: boolean;
    received: boolean;
    issued: boolean;
    sent: boolean;
    assigned: boolean;
    picking: boolean;
    invoiced: boolean;
    delivered: boolean;
    complete: boolean;
    canceled: boolean;
    returned: boolean;
    successfulReturn: boolean;
    constructor() {
        this.addressDetail = false;
        this.indications = false;
        this.received = false;
        this.issued = false;
        this.sent = false;
        this.assigned = false;
        this.picking = false;
        this.invoiced = false;
        this.delivered = false;
        this.complete = false;
        this.canceled = false;
        this.returned = false;
        this.successfulReturn = false;
    }
}