import { Component } from '@angular/core';
import { OrdersManagerVm } from 'src/app/core/view-model/orders-manager.vm';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BaseFormOrderStatesService } from 'src/app/core/baseForm/base-form-order-states.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-orders-manager',
  templateUrl: './orders-manager.component.html',
  styleUrls: ['./orders-manager.component.scss'],
  providers: [BaseFormOrderStatesService]
})
export class OrdersManagerComponent {
  listOfData$: Observable<any>;
  enviadas;
  canceladas;
  constructor(
    private _vm: OrdersManagerVm,
    public _baseFormOrderStates: BaseFormOrderStatesService
  ) { }

  ngOnInit(): void {
    this.init();
    console.log("form 24", this._baseFormOrderStates.baseForm.value)
  }

  init() {
    this.getOrdersByBusiness();
  }

  getOrdersByBusiness() {
    this._vm.returnOrderByBusiness().pipe(
      tap((data: any) => {
        this.enviadas = data.filter(item => item.state === 'ENVIADA');
        this.canceladas = data.filter(item => item.state === 'CANCELADA');
        console.log(this.enviadas, this.canceladas)
      })
    ).subscribe();
  }

  setFilter() {
    console.log(this._baseFormOrderStates.baseForm.value)
  }
}
