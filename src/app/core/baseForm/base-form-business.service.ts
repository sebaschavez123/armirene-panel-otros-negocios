import { Injectable } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Business } from "../models/business.class";
import { BranchOffice } from "../models/branch-office.class";
import { USER_DATA, Storage } from "../storage";

@Injectable()
export class BaseFormBusinessService {
    public baseForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.baseForm = this.fb.group({
            id: [],
            name: [null, Validators.required],
            type: [null, Validators.required],
            ownerId: [Storage.getOne(USER_DATA).id],
            deliveryPerWeek: [null, Validators.required],
            branchOfficeList: this.fb.array([]),
        });
    }

    public pathFormData(business: Business): void {
        this.baseForm.patchValue({
            ...business
        });
    }

    resetForm() {
        this.baseForm.reset();
    }

    get branchOfficeList(): FormArray {
        return this.baseForm.get('branchOfficeList') as FormArray;
    }

    getBranchOfficeFormGroup(branchOffice: BranchOffice): FormGroup {
        let form = this.fb.group({
            ...branchOffice
        });
        return this.setValidators(branchOffice, form)
    }

    setValidators(branchOffice: BranchOffice, form: FormGroup) {
        Object.keys(branchOffice).forEach(key => {
            if (key != 'image' && key != 'addressIndications') {
                form.get(key)?.setValidators(Validators.required)
            }
        })
        form.updateValueAndValidity();
        return form
    }

    addBranchOffice() {
        const branchOfficeGroup = this.getBranchOfficeFormGroup(new BranchOffice);
        this.branchOfficeList.push(this.getBranchOfficeFormGroup(new BranchOffice));
        this.baseForm.markAsDirty();
        return branchOfficeGroup;
    }
}