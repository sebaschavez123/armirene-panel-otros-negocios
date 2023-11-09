import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription, catchError, finalize, switchMap, tap, throwError } from 'rxjs';
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
import { RemoveLeadingZerosPipe } from 'src/app/shared/pipes/removeleadingzeros.pipe';
import { countryConfig } from 'src/country-config/country-config';
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
  clients;
  filteredOptions: string[] = [];
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
  messenger: any;
  countryConfig = countryConfig;
  showOrderMesseger: boolean = true;
  private subsGetOrderMessenger: Subscription;
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
    this.setShowOrderMessenger();
  }

  init() {
    this.getBranchOfficeByBusiness();
    this.getClientsByBusiness();
    this.initForm();
    this.goDetailsForm();
  }

  initForm() {
    this.form = this._orderForm.pathFormData(new Order);
    this.form.patchValue({ ...this.dataForm, storeId: Number(this.dataForm.storeId) });
  }

  setShowOrderMessenger() {
    if (this.dataForm?.state == 'CANCELADA') {
      this.showOrderMesseger = false;
    }
  }

  goDetailsForm() {
    let filterPipe = new RemoveLeadingZerosPipe()
    this.orderId = this.dataForm.orderId;
    if (this.orderId) {
      this.current = 3;
      this.showActions = false;
      this.changeContent();
      this.subsGetOrderMessenger = this.branchOfficeList$.pipe(
        tap(branchOfficeList => {
          this.branchOfficeSelected = branchOfficeList.filter(branchOffice => branchOffice.id == this.dataForm.storeId)[0]
        }),
        switchMap(a => this._vm.getOrderMessenger(filterPipe.transform(this.orderId)))
      ).subscribe(messenger => {
        let { data } = messenger;
        this.messenger = data;
      })
    }
  }

  getBranchOfficeByBusiness() {
    this.branchOfficeList$ = this._vm.returnBranchOfficeByBusiness()
  }


  getClientsByBusiness() {
    this._vm.returnClientsByBusiness().subscribe(clients => {
      this.clients = clients;
      this.filteredOptions = this.clients;
    })
  }

  onChangeDni(value: string): void {
    this.filteredOptions = this.clients.filter(option => option.dni.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

  onChangeEmail(value: string): void {
    this.filteredOptions = this.clients.filter(option => option.email.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

  clickAutocompleteClient(client) {
    this.form.get('client_info')?.patchValue({
      ...client,
      first_name: client.firstName,
      last_name: client.lastName,
      address: ''
    })
  }

  pre(): void {
    this.current -= 1;
    this.changeContent();
  }

  onKeyDown(event: KeyboardEvent): void {
    const allowedKeys = ["e", "E", "+", "-"];
    if (allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
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
    this.setCreateOrder();
    if (!this.form.invalid) {
      this.showActions = false;
      this._loadingService.loadingOn()
      this.subsGetOrderMessenger = this._vm.saveOrder(this.form.value)
        .pipe(
          finalize(() => this._loadingService.loadingOff()),
          catchError(err => {
            let { error: { message } } = err;
            this._messagesService.showErrors(message);
            this.showActions = true;
            return throwError(() => err);
          }),
          tap((res: any) => {
            let { message, data: { orderId } } = res;
            this.orderId = orderId;
            console.log("ordenId", this.orderId)
            this._messagesService.showErrors(message);
          }),
          switchMap(res => this._vm.getOrderMessenger(res.data.orderId)),
        ).subscribe(res => {
          let { message, data: { orderId } } = res;
          this.orderId = orderId;
          this.form.get('orderId')?.setValue(orderId)
          this.getMessenger(this.orderId);
          this._messagesService.showErrors(message);
        })
    } else {
      this.showFormError(this._orderForm.baseForm);
    }
  }

  getMessenger(orderId) {
    let filterPipe = new RemoveLeadingZerosPipe()
    this.subsGetOrderMessenger = this._vm.getOrderMessenger(filterPipe.transform(orderId)).subscribe(messenger => {
      let { data } = messenger;
      this.messenger = data;
    })
  }

  setCreateOrder() {
    let { value } = this.form.controls['products']
    value.forEach(element => {
      element.description = this.form.controls['orderInvoice'].value;
      element.name = "Product";
    });
    this.form.get('instructions')?.
      setValue(`${this.form.controls['client_info']?.get('addressDetail')?.value}\n${this.form.controls['client_info']?.get('indications')?.value}\n${this.form.get('instructions')?.value}`)
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

  validateInput(input) {
    console.log(input)
    if (input.value < 0) {
      input.value = '';
    }
  }

  ngOnDestroy() {
    let latLng = {};
    this._store.dispatch(saveLatLng({ latLng }));
    this.subsGetOrderMessenger?.unsubscribe();
  }
}
