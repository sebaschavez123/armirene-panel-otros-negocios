import { Injectable } from "@angular/core";
import { AuthManager } from "../manager/auth.manager";
import { BusinessManager } from "../manager/business.manager";
import { Business } from "../models/business.class";
import { ChangeBusinessEvent } from "../events/change-business.event";

@Injectable({
    providedIn: 'root'
})
export class DashboardLayoutVm {
    constructor(
        private _authManager: AuthManager,
        private _changeBusinessEvent: ChangeBusinessEvent
    ) { }

    logout() {
        this._authManager.logout()
    }

    returnBusinessSelected() {
        return this._changeBusinessEvent.returnBusinessSelected();
    }

    selectBusiness(business: Business) {
        this._changeBusinessEvent.selectBusiness(business)
    }
}