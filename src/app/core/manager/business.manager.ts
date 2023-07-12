import { Injectable } from "@angular/core";
import { BusinessService } from "src/app/services/business.service";
import { Business } from "../models/business.class";
import { BehaviorSubject, Observable, catchError, shareReplay, tap, throwError } from "rxjs";
import { LoadingService } from "src/app/services/loading.service";
import { MessagesService } from "src/app/services/messages.service";
import { Storage, USER_DATA } from "../storage";

@Injectable({
    providedIn: 'root'
})
export class BusinessManager {

    private subject = new BehaviorSubject<Business[]>([]);
    private subjectBusinessSelected = new BehaviorSubject<Business>(null!);
    businessSelected$: Observable<Business> = this.subjectBusinessSelected.asObservable();
    business$: Observable<Business[]> = this.subject.asObservable();

    constructor(
        private _businessService: BusinessService,
        private _messages: MessagesService,
        private _loading: LoadingService,
    ) {
        this.getBusinessList(Storage.getOne(USER_DATA)?.id);
    }

    createBusiness(data: Business) {
        return this._businessService.saveBusiness(data);
    }

    getBusinessList(userId: number) {
        const loadBusiness$ = this._businessService.getBusinessList(userId).pipe(
            catchError(err => {
                let { error: { message } } = err;
                this._messages.showErrors(message);
                return throwError(() => err);
            }),
            tap(businessList => this.subject.next(businessList)),
            shareReplay()
        );

        this._loading.showLoaderUntilCompleted(loadBusiness$)
            .subscribe();
    }

    returnBusiness(): Observable<Business[]> {
        return this.business$
    }

    returnBusinessSelected(): Observable<Business> {
        return this.businessSelected$
    }

    saveBusiness(body: Business) {
        const businessList = this.subject.getValue();
        return this._businessService.saveBusiness(body).pipe(
            tap(business => {
                businessList.unshift(business);
                this.subject.next(businessList);
            }),
            shareReplay()
        )
    }

    deleteBusiness(businessId) {
        const businessList = this.subject.getValue();
        const index = businessList.findIndex(business => business.id == businessId);
        businessList.splice(index, 1);
        this.subject.next(businessList);
        return this._businessService.deleteBusiness(businessId).pipe(
            catchError(err => {
                const message = "Could not delete business";
                this._messages.showErrors(message);
                return throwError(() => err);
            }),
            shareReplay()
        )
    }

    updateBusiness(businessId, changes: Business) {
        const businessList = this.subject.getValue();
        const index = businessList.findIndex(business => business.id == businessId);
        const newBusiness: Business = {
            ...businessList[index],
            ...changes
        };
        const newBusinessList: Business[] = businessList.slice(0);
        newBusinessList[index] = newBusiness;
        this.subject.next(newBusinessList);
        return this._businessService.updateBusiness(businessId, changes).pipe(
            catchError(err => {
                const message = "Could not update business";
                this._messages.showErrors(message);
                return throwError(() => err);
            }),
            shareReplay()
        )

    }

    getBusinessById(businessId) {
        return this._businessService.getBusinessById(businessId).pipe(
            catchError(err => {
                const message = "Could not get business";
                this._messages.showErrors(message);
                return throwError(() => err);
            }),
            shareReplay()
        )
    }

    selectBusiness(business: Business) {
        this.subjectBusinessSelected.next(business)
    }

}