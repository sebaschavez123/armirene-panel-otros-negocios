import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationLayoutComponent } from './layouts/authentication-layout/authentication-layout.component';
import { AuthenticationLayout_ROUTES } from './shared/routes/authentication-layout.routes';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { DashboardLayout_ROUTES } from './shared/routes/dashboard-layout.routes';
import { AuthGuard } from './core/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'authentication/login',
    pathMatch: "full"
  },
  {
    path: 'authentication',
    component: AuthenticationLayoutComponent,
    children: AuthenticationLayout_ROUTES
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardLayoutComponent,
    children: DashboardLayout_ROUTES
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
