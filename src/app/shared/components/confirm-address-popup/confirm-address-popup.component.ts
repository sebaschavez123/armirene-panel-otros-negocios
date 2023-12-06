import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmAddressPopupService } from 'src/app/core/events/confirm-addres-popup.event';
import { Subscription } from 'rxjs';

const MODULES = [
  CommonModule,
]
@Component({
  selector: 'app-confirm-address-popup',
  templateUrl: './confirm-address-popup.component.html',
  styleUrl: './confirm-address-popup.component.scss',
  standalone: true,
  imports: [...MODULES]
})
export class ConfirmAddressPopupComponent implements OnDestroy {
  isPopupVisible: boolean = false;
  constructor(public _confirmPopupService: ConfirmAddressPopupService) {
    this._confirmPopupService.isPopupVisible$.subscribe((isVisible) => {
      this.isPopupVisible = isVisible;
    });
  }

  confirm(response: boolean) {
    this._confirmPopupService.setUserResponse(response);
    this._confirmPopupService.hidePopup();
  }

  ngOnDestroy() {
    this.isPopupVisible = false;
  }
}
