import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartShopping } from '../models/cart-shopping.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private KEY_STORE_CART = "SHOPPING_CART";
  private productos: CartShopping[] = (localStorage.getItem(this.KEY_STORE_CART)) ?
    JSON.parse(localStorage.getItem(this.KEY_STORE_CART))  : [];
  private subscripcion: BehaviorSubject<CartShopping[]> = new BehaviorSubject<CartShopping[]>(this.productos);
  
  constructor() {
  }

  get productos$(): Observable<CartShopping[]> {
    return this.subscripcion.asObservable();
  }

  addCart(prodCart: CartShopping): boolean {
    this.productos.push(prodCart);
    localStorage.setItem(this.KEY_STORE_CART, JSON.stringify(this.productos));
    this.subscripcion.next(this.productos);
    return true;
  }

  removerCart(prodCart: CartShopping): void {
    this.productos = this.productos.filter(
      (prod) => {
        return prod.codigo !== prodCart.codigo;
      }
    );
    localStorage.setItem(this.KEY_STORE_CART, JSON.stringify(this.productos));
    this.subscripcion.next(this.productos);
  }

  removeCartAll(): void {
    this.productos = [];
    localStorage.setItem(this.KEY_STORE_CART, "[]");
    this.subscripcion.next([]);

  }

}
