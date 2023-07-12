import { Injectable } from "@angular/core";
import { AuthManager } from "../manager/auth.manager";
import { STATES, Storage } from "../storage";
import { BusinessManager } from "../manager/business.manager";
import { map } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthVm {
    constructor(
        private _authManager: AuthManager,
    ) { }

    login(data) {
        return this._authManager.login(data).pipe(
            map(res => res['data'])
        )
    }

    getStates() {
        this._authManager.getStates().subscribe(states => Storage.setAll(STATES, states))
    }

    getBusinessById(businessId) {
        return this._authManager.getBusinessById(businessId)
    }

    getBusinessList(userId) {
        return this._authManager.getBusinessList(userId)
    }

}