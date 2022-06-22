import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Auth } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class LocalSessionService {

  private isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private params = {
    recordarme: 'KEY_SESSION_RECORDARME',
    token: 'KEY_SESSION_TOKEN',
    usuario: 'KEY_SESSION_USUARIO'
  }

  constructor() {
    this.isSessionStorage();
  }

  /**
   * Validar si existe una sesion creada.
   */
  isSessionStorage(): void {
    const recordarme = window.localStorage.getItem(this.params.recordarme);
    if (recordarme === 'true') {
      this.isLoggedIn.next(true);
    }
  }

  /**
   * Alerta para notificar algun evento en la sesion.
   * 
   * @returns Observable<boolean>
   */
  get isLoggedIn$(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }

  /**
   * Permite guardar la sesion del usuario
   * 
   * @param datos Token y datos del usuario
   * @param recordarme Se recordara la sesion del usuario.
   */
  saveSession(datos: Auth, recordarme: boolean): void {
    window.localStorage.setItem(this.params.recordarme, (recordarme) ? 'true' : 'false');
    if (recordarme) {
      window.localStorage.setItem(this.params.token, JSON.stringify(datos.token));
      window.localStorage.setItem(this.params.usuario, JSON.stringify(datos.usuario));
    } else {
      window.sessionStorage.setItem(this.params.token, JSON.stringify(datos.token));
      window.sessionStorage.setItem(this.params.usuario, JSON.stringify(datos.usuario));
    }
    this.isLoggedIn.next(true);
  }

  /**
   * Obtener los datos del usuario.
   * @returns token y datos del usuario
   */
  getSession(): Auth {
    var session = {
      token: '',
      usuario: {
        nombres: '',
        apellidos: '',
        telefono: ''
      }
    };

    const recordarme = window.localStorage.getItem(this.params.recordarme);

    if (recordarme === 'true') {
      session.token = JSON.parse(window.localStorage.getItem(this.params.token));
      session.usuario = JSON.parse(window.localStorage.getItem(this.params.usuario));
    } else {
      session.token = JSON.parse(window.sessionStorage.getItem(this.params.token));
      session.usuario = JSON.parse(window.sessionStorage.getItem(this.params.usuario));
    }

    return session;
  }

  /**
   * Eliminar la sesion del usuario.
   */
  clearSession(): void {
    const recordarme = window.localStorage.getItem(this.params.recordarme);
    if (recordarme === 'true') {
      window.localStorage.removeItem(this.params.token);
      window.localStorage.removeItem(this.params.usuario);
    } else {
      window.sessionStorage.removeItem(this.params.token);
      window.sessionStorage.removeItem(this.params.usuario);
    }
    window.localStorage.removeItem(this.params.recordarme);
    window.localStorage.clear();
    this.isLoggedIn.next(false);
  }
}
