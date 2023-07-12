import { Injectable } from "@angular/core";
import { CitiesServices } from "src/app/services/cities.service";

@Injectable({
    providedIn: 'root'
})
export class CitiesManager {

    constructor(private _citiesService: CitiesServices) { }

    getCities(stateId) {
        return this._citiesService.getCities(stateId)
    }
}