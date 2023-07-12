import { Injectable } from "@angular/core";
import { BranchOfficeManager } from "../manager/branch-office.manager";
import { BusinessManager } from "../manager/business.manager";
import { Business } from "../models/business.class";

@Injectable({
    providedIn: 'root'
})
export class BusinessVm {

    constructor(
        private _businessManager: BusinessManager
    ) {
    }

    returnBusiness() {
        return this._businessManager.returnBusiness()
    }

    selectBusiness(business: Business) {
        this._businessManager.selectBusiness(business)
    }

}