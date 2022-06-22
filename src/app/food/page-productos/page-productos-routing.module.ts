import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageProductosPage } from './page-productos.page';

const routes: Routes = [
  {
    path: '',
    component: PageProductosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageProductosPageRoutingModule {}
