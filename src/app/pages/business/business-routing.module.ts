import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Business_ROUTES } from 'src/app/shared/routes/business.routes';

const routes: Routes = Business_ROUTES;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessRoutingModule { }
