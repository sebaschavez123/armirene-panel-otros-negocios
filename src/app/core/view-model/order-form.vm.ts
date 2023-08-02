import { Injectable } from "@angular/core";
import { OrderManager } from "../manager/order.manager";
import { Order } from "../models/order.class";
import { BranchOfficeManager } from "../manager/branch-office.manager";
import { filter, repeat, retry, take, tap } from "rxjs";

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

    getOrderMessenger(orderId) {
        return this._orderManager.getOrderMessenger(orderId).pipe(
            tap(res => console.log(res)),
            repeat({
                delay: 5000
            }),
            filter(data => (data.message != 'Messenger no assigned')),
            take(1),
            retry({
                delay: 5000
            }),
        )
    }
}