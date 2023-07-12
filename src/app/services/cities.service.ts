import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { environment } from "src/environments/environment";
import { Observable, map } from "rxjs";
import { cities } from "../core/networking/cities.api";

@Injectable({
    providedIn: 'root'
})
export class CitiesServices {
    private url: string;

    constructor(
        private _baseService: BaseService
    ) {
        this.url = environment.gateway;
    }

    getStates(): Observable<any[]> {
        return this._baseService.get(`${this.url}/${cities.states}`).pipe(
            map(res => res['data'])
        )
    }

    getCities(cityId): Observable<any[]> {
        return this._baseService.get(`${this.url}/${cityId}/${cities.cities}`).pipe(
            map(res => res['data'])
        )
    }
}