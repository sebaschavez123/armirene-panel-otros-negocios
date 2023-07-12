import { Injectable } from "@angular/core";
import { Order } from "../core/models/order.class";
import { Observable, map } from "rxjs";
import { BaseService } from "./base.service";
import { environment } from "src/environments/environment";
import { order } from "../core/networking/order.api";

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private url: string;
    constructor(
        private _baseService: BaseService,
    ) {
        this.url = environment.gateway;
    }

    saveOrder(data: Order): Observable<any> {
        return this._baseService.post(`${this.url}/${order.order}/${order.create}`, data)
    }

    getOrdersByBusiness(businessId): Observable<any> {
        return this._baseService.get(`${this.url}/${order.order}/${order.all}/${businessId}`).pipe(
            map(res => res['data'])
        )
    }

    cancelOrder(orderId: number): Observable<any> {
        return this._baseService.get(`${this.url}/${order.order}/${order.cancel}/${orderId}`)
    }

}