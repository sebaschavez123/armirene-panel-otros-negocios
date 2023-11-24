import { Injectable } from "@angular/core";
import { BusinessManager } from "../manager/business.manager";
import { BranchOfficeManager } from "../manager/branch-office.manager";
import { OrderManager } from "../manager/order.manager";
import { Business } from "../models/business.class";
import { ClientManager } from "../manager/client.manager";
import { ChangeBusinessEvent } from "../events/change-business.event";

@Injectable({
    providedIn: 'root'
})
export class BusinessCardVm {

    constructor(
        private _businessManager: BusinessManager,
        private _orderManager: OrderManager,
        private _branchOfficeManager: BranchOfficeManager,
        private _clientManager: ClientManager,
        private _changeBusinessEvent: ChangeBusinessEvent
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

    getClientsByBusiness(businessId: number) {
        return this._clientManager.getClientsByBusiness(businessId)
    }

    selectBusiness(business: Business) {
        this._changeBusinessEvent.selectBusiness(business)
    }
}