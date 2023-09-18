import { Injectable } from "@angular/core";
import { ClientManager } from "../manager/client.manager";

@Injectable({
    providedIn: 'root'
})
export class ClientsVm {

    constructor(
        private _clientManager: ClientManager
    ) { }

    returnClientsByBusiness() {
        return this._clientManager.returnClientsByBusiness()
    }

}