import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Sucursal } from 'src/app/models/sucursal.model';
import { SucursalService } from 'src/app/services/sucursal.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-page-sucursales',
  templateUrl: './page-sucursales.page.html',
  styleUrls: ['./page-sucursales.page.scss'],
})
export class PageSucursalesPage implements OnInit {

  pathDomain = environment.urlDomain;

  subscGetSucursales: Subscription;
  sucursales: Sucursal[] = [];

  constructor(private httpSucursal: SucursalService, private toastController: ToastController) { }

  ngOnInit() {
    this.subscGetSucursales = this.httpSucursal.getSucursales().subscribe(
      (value: Sucursal[]) => {
        if (value == null || value.length === 0 ) {
          this.showAlertToast('No se encontró ninguna sucursal disponible.')
        } else {
          this.sucursales = value;
        }
      },
      (error: any) => {
        console.log("<<< error >>>");
        console.log(error);
      }
    )

  }

  async showAlertToast(msg: string) {
    const toast = await this.toastController.create({
      color: 'dark',
      duration: 2000,
      position: 'middle',
      message: msg
    });
    await toast.present();
  }
}