import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { OrderStates } from "../models/order-states.class";

@Injectable()
export class BaseFormOrderStatesService {
    public baseForm: FormGroup;
    constructor(private fb: FormBuilder) {
        this.baseForm = this.fb.group({
            received: [false],
            issued: [false],
            sent: [false],
            assigned: [false],
            picking: [false],
            invoiced: [false],
            delivered: [false],
            complete: [false],
            canceled: [false],
            returned: [false],
            successfulReturn: [false],
        });
    }

    public pathFormData(orderStates: OrderStates): void {
        this.baseForm.patchValue({
            ...orderStates
        });
    }

    resetForm() {
        this.baseForm.reset();
    }

}