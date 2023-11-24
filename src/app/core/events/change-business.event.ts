import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Business } from "../models/business.class";

@Injectable({
    providedIn: 'root'
})
export class ChangeBusinessEvent {

    private subjectBusinessSelected = new BehaviorSubject<Business>(null!);
    businessSelected$: Observable<Business> = this.subjectBusinessSelected.asObservable();

    constructor() { }
    
    selectBusiness(business: Business) {
        this.subjectBusinessSelected.next(business)
    }

    returnBusinessSelected(): Observable<Business> {
        return this.businessSelected$
    }

}