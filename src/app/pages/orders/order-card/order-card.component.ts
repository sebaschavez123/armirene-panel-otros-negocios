import { Component, OnInit } from '@angular/core';
import { DrawerEvent } from 'src/app/shared/event-listeners/drawer.event';
import { OrderFormComponent } from '../order-form/order-form.component';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent implements OnInit {

  constructor(private drawerEvent: DrawerEvent) { }

  ngOnInit(): void {
  }


  detailOrder(order: any) {
    this.drawerEvent.changeOpenComponent({ component: OrderFormComponent, data: order })
  }
}
