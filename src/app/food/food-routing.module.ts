import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./page-sucursales/page-sucursales.module').then( m => m.PageSucursalesPageModule)
  },
  {
    path: 'sucursal/:idsucursal',
    loadChildren: () => import('./page-categorias/page-categorias.module').then( m => m.PageCategoriasPageModule)
  },
  {
    path: 'sucursal/:idsucursal/categoria/:idcategoria',
    loadChildren: () => import('./page-productos/page-productos.module').then( m => m.PageProductosPageModule)
  },
  {
    path: 'sucursal/:idsucursal/categoria/:idcategoria/producto/:idproducto',
    loadChildren: () => import('./page-producto/page-producto.module').then( m => m.PageProductoPageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then( m => m.CartPageModule)
  },
  {
    path: 'direccion',
    loadChildren: () => import('./page-direccion/page-direccion.module').then( m => m.PageDireccionPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoodPageRoutingModule {}
