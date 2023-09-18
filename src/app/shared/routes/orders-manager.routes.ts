import { Routes } from '@angular/router';
import { OrdersManagerComponent } from 'src/app/pages/orders-manager/orders-manager.component';

export const OrdersManager_ROUTES: Routes = [
    {
        path: '',
        component: OrdersManagerComponent,
        data: {
            title: 'Manejo de pedidos'
        }
    }
];