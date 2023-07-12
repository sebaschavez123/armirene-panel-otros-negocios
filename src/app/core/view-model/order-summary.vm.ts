import { Injectable } from "@angular/core";
import { BranchOfficeManager } from "../manager/branch-office.manager";

@Injectable({
    providedIn: 'root'
})
export class OrderSummaryVm {

    constructor(
        private _branchOfficeManager: BranchOfficeManager
    ) { }

    returnBranchOfficeByBusiness() {
        return this._branchOfficeManager.returnBranchOfficeByBusiness()
    }
}