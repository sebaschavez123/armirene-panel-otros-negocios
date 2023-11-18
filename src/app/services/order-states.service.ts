import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "./base.service";
import { Observable, map } from "rxjs";
import { OrderStates } from "../core/models/order-states.class";
import { orderStates } from "../core/networking/order-states.api";

@Injectable({
    providedIn: 'root'
})
export class OrderStatesService {

    private url: string;

    constructor(
        private _baseService: BaseService
    ) {
        this.url = environment.gateway;
    }

    getBranchOfficeByBusiness(states: OrderStates): Observable<OrderStates> {
        return this._baseService.post(`${this.url}/${orderStates.config}/${orderStates.update}/${states}`, states).pipe(
            map(res => res['data'])
        )
    }

    getOrderStates(): Observable<OrderStates> {
        return this._baseService.get(`${this.url}/${orderStates.config}`).pipe(
            map(res => res['data'])
        )
    }

}