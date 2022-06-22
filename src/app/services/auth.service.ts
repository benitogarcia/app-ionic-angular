import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIs } from '../config/endpoints';
import { Auth } from '../models/auth.model';
import { Login } from '../models/login.model';
import { Registrar } from '../models/registrar.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  registrar(data: Registrar): Observable<any> {
    return this.http.post<any>(APIs.auth.registrar, data);
  }

  login(credenciales: Login): Observable<Auth> {
    return this.http.post<Auth>(APIs.auth.login, credenciales);
  }

}
