import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartView_ROUTES } from 'src/app/shared/routes/start-view.routes';

const routes: Routes = StartView_ROUTES;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StartViewRoutingModule { }
