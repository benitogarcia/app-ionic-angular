import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIs } from '../config/endpoints';
import { FormatString } from '../config/utileria';
import { Categoria } from '../models/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient) { }

  getCategoriaSursal(id: string): Observable<Categoria[]> {
    console.log("id:" + id);
    return this.http.get<Categoria[]>(FormatString(APIs.categoria.getCategoriasSucursal, id.toString()));
  }

}
