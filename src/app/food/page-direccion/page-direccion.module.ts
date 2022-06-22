import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageDireccionPageRoutingModule } from './page-direccion-routing.module';

import { PageDireccionPage } from './page-direccion.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    PageDireccionPageRoutingModule
  ],
  declarations: [PageDireccionPage]
})
export class PageDireccionPageModule {}
