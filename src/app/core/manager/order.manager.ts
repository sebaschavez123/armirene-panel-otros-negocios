import { Injectable } from "@angular/core";
import { OrderService } from "src/app/services/order.service";
import { Order } from "../models/order.class";
import { BehaviorSubject, Observable, catchError, shareReplay, tap, throwError } from "rxjs";
import { Business } from "../models/business.class";
import { MessagesService } from "src/app/services/messages.service";
import { LoadingService } from "src/app/services/loading.service";
import { BUSINESS_DATA, Storage } from "../storage";

@Injectable({
    providedIn: 'root'
})
export class OrderManager {

    private subject = new BehaviorSubject<any[]>([]);
    order$: Observable<any[]> = this.subject.asObservable();

    constructor(
        private _orderService: OrderService,
        private _messages: MessagesService,
        private _loading: LoadingService
    ) {
        this.getOrderByBusiness(Storage.getAll(BUSINESS_DATA)?.id);
    }


    saveOrder(body: Order) {
        return this._orderService.saveOrder(body).pipe(
            tap(() => this.getOrderByBusiness(Storage.getAll(BUSINESS_DATA).id)),
            shareReplay()
        )
    }

    getOrderByBusiness(businessId: number) {
        const loadOrdersByBusiness$ = this._orderService.getOrdersByBusiness(businessId).pipe(
            catchError(err => {
                let { error: { message } } = err;
                this.subject.next([])
                this._messages.showErrors(message);
                return throwError(() => err);
            }),
            tap(orders => this.subject.next(orders)),
            shareReplay()
        );

        this._loading.showLoaderUntilCompleted(loadOrdersByBusiness$)
            .subscribe();
    }

    returnOrderByBusiness(): Observable<any[]> {
        return this.order$
    }

    cancelOrder(orderId: number) {
        const orders = this.subject.getValue();
        const index = orders.findIndex(order => order.orderId == orderId);
        const newOrder: Order = {
            ...orders[index],
            state: 'CANCELADA'
        };
        const newOrders: Order[] = orders.slice(0);
        newOrders[index] = newOrder;
        this.subject.next(newOrders)
        return this._orderService.cancelOrder(orderId).pipe(
            catchError(err => {
                const message = "Could not cancel order";
                this._messages.showErrors(message);
                return throwError(() => err);
            }),
            shareReplay()
        )
    }

}