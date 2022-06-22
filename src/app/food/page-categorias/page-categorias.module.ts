import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageCategoriasPageRoutingModule } from './page-categorias-routing.module';

import { PageCategoriasPage } from './page-categorias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageCategoriasPageRoutingModule
  ],
  declarations: [PageCategoriasPage]
})
export class PageCategoriasPageModule {}
