import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIs } from '../config/endpoints';
import { FormatString } from '../config/utileria';
import { ProductoCart } from '../models/producto-cart.model';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) { }

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(APIs.producto.getProductos);
  }

  getProductosCategoria(categoria: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(FormatString(APIs.producto.getProductosCategoria, categoria));
  }
  getProductoId(producto: string): Observable<ProductoCart> {
    return this.http.get<ProductoCart>(FormatString(APIs.producto.getProductoId, producto));
  }
  
}
