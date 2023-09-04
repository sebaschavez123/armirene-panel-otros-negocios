import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersManager_ROUTES } from 'src/app/shared/routes/orders-manager.routes';

const routes: Routes = OrdersManager_ROUTES;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersManagerRoutingModule { }
