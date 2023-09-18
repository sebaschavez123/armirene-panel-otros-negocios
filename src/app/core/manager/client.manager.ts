import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, catchError, shareReplay, tap, throwError } from "rxjs";
import { MessagesService } from "src/app/services/messages.service";
import { LoadingService } from "src/app/services/loading.service";
import { BUSINESS_DATA, Storage } from "../storage";
import { ClientService } from "src/app/services/client.service";

@Injectable({
    providedIn: 'root'
})
export class ClientManager {

    private subject = new BehaviorSubject<any[]>([]);
    clients$: Observable<any[]> = this.subject.asObservable();

    constructor(
        private _clientService: ClientService,
        private _messages: MessagesService,
        private _loading: LoadingService
    ) {
        this.getClientsByBusiness(Storage.getAll(BUSINESS_DATA)?.id);
    }

    getClientsByBusiness(businessId: number) {
        const loadClientsByBusiness$ = this._clientService.getClientsByBusiness(businessId).pipe(
            catchError(err => {
                let { error: { message } } = err;
                this.subject.next([])
                this._messages.showErrors(message);
                return throwError(() => err);
            }),
            tap(clients => this.subject.next(clients)),
            shareReplay()
        );

        this._loading.showLoaderUntilCompleted(loadClientsByBusiness$)
            .subscribe();
    }

    returnClientsByBusiness(): Observable<any[]> {
        return this.clients$
    }

}