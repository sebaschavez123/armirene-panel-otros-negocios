import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/auth.guard';

export const DashboardLayout_ROUTES: Routes = [
    {
        path: "",
        pathMatch: "prefix",
        canActivate: [AuthGuard],
        children: [
            {
                path: 'start-view',
                loadChildren: () => import('../../pages/start-view/start-view.module').then(m => m.StartViewModule)
            },
            {
                path: 'business',
                loadChildren: () => import('../../pages/business/business.module').then(m => m.BusinessModule)
            },
            {
                path: 'orders',
                loadChildren: () => import('../../pages/orders/orders.module').then(m => m.OrdersModule)
            },
            {
                path: 'clients',
                loadChildren: () => import('../../pages/clients/clients.module').then(m => m.ClientsModule)
            },
            {
                path: 'orders-manager',
                loadChildren: () => import('../../pages/orders-manager/orders-manager.module').then(m => m.OrdersManagerModule)
            },
            {
                path: 'messengers',
                loadChildren: () => import('../../pages/messengers/messengers.module').then(m => m.MessengersModule)
            },
            {
                path: 'setting',
                loadChildren: () => import('../../pages/setting/setting.module').then(m => m.SettingModule)
            },
        ]
    }


];