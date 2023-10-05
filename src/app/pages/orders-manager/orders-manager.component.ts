import { Component } from '@angular/core';
import { OrdersManagerVm } from 'src/app/core/view-model/orders-manager.vm';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-orders-manager',
  templateUrl: './orders-manager.component.html',
  styleUrls: ['./orders-manager.component.scss']
})
export class OrdersManagerComponent {
  listOfData$: Observable<any>;
  enviadas
  canceladas
  constructor(
    private _vm: OrdersManagerVm
  ) { }

  ngOnInit(): void {
    this.init()
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
}
