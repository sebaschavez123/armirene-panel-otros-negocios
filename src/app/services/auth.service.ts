import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { authentication } from "../core/networking/authentication.api";
import { BaseService } from "./base.service";
import { AuthResponse } from "../core/models/auth-response.class";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private url: string;
    constructor(
        private _baseService: BaseService,
        private _http: HttpClient
    ) {
        this.url = environment.gateway;
    }

    login(data): Observable<AuthResponse> {
        return this._http.post<AuthResponse>(`${this.url}/${authentication.auth}/${authentication.authenticate}`, data)
    }

    getInfo(username: string): Observable<AuthResponse> {
        return this._baseService.get(`${this.url}/${authentication.auth}/${authentication.info}/${username}`)
    }

    register(data): Observable<AuthResponse> {
        return this._http.post<AuthResponse>(`${this.url}/${authentication.user}/${authentication.create}`, data, this.httpOptions())
    }

    protected httpOptions(): { headers: HttpHeaders } {
        const data = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'COUNTRY': environment.indicator
        };
        return { headers: new HttpHeaders(data) };
    }
}