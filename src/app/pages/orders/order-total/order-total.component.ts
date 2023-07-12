import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/core/models/order.class';

@Component({
  selector: 'app-order-total',
  templateUrl: './order-total.component.html',
  styleUrls: ['./order-total.component.scss']
})
export class OrderTotalComponent implements OnInit {
  @Input() order: Order;
  public client_info;
  public phone;
  public address;
  public payment_method;
  public vehicle_type;
  public instructions;
  public delivery_value;
  public total_value;
  public incentive_value;
  constructor() { }

  ngOnInit(): void {
    let { client_info, payment_method, vehicle_type, instructions, delivery_value, total_value , incentive_value } = this.order;
    this.client_info = client_info;
    this.payment_method = payment_method;
    this.vehicle_type = vehicle_type;
    this.instructions = instructions;
    this.delivery_value = delivery_value;
    this.total_value = total_value;
    this.incentive_value = incentive_value;
  }

}
