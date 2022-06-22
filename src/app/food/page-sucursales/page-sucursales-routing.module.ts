import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageSucursalesPage } from './page-sucursales.page';

const routes: Routes = [
  {
    path: '',
    component: PageSucursalesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageSucursalesPageRoutingModule {}
