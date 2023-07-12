import { Injectable } from "@angular/core";
import { BranchOfficeManager } from "../manager/branch-office.manager";

@Injectable({
    providedIn: 'root'
})
export class StartViewVm {

    constructor(
        private _branchOfficeManager: BranchOfficeManager
    ) {
    }

    returnBranchOfficeByBusiness() {
        return this._branchOfficeManager.returnBranchOfficeByBusiness()
    }

}