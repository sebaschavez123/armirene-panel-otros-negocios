import { Injectable } from "@angular/core";
import { BranchOfficeManager } from "../manager/branch-office.manager";
import { BusinessManager } from "../manager/business.manager";
import { Business } from "../models/business.class";
import { ChangeBusinessEvent } from "../events/change-business.event";

@Injectable({
    providedIn: 'root'
})
export class BusinessVm {

    constructor(
        private _businessManager: BusinessManager,
        private _changeBusinessEvent: ChangeBusinessEvent
    ) {
    }

    returnBusiness() {
        return this._businessManager.returnBusiness()
    }

    selectBusiness(business: Business) {
        this._changeBusinessEvent.selectBusiness(business)
    }

}