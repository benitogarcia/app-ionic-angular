import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from './services/cart.service';
import { LocalSessionService } from './services/local-session.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnDestroy, OnInit {

  isLoggedIn: boolean = false;// = this.session.isLoggedIn$;
  subscIsLoggedIn: Subscription;
  cart$ = this.cart.productos$;

  public appPages = [
    { title: 'Inicio', url: '/food', icon: 'home' },
    { title: 'Dirección', url: '/food/direccion', icon: 'compass' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
    { title: '', url: '/folder/Spam', icon: 'warning' },
  ];
  /**
   * <ion-icon name="exit-outline"></ion-icon>
   * <ion-icon name="compass-outline"></ion-icon>
  */
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(private session: LocalSessionService, private router: Router,
    private cart: CartService) { }

  ngOnInit(): void {
    this.subscIsLoggedIn = this.session.isLoggedIn$.subscribe(
      (value: boolean) => {
        this.isLoggedIn = value;
      }
    )
  }

  ngOnDestroy(): void {
    this.subscIsLoggedIn.unsubscribe();
  }

  cerrarSession(): void {
    this.session.clearSession();
  }
}
