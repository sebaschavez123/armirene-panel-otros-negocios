import { Injectable } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, FormGroupDirective, Validators } from "@angular/forms";
import { Order } from "../models/order.class";
import { BUSINESS_DATA, Storage } from "../storage";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class BaseFormOrderService {
    public baseForm: FormGroup;
    private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    constructor(private fb: FormBuilder) { }

    public pathFormData(order: Order): FormGroup {
        let form = this.fb.group({
            ...order,
            client_info: this.fb.group({
                ...order.client_info
            })
        });
        this.setValidators(order.client_info, form.get('client_info') as FormGroup)
        return this.setValidators(order, form)
    }

    setValidators(order: any, form: FormGroup) {
        
        Object.keys(order).forEach(key => {

            form.get(key)?.setValidators(Validators.required);

            if (key == 'email') {
                form.get(key)?.setValidators([Validators.pattern(this.emailPattern), Validators.required]);
            }

            if (key == 'vehicle_type' || key == 'storeId' || key == 'payment_method') {
                form.get(key)?.setValidators(Validators.min(1));
            }
        })
        form.updateValueAndValidity();
        return form
    }

    resetForm() {
        this.baseForm.reset();
    }

    get products(): FormArray {
        return this.baseForm.get('products') as FormArray;
    }

    //esto pasarlo a productos

    //     getBranchOfficeFormGroup(branchOffice: BranchOffice): FormGroup {
    //         return this.fb.group({
    //             ...branchOffice
    //         });
    //     }

    //     addBranchOffice() {
    //         const branchOfficeGroup = this.getBranchOfficeFormGroup(new BranchOffice);
    //         this.products.push(this.getBranchOfficeFormGroup(new BranchOffice));
    //         this.baseForm.markAsDirty();
    //         return branchOfficeGroup;
    //     }
    // 
}