import { Injectable } from "@angular/core";
import { AuthManager } from "../manager/auth.manager";
import { STATES, Storage } from "../storage";
import { BusinessManager } from "../manager/business.manager";
import { map } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class RegisterVm {
    constructor(
        private _authManager: AuthManager,
    ) { }

    register(data) {
        return this._authManager.register(data).pipe(
            map(res => res['message'])
        )
    }

}