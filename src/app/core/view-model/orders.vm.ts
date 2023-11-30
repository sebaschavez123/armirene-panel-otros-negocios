import { Injectable } from "@angular/core";
import { OrderManager } from "../manager/order.manager";
import { BehaviorSubject, Observable, map } from "rxjs";
import { environment } from "src/environments/environment";
import { BranchOfficeManager } from "../manager/branch-office.manager";
import { Order } from "../models/order.class";
import { countryConfig } from 'src/country-config/country-config';
import { COUNTRIES_COL } from "src/app/cities-col-temporal";
import { COUNTRIES_VZLA } from "src/app/cities-ven-temporal";

@Injectable({
    providedIn: 'root'
})
export class OrdersVm {
    private cities;
    private dataList: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>([]);
    public dataList$: Observable<Order[]> = this.dataList.asObservable();
    private cacheList: Order[];
    public cityIds;
    public cityMap;
    constructor(
        private _orderManager: OrderManager,
        private _branchOfficeManager: BranchOfficeManager
    ) {
        this.cities = countryConfig.isColombia ? COUNTRIES_COL.cities : COUNTRIES_VZLA.cities;
        const cityNames = this.cities.map(item => item.name);
        this.cityIds = this.cities.map(item => item.id);
        this.cityMap = Object.fromEntries(this.cities.map(item => [item.name, item.id]));
    }

    returnOrderByBusiness() {
        this._orderManager.returnOrderByBusiness().pipe(
            map(orders => orders.map(order => {
                order.business_id = Number(order.businessId),
                    order.createDate = order.createDate,
                    order.orderId = order.orderId,
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
        ).subscribe(res => {
            this.cacheList = res;
            this.updateDataList(this.cacheList)
        })
    }

    cancelOrder(orderId) {
        return this._orderManager.changeStateOrder(orderId, 'CANCELADA')
    }

    finishOrder(orderId) {
        return this._orderManager.changeStateOrder(orderId, 'FINALIZADA')
    }

    returnBranchOfficeByBusiness() {
        return this._branchOfficeManager.returnBranchOfficeByBusiness()
    }

    filterData(changes): void {
        console.log(changes)
        let { branchOffice, city } = changes;
        if (city) {
            const cityId = this.cityMap[city];
            if (branchOffice) {
                let filteredData = this.cacheList.filter(item => item.storeId === branchOffice && item.cityId === cityId);
                this.updateDataList(filteredData)
            } else {
                let filteredData = this.cacheList.filter(item => item.cityId === cityId);
                this.updateDataList(filteredData)
            }
        } else if (branchOffice) {
            let filteredData = this.cacheList.filter(item => item.storeId === branchOffice);
            this.updateDataList(filteredData)
        } else {
            this.updateDataList(this.cacheList)
        }
    }

    updateDataList(list): void {
        this.dataList.next(list);
    }

}