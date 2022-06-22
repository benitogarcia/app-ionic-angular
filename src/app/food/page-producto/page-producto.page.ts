import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CartShopping } from 'src/app/models/cart-shopping.model';
import { ComplObligatorio } from 'src/app/models/compl-obligatorio.model';
import { ComplOpcional } from 'src/app/models/compl-opcional.model';
import { Obligatorio, ProductoCart } from 'src/app/models/producto-cart.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductoService } from 'src/app/services/producto.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-page-producto',
  templateUrl: './page-producto.page.html',
  styleUrls: ['./page-producto.page.scss'],
})
export class PageProductoPage implements OnInit {

  idProducto: string;
  producto: ProductoCart;
  pathDomain = environment.urlDomain;
  numOrdenes: number = 1;
  total: number = 0;
  form: FormGroup;
  requiredcom = [];
  opcionalcom: ComplOpcional[] = [];
  shopping: CartShopping;

  constructor(private servProducto: ProductoService, private route: ActivatedRoute,
    private alertController: AlertController, private servCart: CartService) {
    this.idProducto = this.route.snapshot.paramMap.get('idproducto');
    this.producto = new ProductoCart();
  }

  ngOnInit() {

    this.servProducto.getProductoId(this.idProducto).subscribe(
      (value: ProductoCart) => {
        console.log(value);
        if (value !== null) {
          this.producto = value;
          this.total = this.producto.precio;
          this.producto.complementoObligatorio = (JSON.parse(value.complementoObligatorio.toString()) === 1);
          this.producto.complementoOpcional = (JSON.parse(value.complementoOpcional.toString()) === 1);

        }
      },
      (error: any) => {
        console.log("<<< error >>>");
        console.log(error);
      }
    );

    this.requiredcom = (this.producto.complementoObligatorio) ? [Validators.required] : [];

    this.form = new FormGroup({
      especificacion: new FormControl(''),
      complemento_obligatorio: new FormControl('', this.requiredcom)
    });

  }

  async btnAnnadir() {

    const guisado = (this.producto.complementoObligatorio === true) ? this.form.get('complemento_obligatorio').value : '';

    if ((this.producto.complementoObligatorio === true && guisado != '') || !this.producto.complementoObligatorio) {
      const msg = "Ordenes: " + this.numOrdenes + "<br>" +
        "Total: $" + this.total;

      const alert = await this.alertController.create({
        header: 'Agregar Orden?',
        message: msg,
        buttons: [
          {
            text: 'Cancelar',
          },
          {
            text: 'Aceptar',
            cssClass: 'warning',
            handler: () => { this.annadirCarrito(); }
          }
        ],
      });

      await alert.present();
    } else {
      this.presentAlert('Error!', 'Debe seleccionar su complemento.');
    }
  }

  btnDecrementar(): void {
    if (this.numOrdenes > 1) {
      this.numOrdenes--;
      this.total = Number(this.total) - Number(this.producto.precio);
      console.log('ORDENES:' + this.numOrdenes + ', total:' + this.total + 'PRECIO:' + this.producto.precio);
    }
  }

  btnAumentar(): void {
    this.numOrdenes++;
    this.total = Number(this.total) + Number(this.producto.precio);
    console.log('ORDENES:' + this.numOrdenes + ', total:' + this.total);
  }

  changeComplOpcional(event: any, opc: any): void {

    if (event.detail.checked) {
      this.opcionalcom.push(event.detail.value);
      this.total += opc.precio;
    } else {
      this.opcionalcom = this.opcionalcom.filter(comp => { return comp.id !== event.detail.value });
      this.total -= opc.precio;
    }
  }

  annadirCarrito() {

    var ahora = new Date();
    var c_obli = this.form.get('complemento_obligatorio').value;
    var d_obli = "";
    if (this.producto.complementoObligatorio) {
      d_obli = this.producto.complObligatorio.find(
        (value) => {
          return value.id === c_obli;
        }
      ).complemento;
    }

    this.shopping = {
      id: this.producto.id,
      nombre: this.producto.nombre,
      imagen: this.producto.imagen,
      cantidad: this.producto.cantidad,
      ordenes: this.numOrdenes,
      precio: this.producto.precio,
      total: this.total,
      codigo: ahora.getTime(),
      c_obligatorio: c_obli,
      d_obligatorio: d_obli,
      c_opcional: this.opcionalcom
    };

    if (this.servCart.addCart(this.shopping)) {
      this.presentAlert('Proceso exitoso!', 'Se agrego el producto.');
    } else {
      this.presentAlert('Error!', 'No se agrego el producto.');
    }

  }

  async presentAlert(header: string, subHeader: string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      buttons: ['OK']
    });
    await alert.present();
  }

  buscarComplObligatorio(idComplObli: string): ComplObligatorio {
    return this.producto.complObligatorio.find(
      prod => { return prod.id.toString() === idComplObli; }
    );
  }

}
