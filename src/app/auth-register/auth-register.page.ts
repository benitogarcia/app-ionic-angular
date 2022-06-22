import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Registrar } from '../models/registrar.model';
import { CustomValidators } from '../providers/custom-validators';
import { AuthService } from '../services/auth.service';
import { PublicKeyApp } from '../config/constantes';
import * as JsEncryptModule from 'jsencrypt';

@Component({
  selector: 'app-auth-register',
  templateUrl: './auth-register.page.html',
  styleUrls: ['./auth-register.page.scss'],
})
export class AuthRegisterPage implements OnInit {

  formRegistrar: FormGroup;
  datos: Registrar;
  private valids = [
    Validators.required,
    Validators.pattern("[a-zA-ZÀ-ÿ ]{3,25}")
  ];
  nombreInvalid: boolean = false;
  apelliInvalid: boolean = false;
  isSubmit: boolean = false;
  jsencrypt: any;

  constructor(private servAuth: AuthService, private router: Router, private _alert: AlertController) {
    this.jsencrypt = new JsEncryptModule.JSEncrypt();
    this.jsencrypt.setPublicKey(PublicKeyApp);
  }

  ngOnInit() {
    this.initForm();
  }

  get f() {
    return this.formRegistrar.controls;
  }

  initForm(): void {
    this.formRegistrar = new FormGroup({
      nombres: new FormControl('', this.valids),
      apellidos: new FormControl('', this.valids),
      correo: new FormControl('', [Validators.required, Validators.email]),
      telefono: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10,10}')]),
      contrasena: new FormControl('', [Validators.required, Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{6,12}')]),
      confContrasena: new FormControl('', [Validators.required, Validators.minLength(3)]),
    },
      CustomValidators.mustMatch('contrasena', 'confContrasena')
    );
  }

  registrar(): void {

    this.formRegistrar.markAllAsTouched();
    if (this.formRegistrar.valid) {
      this.nombreInvalid = false;
      this.apelliInvalid = false;
      const nom = this.formRegistrar.get('nombres').value;
      const ape = this.formRegistrar.get('apellidos').value;

      if (nom.trim() === "") {
        this.nombreInvalid = true;
        this.formRegistrar.get('nombres').setValue('');
      } else if (ape.trim() === "") {
        this.apelliInvalid = true;
        this.formRegistrar.get('apellidos').setValue('');
      } else {
        this.isSubmit = true;
        this.datos = {
          nombres: this.formRegistrar.get('nombres').value,
          apellidos: this.formRegistrar.get('apellidos').value,
          correo: this.formRegistrar.get('correo').value,
          telefono: this.formRegistrar.get('telefono').value,
          contrasena: this.formRegistrar.get('contrasena').value
        };
        this.datos.contrasena = this.jsencrypt.encrypt(this.datos.contrasena);

        this.servAuth.registrar(this.datos).subscribe(
          (value: any) => {
            this.isSubmit = false;
            this.router.navigate(["/"]);
          },
          (error: any) => {
            this.isSubmit = false;
            console.log("<<< err >>>");
            console.log(error);
            if (error.status == 400 || error.status == 500) {
              this.presentAlertConfirmError(error.error.error);
            } else {
              this.presentAlertConfirmError("Ocurrio un error inesperado, intentelo mas tarde.");
            }
          }
        );
      }

    }
  }

  async presentAlertConfirmError(message: string) {
    const alert = await this._alert.create({
      cssClass: 'my-custom-class',
      header: 'ERROR AL REGISTRO!',
      message: message,
      buttons: ['Aceptar']
    });
    await alert.present();
  }

}
