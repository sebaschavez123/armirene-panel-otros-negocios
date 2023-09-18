import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Messengers_ROUTES } from 'src/app/shared/routes/messengers.routes';

const routes: Routes = Messengers_ROUTES;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessengersRoutingModule { }
