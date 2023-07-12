import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { environment } from "src/environments/environment";
import { Observable, map } from "rxjs";
import { AuthResponse } from "../core/models/auth-response.class";
import { business } from "../core/networking/business.api";
import { Business } from "../core/models/business.class";

@Injectable({
    providedIn: 'root'
})
export class BusinessService {

    private url: string;
    constructor(
        private _baseService: BaseService,
    ) {
        this.url = environment.gateway;
    }

    getBusinessList(userId): Observable<Business[]> {
        return this._baseService.get(`${this.url}/${business.business}/${business.all}/${userId}`).pipe(
            map(res => res['data'])
        )
    }

    getBusinessById(businessId): Observable<Business> {
        return this._baseService.get(`${this.url}/${business.business}/${businessId}`).pipe(
            map(res => res['data'])
        )
    }

    saveBusiness(body: Business): Observable<Business> {
        return this._baseService.post(`${this.url}/${business.business}/${business.create}`, body).pipe(
            map(res => res['data'])
        )
    }

    updateBusiness(businessId: number, changes: Partial<Business>): Observable<any> {
        return this._baseService.post(`${this.url}/${business.business}/${business.update}/${businessId}`, changes).pipe(
            map(res => res['data'])
        )
    }

    deleteBusiness(businessId) {
        return this._baseService.delete(`${this.url}/${business.business}/${businessId}`)
    }
}