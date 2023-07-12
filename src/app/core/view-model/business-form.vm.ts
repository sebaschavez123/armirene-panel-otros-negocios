import { Injectable } from "@angular/core";
import { BusinessManager } from "../manager/business.manager";
import { Business } from "../models/business.class";
import { OrderManager } from "../manager/order.manager";
import { BranchOfficeManager } from "../manager/branch-office.manager";

@Injectable({
    providedIn: 'root'
})
export class BusinessFormVm {

    constructor(
        private _businessManager: BusinessManager,
        private _orderManager: OrderManager,
        private _branchOfficeManager: BranchOfficeManager
    ) { }

    saveBusiness(data: Business) {
        return this._businessManager.saveBusiness(data)
    }

    selectBusiness(business: Business) {
        this._businessManager.selectBusiness(business)
    }

    updateBusiness(data: Business) {
        return this._businessManager.updateBusiness(data.id, data)
    }

    getBusinessById(businessId: number) {
        return this._businessManager.getBusinessById(businessId)
    }

    getBranchOfficeByBusiness(businessId: number) {
        return this._branchOfficeManager.getBranchOfficeByBusiness(businessId)
    }

    getOrdersByBusiness(businessId: number) {
        return this._orderManager.getOrderByBusiness(businessId)
    }
}