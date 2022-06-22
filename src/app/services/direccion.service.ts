import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIs } from '../config/endpoints';
import { FormatString } from '../config/utileria';
import { Direccion } from '../models/direccion.model';

@Injectable({
  providedIn: 'root'
})
export class DireccionService {

  constructor(private http: HttpClient) { }

  crear(direccion: Direccion): Observable<any> {
    return this.http.post<any>(APIs.direccion.api, direccion);
  }

  obtenerTodos(): Observable<Direccion[]> {
    return this.http.get<Direccion[]>(APIs.direccion.api);
  }

  modificar(d: Direccion): Observable<any> {
    return this.http.put<any>(APIs.direccion.api, d);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete<any>(FormatString(APIs.direccion.delete, id.toString()));
  }

}
