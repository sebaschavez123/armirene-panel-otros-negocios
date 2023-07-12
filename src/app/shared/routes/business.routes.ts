import { Routes } from '@angular/router';
import { BusinessComponent } from 'src/app/pages/business/business.component';

export const Business_ROUTES: Routes = [
    {
        path: '',
        component: BusinessComponent,
        data: {
            title: 'Negocios'
        }
    },
    {
        path: 'business-form',
        loadComponent: () => import('../components/business-form/business-form.component').then(m => m.BusinessFormComponent),
        data: {
            title: 'Crear negocio'
        }
    },
    {
        path: 'business-form/:id',
        loadComponent: () => import('../components/business-form/business-form.component').then(m => m.BusinessFormComponent),
        data: {
            title: 'Editar negocio'
        }
    }
];