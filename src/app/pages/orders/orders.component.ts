import { Component, OnInit } from '@angular/core';
import { OrderFormComponent } from './order-form/order-form.component';
import { DrawerEvent } from 'src/app/shared/event-listeners/drawer.event';
import { OrdersVm } from 'src/app/core/view-model/orders.vm';
import { Observable } from 'rxjs';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ORDER_TABLE } from 'src/app/core/tables-info';
import { Order } from 'src/app/core/models/order.class';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  providers: [NzModalService]
})
export class OrdersComponent implements OnInit {

  listOfData$: Observable<any>;
  orderModelList: any = {
    clientFirstName: '', clientLastName: '', clientPhone: '', clientAddress: '', state: ''
  };
  listOfColumn = ORDER_TABLE.columns;
  constructor(
    private modal: NzModalService,
    private drawerEvent: DrawerEvent,
    private _vm: OrdersVm
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
  }


  cancelOrderModal(data) {
    this.modal.confirm({
      nzTitle: '¿Estás seguro de cancelar esta order?',
      nzContent: 'Si cancelas  esta orden no podrás recuperarlo',
      nzOkText: 'Aceptar',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.cancelOrder(data),
      nzCancelText: 'Cancelar',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  cancelOrder({ orderId }) {
    this._vm.cancelOrder(orderId).subscribe()
  }

  createOrder() {
    this.drawerEvent.changeOpenComponent({ component: OrderFormComponent, data: new Order })
  }



  showDeleteConfirm(item): void {
    this.modal.confirm({
      nzTitle: '¿Estás seguro de eliminar este cliente?',
      nzContent: 'Si eliminas este cliente no podrás recuperarlo',
      nzOkText: 'Aceptar',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => console.log('OK', item),
      nzCancelText: 'Cancelar',
      nzOnCancel: () => console.log('Cancel')
    });
  }


  showOrder(item): void {
    this.drawerEvent.changeOpenComponent({ component: OrderFormComponent, data: item })
  }

}
