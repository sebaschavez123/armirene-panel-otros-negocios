import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "./base.service";
import { Observable, map } from "rxjs";
import { branchOffice } from "../core/networking/branch-office.api";
import { BranchOffice } from "../core/models/branch-office.class";

@Injectable({
    providedIn: 'root'
})
export class BranchOfficeService {

    private url: string;

    constructor(
        private _baseService: BaseService
    ) {
        this.url = environment.gateway;
    }

    getBranchOfficeByBusiness(businessId): Observable<BranchOffice[]> {
        return this._baseService.get(`${this.url}/${branchOffice.branchOffice}/${branchOffice.all}/${businessId}`).pipe(
            map(res => res['data'])
        )
    }

    saveBranchOfficeByBusiness(body: BranchOffice): Observable<BranchOffice> {
        return this._baseService.post(`${this.url}/${branchOffice.branchOffice}/${branchOffice.create}`, body).pipe(
            map(res => res['data'])
        )
    }

    updateBranchOffice(branchOfficeId: number, businessId: number, changes: Partial<BranchOffice>): Observable<any> {
        return this._baseService.post(`${this.url}/${branchOffice.branchOffice}/${branchOffice.update}/${businessId}/${branchOfficeId}`, changes)
    }

    deleteBranchOfficeByBusiness(body) {
        return this._baseService.delete(`${this.url}/${branchOffice.branchOffice}/${branchOffice.delete}`, body)
    }

}