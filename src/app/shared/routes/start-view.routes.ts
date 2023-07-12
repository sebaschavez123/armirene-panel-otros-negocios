import { Routes, RouterModule } from '@angular/router';
import { StartViewComponent } from 'src/app/pages/start-view/start-view.component';

export const StartView_ROUTES: Routes = [
    {
        path: '',
        component: StartViewComponent,
        data: {
            title: 'Pedidos'
        }
    }
];