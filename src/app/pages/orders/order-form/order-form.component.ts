import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, catchError, filter, finalize, tap, throwError } from 'rxjs';
import { BaseFormOrderService } from 'src/app/core/baseForm/base-form-order.service';
import { BranchOffice } from 'src/app/core/models/branch-office.class';
import { Order } from 'src/app/core/models/order.class';
import { OrderFormVm } from 'src/app/core/view-model/order-form.vm';
import { saveLatLng } from 'src/app/ngrx/actions/map.actions';
import { AppState } from 'src/app/ngrx/reducers/app.reducer';
import { LoadingService } from 'src/app/services/loading.service';
import { MessagesService } from 'src/app/services/messages.service';
import { ViewportMap } from 'src/app/shared/components/view-port-map/view-port-map';
import { DrawerEvent } from 'src/app/shared/event-listeners/drawer.event';
import { selectDataMapInterface } from 'src/app/shared/interfaces/select-data-map.type';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
  providers: [
    MessagesService,
    LoadingService
  ]
})
export class OrderFormComponent implements OnInit {

  @Input() form: FormGroup
  @Input() dataForm: Order;
  branchOfficeList$: Observable<BranchOffice[]>
  branchOfficeSelected: BranchOffice;
  current: number = 0;
  firstContent: boolean = true;
  secondContent: boolean = false;
  thirdContent: boolean = false;
  fourthContent: boolean = false;
  map = ViewportMap.getInstance();
  selectedData: selectDataMapInterface;
  onGPS = false;
  showActions: boolean = true;
  orderId;
  constructor(
    private drawerEvent: DrawerEvent,
    public _orderForm: BaseFormOrderService,
    private _vm: OrderFormVm,
    private _messagesService: MessagesService,
    private _drawerEvent: DrawerEvent,
    private _loadingService: LoadingService,
    private _store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.getBranchOfficeByBusiness();
    this.initForm();
    this.goDetailsForm();
  }

  initForm() {
    this.form = this._orderForm.pathFormData(new Order);
    this.form.patchValue({ ...this.dataForm, storeId: Number(this.dataForm.storeId) });
  }

  goDetailsForm() {
    this.orderId = this.dataForm.orderId;
    if (this.orderId) {
      this.current = 3;
      this.showActions = false;
      this.changeContent();
      this.branchOfficeList$.pipe(
        tap(branchOfficeList => {
          this.branchOfficeSelected = branchOfficeList.filter(branchOffice => branchOffice.id == this.dataForm.storeId)[0]
        }),
      ).subscribe()
    }
  }

  getBranchOfficeByBusiness() {
    this.branchOfficeList$ = this._vm.returnBranchOfficeByBusiness()
  }

  pre(): void {
    this.current -= 1;
    this.changeContent();
  }

  next(): void {
    if (this.validClientForm && this.current != 2) {
      this.setCity();
      this.current += 1;
      this.changeContent();
    }

    if (!this.validOrderForm && this.current == 0) {
      this.showFormError(this.form.controls['client_info'] as FormGroup)
    }

    if (this.validOrderForm && this.current == 2) {
      this.current += 1;
      this.changeContent();
    }

    if (!this.validOrderForm && this.current == 2) {
      this.showFormError(this.form)
    }
  }

  get validClientForm() {
    return !this.form.get('client_info')?.invalid;
  }

  get validOrderForm() {
    return !this.form.invalid;
  }

  changeContent(): void {
    switch (this.current) {
      case 0: {
        this.firstContent = true;
        this.secondContent = false;
        this.thirdContent = false;
        this.fourthContent = false;
        this.drawerEvent.changeWidthComponent({ width: '40%' })
        break;
      }
      case 1: {
        this.firstContent = false;
        this.secondContent = true;
        this.thirdContent = false;
        this.fourthContent = false;
        break;
      }
      case 2: {
        this.firstContent = false;
        this.secondContent = false;
        this.thirdContent = true;
        this.fourthContent = false;
        this.drawerEvent.changeWidthComponent({ width: '40%' })
        break;
      }
      case 3: {
        this.firstContent = false;
        this.secondContent = false;
        this.thirdContent = false;
        this.fourthContent = true;
        this.drawerEvent.changeWidthComponent({ width: '90%' })
        break;
      }
      default: {
        this.closeDrawer();
      }
    }
  }

  createOrder() {
    if (!this.form.invalid) {
      this._loadingService.loadingOn()
      this._vm.saveOrder(this.form.value)
        .pipe(
          finalize(() => this._loadingService.loadingOff()),
          catchError(err => {
            let { error: { message } } = err;
            this._messagesService.showErrors(message);
            return throwError(() => err);
          }),
        ).subscribe(res => {
          let { message } = res;
          this.showActions = false;
          this._messagesService.showErrors(message);
        })
    } else {
      this.showFormError(this._orderForm.baseForm);
    }
  }

  showFormError(form: FormGroup) {
    Object.values(form?.controls).forEach(control => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }

  changeBranchOffice(branchOffice) {
    let { id } = branchOffice;
    let { value } = this.form.controls['products']
    value.forEach(element => {
      element.store_id = id
    });
    this.form.get('storeId')?.setValue(id)
  }

  getCoordinates(coordinates) {
    let { lat, lng } = coordinates
    this.form.controls['client_info']?.get('lat')?.setValue(lat);
    this.form.controls['client_info']?.get('lng')?.setValue(lng);
  }

  setCity() {
    let { value: { city } } = this.form.controls['client_info'];
    this.form.get('city')?.setValue(city);
  }

  closeDrawer() {
    this._drawerEvent.changeCloseComponent(true)
  }

  ngOnDestroy() {
    let latLng = {};
    this._store.dispatch(saveLatLng({ latLng }))
  }
}
