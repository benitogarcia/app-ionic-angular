import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalSessionService } from '../services/local-session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationAuthenticationGuard implements CanActivate {

  isLoggedIn$ = this._serLocalSession.isLoggedIn$;

  constructor(private _serLocalSession: LocalSessionService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.isLoggedIn$.subscribe(
      (value: boolean) => {
        console.log("Value:" + value);
        if (!value) {
          this.router.navigate(['/auth/login']);
        }
      }
    );

    return true;
  }

}
