import { Injectable } from "@angular/core";
import { OrderManager } from "../manager/order.manager";
import { map } from "rxjs";
import { order } from "../networking/order.api";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class OrdersVm {

    constructor(
        private _orderManager: OrderManager
    ) { }

    returnOrderByBusiness() {
        return this._orderManager.returnOrderByBusiness().pipe(
            map(orders => orders.map(order => {
                order.business_id = Number(order.businessId),
                    order.orderId = Number(order.orderId),
                    order.country = order.country,
                    order.token = 0,
                    order.state = order.state,
                    order.business_order_id = Number(order.businessOrderId),
                    order.total_value = order.totalValue,
                    order.user_tip = order.userTip,
                    order.incentive_value = order.incentiveValue,
                    order.delivery_value = order.deliveryValue,
                    order.vehicle_type = Number(order.vehicleTypeId),
                    order.payment_method = Number(order.paymentMethodId),
                    order.instructions = order.instructions,
                    order.products = [{
                        product_id: 0,
                        name: 'demo product',
                        description: 'producto demo creado para la prueba de otros negocios',
                        quantity: 0,
                        image_url: null,
                        unit_price: 0,
                        store_id: Number(order.storeId)
                    }],
                    order.country = environment.indicator,
                    order.client_info = {
                        first_name: order.clientFirstName,
                        last_name: order.clientLastName,
                        phone: order.clientPhone,
                        email: order.clientEmail,
                        address: order.clientAddress,
                        lat: Number(order.clientLat),
                        lng: Number(order.clientLng),
                        city: '',
                        state: '',
                    }
                return order
            }))
        )
    }

    cancelOrder(orderId) {
        return this._orderManager.cancelOrder(orderId)
    }
}