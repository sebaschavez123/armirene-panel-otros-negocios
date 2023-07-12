import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Orders_ROUTES } from 'src/app/shared/routes/orders.routes';

const routes: Routes = Orders_ROUTES;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
