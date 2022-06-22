import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { CartShopping } from 'src/app/models/cart-shopping.model';
import { Direccion } from 'src/app/models/direccion.model';
import { CartService } from 'src/app/services/cart.service';
import { DireccionService } from 'src/app/services/direccion.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  pathDomain = environment.urlDomain;
  productos$ = this.servCart.productos$;
  total: number;
  private producto: CartShopping;
  /*** datos de envio ***/
  mdlFormaPago: boolean;
  direcciones: Direccion[];
  formaPago: string;
  formasPagos: any[];
  pagaraTotal: number;
  form: FormGroup;
  /* forma de pago */
  srcImgCaptura: string;
  /* forma de entrega */
  formaEntrega: string;
  formasEntregas: any[];



  constructor(private servCart: CartService, private alertController: AlertController,
    private router: Router, private serviceDireccion: DireccionService, private toastController: ToastController) {
    this.mdlFormaPago = true;
    this.total = 0;
    this.pagaraTotal = 0;
    this.direcciones = [];
    this.formasPagos = [
      { clave: "efectivo", descripcion: "Efectivo" },
      { clave: "transferencia", descripcion: "Transferencia" },
    ];
    this.formaPago = this.formasPagos[0].clave;
    this.formasEntregas = [{clave: "tienda", descripcion: "Tienda"},{clave: "domicilio", descripcion: "Domicilio"}];
    this.formaEntrega = this.formasEntregas[0].clave;
  }

  ngOnInit() {
    this.calcularTotal();
    this.cargarDirecciones();
    this.initForm();
  }

  initForm(): void {
    this.form = new FormGroup({
      formapago: new FormControl('', [Validators.required]),
      formaentrega: new FormControl('', [Validators.required]),
      pagoIngresado: new FormControl('')
    });
  }

  calcularTotal() {
    this.servCart.productos$.subscribe(
      prop => {
        if (prop.length === 0) {
          this.router.navigate(["/food"]);
        }
        this.total = prop.reduce((subtotal, pro) => subtotal += Number(pro.total), 0);
        this.pagaraTotal = this.total;
      }
    );
  }

  cargarDirecciones(): void {
    this.serviceDireccion.obtenerTodos().subscribe(
      (value: Direccion[]) => {
        this.direcciones = value;
      },
      (error: any) => {
        console.log("<<< error cargarDirecciones >>>");
        console.log(error);
      }
    );
  }

  removeItemProd(prod: CartShopping): void {
    this.producto = prod;
    this.confirmActtion("Decea eliminar el producto: " + prod.nombre.toLowerCase() + "?", this.itemProducto, prod);
  }

  removeItemsProd(): void {
    this.confirmActtion("Decea eliminar todos productos? ", this.itemsProductos, null);
  }

  async confirmActtion(mensaje: string, funcion: any, removeItemsProd?: CartShopping) {
    const alert = await this.alertController.create({
      header: 'Confirme por favor!',
      message: mensaje,
      buttons: [
        {
          text: 'Cancelar',
        },
        {
          text: 'Aceptar',
          cssClass: 'warning',
          handler: () => {
            if (removeItemsProd) {
              this.itemProducto()
            } else {
              this.itemsProductos();
            }
          }
        }
      ],
    });

    await alert.present();
  }

  itemProducto() {
    this.servCart.removerCart(this.producto);
  }

  itemsProductos() {
    this.servCart.removeCartAll();
    this.router.navigate(['/food']);
  }

  /** inicio start */
  btnCancelarFormSend(): void {
    this.mdlFormaPago = false;
  }

  rdFormaPagoChangeValue(event: any): void {

    this.formaPago = event.detail.value.toString();

    if (this.formaPago == this.formasPagos[0].clave) {

    } else if (this.formaPago == this.formasPagos[1].clave) {

    } else if (this.formaPago == "pagoelectronico") {

    }
  }

  inPagareChangeValue(e: any): void {

    const pgrTotal = e.detail.value;

    if (pgrTotal && pgrTotal != "") {
      this.pagaraTotal = Number(pgrTotal);
    } else {
      this.pagaraTotal = 0;
    }

  }

  fileUpload(event) {
    this.toBase64(event.srcElement.files[0]).then(
      (value: any) => {
        this.srcImgCaptura = value;        
      }
    ).catch(
      (rasean: any) => {

      }
    );
    
  }

  toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

  onClick() {
    document.getElementById('file-input').click();
  }

  rdDireccionChangeValue(e: any): void{
    this.formaEntrega = e.detail.value;
  }

  onSubmitForm(): void {
    this.form.markAllAsTouched();

    if (this.form.valid) {

      /* forma de pago efectivo */
      if (this.formaPago == this.formasPagos[0].clave) {
        const pagoIngresado = this.form.get('pagoIngresado').value;
        if(!pagoIngresado)
          this.showToast('danger', 'Ingrese una cantidad de pago valida.');
        
      }
      /* forma de pago transferencia */
      if (this.formaPago == this.formasPagos[1].clave) {
        
        
      }
      
    } else {
      this.showToast('danger', 'Completo el formulario.');
    }
  }

  async showToast(color: string, message: string) {
    const toast = await this.toastController.create({
      color: color,
      duration: 2000,
      message: message,
      position: "middle"
    });

    await toast.present();
  }

  /** fin start */

}
