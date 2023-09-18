import { Routes } from '@angular/router';
import { MessengersComponent } from 'src/app/pages/messengers/messengers.component';

export const Messengers_ROUTES: Routes = [
    {
        path: '',
        component: MessengersComponent,
        data: {
            title: 'Mensajeros'
        }
    }
];