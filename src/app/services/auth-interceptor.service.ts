import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LocalSessionService } from './local-session.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private session: LocalSessionService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add auth header with jwt if account is logged in and request is to the api url
    const account = this.session.getSession();
    const isLoggedIn = account?.token;
    //const isApiUrl = request.url.startsWith(environment.apiUrl);
    if (isLoggedIn) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${account.token}` }
      });
    }
    
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {

        if (err.status === 401) {
          this.session.clearSession();
          // window.location.href = "/";
          this.router.navigate(['/']);
        }

        return throwError(err);

      })
    );
    

    //return next.handle(request);
  }
}
