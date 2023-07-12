import { Injectable } from "@angular/core";
import { OrderManager } from "../manager/order.manager";
import { Order } from "../models/order.class";
import { BranchOfficeManager } from "../manager/branch-office.manager";

@Injectable({
    providedIn: 'root'
})
export class OrderFormVm {

    constructor(
        private _orderManager: OrderManager,
        private _branchOfficeManager: BranchOfficeManager) { }

    saveOrder(data: Order) {
        return this._orderManager.saveOrder(data)
    }

    returnBranchOfficeByBusiness() {
        return this._branchOfficeManager.returnBranchOfficeByBusiness()
    }
}