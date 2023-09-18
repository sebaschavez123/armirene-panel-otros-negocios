import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { BaseService } from "./base.service";
import { environment } from "src/environments/environment";
import { client } from "../core/networking/client.api";

@Injectable({
    providedIn: 'root'
})
export class ClientService {
    private url: string;
    constructor(
        private _baseService: BaseService,
    ) {
        this.url = environment.gateway;
    }

    getClientsByBusiness(businessId): Observable<any> {
        return this._baseService.get(`${this.url}/${client.order}/${client.clients}/${client.business}/${businessId}`).pipe(
            map(res => res['data'])
        )
    }

}