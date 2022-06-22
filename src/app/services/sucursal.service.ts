import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIs } from '../config/endpoints';
import { Sucursal } from '../models/sucursal.model';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {

  constructor(private http: HttpClient) { }

  getSucursales(): Observable<Sucursal[]> {
    return this.http.get<Sucursal[]>(APIs.sucursal.getSucursales);
  }
}
