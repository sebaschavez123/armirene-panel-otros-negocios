import { Routes, RouterModule } from '@angular/router';

export const AuthenticationLayout_ROUTES: Routes = [
    {
        path: '',
        loadChildren: () => import('../../authentication/authentication.module').then(m => m.AuthenticationModule)
    }
];