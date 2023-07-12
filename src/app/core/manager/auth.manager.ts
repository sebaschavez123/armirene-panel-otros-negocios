import { Injectable } from "@angular/core";
import { finalize, shareReplay, switchMap, tap } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { AuthResponse } from "../models/auth-response.class";
import { AUTH_DATA, Storage } from "../storage";
import { AuthEvent } from "../events/auth.event";
import { Router } from "@angular/router";
import { CitiesServices } from "src/app/services/cities.service";
import { BusinessService } from "src/app/services/business.service";

@Injectable({
    providedIn: 'root'
})
export class AuthManager {
    constructor(
        private _authService: AuthService,
        private _citiesService: CitiesServices,
        private _businessService: BusinessService,
        private _authEvent: AuthEvent,
        private _router: Router) { }

    login(formValue) {
        return this._authService.login(formValue).pipe(
            tap((authResponse: AuthResponse) => {
                let { data } = authResponse;
                Storage.setAll(AUTH_DATA, data);
                this._authEvent.changeLoginUser(authResponse);
            }),
            switchMap(() => this._authService.getInfo(formValue.username)),
            shareReplay()
        )
    }

    logout() {
        this._authEvent.changeLoginUser(null!)
        Storage.clear();
        this._router.navigateByUrl("/authentication/login")
    }

    getStates() {
        return this._citiesService.getStates()
    }

    getBusinessById(businessId) {
        return this._businessService.getBusinessById(businessId)
    }

    getBusinessList(userId) {
        return this._businessService.getBusinessList(userId);
    }
}