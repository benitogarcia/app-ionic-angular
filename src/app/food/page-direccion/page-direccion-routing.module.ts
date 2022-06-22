import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageDireccionPage } from './page-direccion.page';

const routes: Routes = [
  {
    path: '',
    component: PageDireccionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageDireccionPageRoutingModule {}
