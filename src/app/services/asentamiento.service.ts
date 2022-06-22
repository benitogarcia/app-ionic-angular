import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIs } from '../config/endpoints';
import { FormatString } from '../config/utileria';
import { Asentamiento, Estado, Municipio } from '../models/asentamiento.model';

@Injectable({
  providedIn: 'root'
})
export class AsentamientoService {

  constructor(private http: HttpClient) { }

  getEstados(): Observable<Estado[]> {
    return this.http.get<Estado[]>(APIs.asentamiento.getEstados);
  }

  getMunicipios(): Observable<Municipio[]> {
    return this.http.get<Municipio[]>(APIs.asentamiento.getMunicipios);
  }

  getMunicipiosEstado(id: number): Observable<Municipio[]> {
    return this.http.get<Municipio[]>(FormatString(APIs.asentamiento.getMunicipiosEstado, id.toString()));
  }

  getAsentamientosMunicipio(id: number): Observable<Asentamiento[]> {
    return this.http.get<Asentamiento[]>(FormatString(APIs.asentamiento.getAsentamientosMunicipio, id.toString()));
  }

  getAsentamientosCP(cp: string): Observable<Asentamiento[]> {
    return this.http.get<Asentamiento[]>(FormatString(APIs.asentamiento.getAsentamientosCP, cp));
  }

}
