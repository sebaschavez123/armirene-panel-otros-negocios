import { Injectable } from "@angular/core";
import { BranchOfficeManager } from "../manager/branch-office.manager";
import { BranchOffice } from "../models/branch-office.class";

@Injectable({
    providedIn: 'root'
})
export class BranchOfficeFormVM {

    constructor(
        private _branchOfficeManager: BranchOfficeManager
    ) { }

    saveBranchOffice(data: BranchOffice) {
        return this._branchOfficeManager.saveBranchOfficeByBusiness(data)
    }

    deleteBranchOfficeByBusiness(data) {
        return this._branchOfficeManager.deleteBranchOfficeByBusiness(data)
    }

    updateBranchOffice(data: BranchOffice) {
        return this._branchOfficeManager.updateBranchOffice(data.id, data.businessOwner, data)
    }

}