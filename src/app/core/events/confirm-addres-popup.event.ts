// confirm-popup.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ConfirmAddressPopupService {
    private _isPopupVisible = new Subject<boolean>();
    private _userResponse = new Subject<boolean>();

    get isPopupVisible$() {
        return this._isPopupVisible.asObservable();
    }

    get userResponse$() {
        return this._userResponse.asObservable();
    }

    showPopup() {
        this._isPopupVisible.next(true);
    }

    hidePopup() {
        this._isPopupVisible.next(false);
    }

    setUserResponse(response: boolean) {
        this._userResponse.next(response);
    }
}