import { Component, OnInit } from '@angular/core';
import { OrderFormComponent } from './order-form/order-form.component';
import { DrawerEvent } from 'src/app/shared/event-listeners/drawer.event';
import { OrdersVm } from 'src/app/core/view-model/orders.vm';
import { Observable } from 'rxjs';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ORDER_TABLE } from 'src/app/core/tables-info';
import { Order } from 'src/app/core/models/order.class';
import { RemoveLeadingZerosPipe } from 'src/app/shared/pipes/removeleadingzeros.pipe';
import { BaseFormOrderService } from 'src/app/core/baseForm/base-form-order.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  providers: [NzModalService]
})
export class OrdersComponent implements OnInit {
  form: FormGroup;
  listOfData$: Observable<any>;
  orderModelList: any = {
    orderId: '', 
    clientFirstName: '', 
    clientLastName: '', 
    clientPhone: '', 
    clientAddress: '', 
    state: '' , 
    createDate : ''
  };
  listOfColumn = ORDER_TABLE.columns;
  constructor(
    private modal: NzModalService,
    private drawerEvent: DrawerEvent,
    private _vm: OrdersVm,
    public _orderForm: BaseFormOrderService,
  ) {
  }

  ngOnInit(): void {
    this.init()
  }

  init() {
    this.getOrdersByBusiness();
  }

  getOrdersByBusiness() {
    this.listOfData$ = this._vm.returnOrderByBusiness();
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
    this.drawerEvent.changeOpenComponent({ component: OrderFormComponent, data: new Order })
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
    this.drawerEvent.changeOpenComponent({ component: OrderFormComponent, data: item })
  }

}
