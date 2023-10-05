import { Component, Input, OnInit } from '@angular/core';
import { DrawerEvent } from 'src/app/shared/event-listeners/drawer.event';
import { OrderFormComponent } from '../../orders/order-form/order-form.component';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent implements OnInit {

  @Input() item;

  constructor(private drawerEvent: DrawerEvent) { }

  ngOnInit(): void {
    console.log(this.item)
  }

  detailOrder(order: any) {
    this.drawerEvent.changeOpenComponent({ component: OrderFormComponent, data: order })
  }
}
