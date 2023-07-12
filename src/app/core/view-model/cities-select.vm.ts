import { Injectable } from "@angular/core";
import { CitiesManager } from "../manager/cities.manager";

@Injectable({
    providedIn: 'root'
})
export class CitiesSelectVM {

    constructor(
        private _citiesManager: CitiesManager
    ) { }

    getCities(stateId) {
        return this._citiesManager.getCities(stateId)
    }
}