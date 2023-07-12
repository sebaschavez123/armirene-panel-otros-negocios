import { Injectable } from "@angular/core";
import { BusinessManager } from "../manager/business.manager";
import { BranchOfficeManager } from "../manager/branch-office.manager";
import { OrderManager } from "../manager/order.manager";
import { Business } from "../models/business.class";

@Injectable({
    providedIn: 'root'
})
export class BusinessCardVm {

    constructor(
        private _businessManager: BusinessManager,
        private _orderManager: OrderManager,
        private _branchOfficeManager: BranchOfficeManager
    ) {
    }

    deleteBusiness(businessId: number) {
        return this._businessManager.deleteBusiness(businessId)
    }

    getBranchOfficeByBusiness(businessId: number) {
        return this._branchOfficeManager.getBranchOfficeByBusiness(businessId)
    }

    getOrdersByBusiness(businessId: number) {
        return this._orderManager.getOrderByBusiness(businessId)
    }

    selectBusiness(business: Business) {
        this._businessManager.selectBusiness(business)
    }
}