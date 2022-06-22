import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageProductosPageRoutingModule } from './page-productos-routing.module';

import { PageProductosPage } from './page-productos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageProductosPageRoutingModule
  ],
  declarations: [PageProductosPage]
})
export class PageProductosPageModule {}
