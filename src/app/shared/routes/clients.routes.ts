import { Routes, RouterModule } from '@angular/router';
import { ClientsComponent } from 'src/app/pages/clients/clients.component';

export const Clients_ROUTES: Routes = [
    {
        path: '',
        component: ClientsComponent,
        data: {
            title: 'Pedidos'
        }
    }
];