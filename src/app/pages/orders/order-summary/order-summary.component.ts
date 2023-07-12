import { Component, Input, OnInit } from '@angular/core';
import { OrderFormComponent } from '../order-form/order-form.component';
import { DrawerEvent } from 'src/app/shared/event-listeners/drawer.event';
import { Order } from 'src/app/core/models/order.class';
import { BranchOffice } from 'src/app/core/models/branch-office.class';
import { Observable, tap } from 'rxjs';
import { OrderSummaryVm } from 'src/app/core/view-model/order-summary.vm';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {

  @Input() order: Order;
  @Input() branchOffice: BranchOffice;
  @Input() showActions: boolean = true;
  branchOfficeList$: Observable<BranchOffice[]>
  branchOfficeSelected: BranchOffice;
  public client_info;
  public phone;
  public address;
  public payment_method;
  public vehicle_type;
  public instructions;

  constructor(
    public orderFormComponent: OrderFormComponent,
    private _vm: OrderSummaryVm,
    private drawerEvent: DrawerEvent,
  ) { }

  ngOnInit(): void {
    let { client_info, payment_method, vehicle_type, instructions } = this.order;
    this.client_info = client_info;
    this.payment_method = payment_method;
    this.vehicle_type = vehicle_type;
    this.instructions = instructions;
    this.getBranchOfficeByBusiness();
  }

  clickClientDetail() {
    this.orderFormComponent.current = 0;
    this.orderFormComponent.firstContent = true;
    this.orderFormComponent.secondContent = false;
    this.orderFormComponent.thirdContent = false;
    this.orderFormComponent.fourthContent = false;
    this.drawerEvent.changeWidthComponent({ width: '40%' })
  }

  clickOrderDetail() {
    this.orderFormComponent.current = 2;
    this.orderFormComponent.firstContent = false;
    this.orderFormComponent.secondContent = false;
    this.orderFormComponent.thirdContent = true;
    this.orderFormComponent.fourthContent = false;
    this.drawerEvent.changeWidthComponent({ width: '40%' })
  }


  setBranchOffice() {

  }

  getBranchOfficeByBusiness() {
    this.branchOfficeList$ = this._vm.returnBranchOfficeByBusiness().pipe(
      tap(res => console.log(res))
    )
  }



}
