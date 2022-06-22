import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageProductoPage } from './page-producto.page';

const routes: Routes = [
  {
    path: '',
    component: PageProductoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageProductoPageRoutingModule {}
