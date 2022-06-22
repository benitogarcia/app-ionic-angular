import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageProductoPageRoutingModule } from './page-producto-routing.module';

import { PageProductoPage } from './page-producto.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    PageProductoPageRoutingModule,
  ],
  declarations: [PageProductoPage]
})
export class PageProductoPageModule {}
