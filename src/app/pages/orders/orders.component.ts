import { Component, OnInit } from '@angular/core';
import { OrderFormComponent } from './order-form/order-form.component';
import { DrawerEvent } from 'src/app/core/events/drawer.event';
import { OrdersVm } from 'src/app/core/view-model/orders.vm';
import { Observable, filter, of, switchMap, tap } from 'rxjs';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ORDER_TABLE } from 'src/app/core/tables-info';
import { Order } from 'src/app/core/models/order.class';
import { RemoveLeadingZerosPipe } from 'src/app/shared/pipes/removeleadingzeros.pipe';
import { BaseFormOrderService } from 'src/app/core/baseForm/base-form-order.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BranchOffice } from 'src/app/core/models/branch-office.class';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  providers: [NzModalService]
})
export class OrdersComponent implements OnInit {
  filterForm: FormGroup;
  listOfData$: Observable<any>;
  branchOfficeList$: Observable<BranchOffice[]>
  filterBranchOfficeSelected;
  orderModelList: any = {
    orderId: '',
    clientFirstName: '',
    clientLastName: '',
    clientPhone: '',
    clientAddress: '',
    state: '',
    // createDate: ''
  };
  listOfColumn = ORDER_TABLE.columns;
  constructor(
    private modal: NzModalService,
    private drawerEvent: DrawerEvent,
    private _vm: OrdersVm,
    public _orderForm: BaseFormOrderService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.init()
    this.filterForm.valueChanges.subscribe(changes => {
      this.changeFilter(changes);
    });
  }

  createFilterForm() {
    this.filterForm = this.fb.group({
      branchOffice: '',
      state: '',
      city: '',
      date: null
    })
  }

  init() {
    this.createFilterForm();
    this.getOrdersByBusiness();
    this.getBranchOfficeByBusiness();
  }

  getOrdersByBusiness() {
    this._vm.returnOrderByBusiness();
    this.listOfData$ = this._vm.dataList$;
  }

  getBranchOfficeByBusiness() {
    this.branchOfficeList$ = this._vm.returnBranchOfficeByBusiness();
  }

  getTableActions(item): void {
    let { type, data } = item;
    if (type == 'cancel') {
      this.cancelOrderModal(data);
    }
    if (type == 'show') {
      this.showOrder(data)
    }
    if (type == 'stop') {
      this.showFinishOrderConfirm(data)
      console.log(data, "data")
    }
  }


  cancelOrderModal(data) {
    this.modal.confirm({
      nzTitle: '¿Estás seguro de cancelar esta order?',
      nzContent: 'Si cancelas  esta orden no podrás recuperarla',
      nzOkText: 'Aceptar',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.cancelOrder(data),
      nzCancelText: 'Cancelar',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  cancelOrder({ orderId }) {
    let filterPipe = new RemoveLeadingZerosPipe()
    this._vm.cancelOrder(filterPipe.transform(orderId)).subscribe()
  }

  createOrder() {
    this.drawerEvent.changeOpenComponent({ component: OrderFormComponent, data: { item: new Order, branchOffices: this.branchOfficeList$ } })
  }

  finishOrder({ orderId }) {
    let filterPipe = new RemoveLeadingZerosPipe()
    this._vm.finishOrder(filterPipe.transform(orderId)).subscribe()
  }


  showFinishOrderConfirm(item): void {
    this.modal.confirm({
      nzTitle: '¿Estás seguro de FINALIZAR esta orden?',
      nzContent: 'Si FINALIZAS  esta orden no podrás recuperarla',
      nzOkText: 'Aceptar',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.finishOrder(item),
      nzCancelText: 'Cancelar',
      nzOnCancel: () => console.log('Cancel')
    });
  }


  showOrder(item): void {
    this.drawerEvent.changeOpenComponent({ component: OrderFormComponent, data: { item, branchOffices: this.branchOfficeList$ } })
  }

  changeFilter(changes) {
    this._vm.filterData(changes);
  }

}
