import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Clients_ROUTES } from 'src/app/shared/routes/clients.routes';

const routes: Routes = Clients_ROUTES;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
