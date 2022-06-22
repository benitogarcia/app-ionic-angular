import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Login } from '../models/login.model';
import { Auth } from '../models/auth.model';
import { PublicKeyApp } from '../config/constantes';
import * as JsEncryptModule from 'jsencrypt';
import { AuthService } from '../services/auth.service';
import { LocalSessionService } from '../services/local-session.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.page.html',
  styleUrls: ['./auth-login.page.scss'],
})
export class AuthLoginPage implements OnInit, OnDestroy {

  formLogin: FormGroup;
  auth: Login;
  isSubmit: boolean = false;
  jsencrypt: any;
  subscripciones: Subscription[] = [];
  subsCount: number = 0;

  constructor(private httpAuth: AuthService, private _alert: AlertController,
    private servSession: LocalSessionService, private router: Router) {
    this.jsencrypt = new JsEncryptModule.JSEncrypt();
    this.jsencrypt.setPublicKey(PublicKeyApp);
  }

  ngOnDestroy(): void {
    this.subscripciones.forEach(subsc => {
      subsc.unsubscribe();
    });
  }

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.formLogin = new FormGroup({
      correo: new FormControl('', [Validators.required, Validators.email]),
      recordarme: new FormControl(false),
      contrasena: new FormControl('', [Validators.required, Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{6,12}')]),
    });
  }

  get f() {
    return this.formLogin.controls;
  }

  onSubmit(): void {

    this.formLogin.markAllAsTouched();

    if (this.formLogin.valid) {

      this.isSubmit = true;
      this.auth = { ...this.formLogin.value };
      this.auth.contrasena = this.jsencrypt.encrypt(this.auth.contrasena);

      this.subscripciones[this.subsCount] = this.httpAuth.login(this.auth).subscribe(
        (value: Auth) => {
          this.isSubmit = false;
          this.servSession.saveSession(value, this.formLogin.get('recordarme').value);
          this.formLogin.get('correo').setValue('');
          this.formLogin.get('contrasena').setValue('');
          this.router.navigate(["/"]);
        },
        (error: any) => {
          this.isSubmit = false;
          if (error.status == 400 || error.status == 500) {
            this.presentAlertConfirmError(error.error.error);
          } else {
            this.presentAlertConfirmError("Ocurrio un error inesperado, intentelo mas tarde.");
          }
        },
        () => {
          this.isSubmit = false;
          this.subsCount++;
        }
      );
    }

  }


  async presentAlertConfirmError(message: string) {
    const alert = await this._alert.create({
      cssClass: 'my-custom-class',
      header: 'ERROR AL INICAR SESION!',
      message: message,
      buttons: ['Aceptar']
    });
    await alert.present();
  }
}
