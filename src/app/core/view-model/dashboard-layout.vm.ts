import { Injectable } from "@angular/core";
import { AuthManager } from "../manager/auth.manager";
import { BusinessManager } from "../manager/business.manager";
import { Business } from "../models/business.class";

@Injectable({
    providedIn: 'root'
})
export class DashboardLayoutVm {
    constructor(
        private _authManager: AuthManager,
        private _businessManager: BusinessManager
    ) { }

    logout() {
        this._authManager.logout()
    }

    returnBusinessSelected() {
        return this._businessManager.returnBusinessSelected();
    }

    selectBusiness(business : Business){
        this._businessManager.selectBusiness(business)
    }
}