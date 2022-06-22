import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Asentamiento, Estado, Municipio } from 'src/app/models/asentamiento.model';
import { Direccion } from 'src/app/models/direccion.model';
import { AsentamientoService } from 'src/app/services/asentamiento.service';
import { DireccionService } from 'src/app/services/direccion.service';

@Component({
  selector: 'app-page-direccion',
  templateUrl: './page-direccion.page.html',
  styleUrls: ['./page-direccion.page.scss'],
})
export class PageDireccionPage implements OnInit, OnDestroy {

  isShowModal: boolean;
  estados: Estado[];
  SubscGetEstados: Subscription;
  formDireccion: FormGroup;
  direccion: Direccion;
  municipios: Municipio[];
  asentamientos: Asentamiento[];
  codigopostal: string;
  direcciones: Direccion[];
  crearDireccion: boolean;

  constructor(private servAsent: AsentamientoService, private servDire: DireccionService,
    private alertController: AlertController) {
    this.isShowModal = false;
    this.estados = [];
    this.direccion = new Direccion();
    this.municipios = [];
    this.asentamientos = [];
    this.direcciones = [];
    this.crearDireccion = true;
  }

  ngOnInit() {
    this.loadDirecciones();
    this.initFormDireccion();
    this.SubscGetEstados = this.servAsent.getEstados().subscribe(
      (success: Estado[]) => {
        this.estados = success;
      },
      (error: any) => {
        console.log("<<< error >>>");
        console.log(error);
      }
    )
  }

  ngOnDestroy(): void {
    this.SubscGetEstados.unsubscribe();
  }

  initFormDireccion(): void {
    this.formDireccion = new FormGroup(
      {
        idestado: new FormControl('', [Validators.required]),
        idmunicipio: new FormControl('', [Validators.required]),
        idasentamiento: new FormControl('', [Validators.required]),
        calle: new FormControl('', [Validators.required]),
        num_ext: new FormControl('', [Validators.required]),
        num_int: new FormControl('', [Validators.required]),
        calle_uno: new FormControl(''),
        calle_dos: new FormControl(''),
        referencia: new FormControl(''),
      }
    );
  }

  clearFormDireccion(): void {
    const inputs = ['idestado', 'idmunicipio', 'idasentamiento', 'calle', 'num_ext', 'num_int',
      'calle_uno', 'calle_dos', 'referencia'];
    for (let i = 0; i < inputs.length; i++) {
      this.formDireccion.get(inputs[i]).setValue('');
    }
    this.isShowModal = false;
  }

  btnCancelarFormDireccion(): void {
    this.isShowModal = false;
    this.direccion = new Direccion();
    this.clearFormDireccion();
  }

  btnOpenModal(): void {
    this.crearDireccion = true;
    this.isShowModal = true;
  }

  changeCodigoPostal(event: any): void {

    const cp = event.detail.value.toString() + "";
    console.log(cp);
    if (cp.length > 0 && (cp != null || cp != "")) {
      this.formDireccion.get('idestado').setValue('');
      this.formDireccion.get('idmunicipio').setValue('');
      this.formDireccion.get('idasentamiento').setValue('');
      this.servAsent.getAsentamientosCP(cp).subscribe(
        (success: Asentamiento[]) => {
          if (success.length > 0) {
            this.codigopostal = cp;
            this.asentamientos = [];
            this.asentamientos = success;
            this.formDireccion.get('idestado').setValue(success[0].idestado.toString());
            this.direccion.idestado = Number(success[0].idestado);
            this.direccion.idmunicipio = Number(success[0].idmunicipio);
          }
        },
        (error: any) => {
          console.log("<<< error changeCodigoPostal >>>");
          console.log(error);
        }
      );
    }
  }

  changeEstado(event: any): void {

    const estado = event.detail.value.toString() + "";
    if (estado && estado != "0") {
      this.httpChangeEstado(Number(event.detail.value));
    }
  }

  private httpChangeEstado(idestado: number): void {
    this.servAsent.getMunicipiosEstado(idestado).subscribe(
      (success: Municipio[]) => {
        this.municipios = success;
        if (this.direccion.idmunicipio) {
          this.formDireccion.get('idmunicipio').setValue(this.direccion.idmunicipio.toString());
        }
      },
      (error: any) => {
        console.log("<<< error changeEstado >>>");
        console.log(error);
      }
    );
  }

  changeMunicipio(event: any): void {
    const municipio = Number(event.detail.value);
    if (municipio && municipio > 0) {
      this.servAsent.getAsentamientosMunicipio(municipio).subscribe(
        (success: Asentamiento[]) => {
          this.asentamientos = success;
          const colonias = success.filter(
            (value: Asentamiento) => { return value.codigopostal === this.codigopostal; }
          )
          if (colonias.length > 0) {
            this.asentamientos = colonias;
          }
          if (this.direccion.idasentamiento) {
            this.formDireccion.get('idasentamiento').setValue(this.direccion.idasentamiento.toString());
          }
        },
        (error: any) => {
          console.log("<<< error changeMunicipio >>>");
          console.log(error);
        }
      );
    }
  }

  submitFormDireccion(): void {

    this.formDireccion.markAllAsTouched();

    if (this.formDireccion.valid) {
      if (this.crearDireccion) {
        this.direccion = { ...this.formDireccion.value };
        this.servDire.crear(this.direccion).subscribe(
          (value: any) => {
            this.loadDirecciones();
            this.clearFormDireccion();
          },
          (error: any) => {
            console.log("<<< error submitFormDireccion >>>");
            console.log(error);
          }
        );
      } else {
        const id = this.direccion.id;
        this.direccion = { ...this.formDireccion.value };
        this.direccion.id = id;
        this.servDire.modificar(this.direccion).subscribe(
          (value: any) => {
            this.loadDirecciones();
            this.clearFormDireccion();
          },
          (error: any) => {
            console.log("<<< error submitFormDireccion >>>");
            console.log(error);
          }
        );
      }
    }

  }

  loadDirecciones(): void {
    this.servDire.obtenerTodos().subscribe(
      (value: Direccion[]) => {
        this.direcciones = value;
      },
      (error: any) => {
        console.log("<<< error loadDirecciones >>>");
        console.log(error);
      }
    );
  }

  btnEditDireccion(d: Direccion): void {
    this.isShowModal = true;
    this.crearDireccion = false;
    this.direccion = d;
    this.formDireccion.get('idestado').setValue(d.idestado.toString());
    this.formDireccion.get('calle').setValue(d.calle.toString());
    this.formDireccion.get('num_ext').setValue(d.num_ext.toString());
    this.formDireccion.get('num_int').setValue(d.num_int.toString());
    this.formDireccion.get('calle_uno').setValue(d.calle_uno.toString());
    this.formDireccion.get('calle_dos').setValue(d.calle_dos.toString());
    this.formDireccion.get('referencia').setValue(d.referencia.toString());
    this.httpChangeEstado(d.idestado);
  }

  async btnEliminarDireccion(d: Direccion) {
    const alert = await this.alertController.create({
      header: 'Desea eliminar la dirección?',
      message: d.calle + ', #E:' + d.num_ext + ', #I:' + d.num_int + '.',
      buttons: [
        {text: 'Cancelar'}, 
        {
          text: 'Aceptar',
          handler: () => {
            this.servDire.eliminar(d.id).subscribe(
              (value: any) => {
                this.loadDirecciones();
                this.isShowModal = false;
              },
              (error: any) => {

              }
            );
          }
        }
      ],
    });

    await alert.present();
  }

}
