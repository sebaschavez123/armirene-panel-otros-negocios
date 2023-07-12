import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from 'src/app/pages/orders/orders.component';

export const Orders_ROUTES: Routes = [
    {
        path: '',
        component: OrdersComponent,
        data: {
            title: 'Pedidos'
        }
    }
];