import { Injectable } from "@angular/core";
import { OrderManager } from "../manager/order.manager";
import { Order } from "../models/order.class";
import { BranchOfficeManager } from "../manager/branch-office.manager";
import { filter, repeat, retry, take, tap } from "rxjs";
import { ClientManager } from "../manager/client.manager";
import { Storage, BUSINESS_DATA } from "../storage";

@Injectable({
    providedIn: 'root'
})
export class OrderFormVm {

    constructor(
        private _clientManager: ClientManager,
        private _orderManager: OrderManager,
        private _branchOfficeManager: BranchOfficeManager) { }

    saveOrder(data: Order) {
        return this._orderManager.saveOrder(data).pipe(
            tap(() => this._clientManager.getClientsByBusiness(Storage.getAll(BUSINESS_DATA)?.id))
        )
    }

    returnBranchOfficeByBusiness() {
        return this._branchOfficeManager.returnBranchOfficeByBusiness()
    }

    returnClientsByBusiness() {
        return this._clientManager.returnClientsByBusiness()
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