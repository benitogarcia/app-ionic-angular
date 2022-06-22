import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Categoria } from 'src/app/models/categoria.model';
import { CategoriaService } from 'src/app/services/categoria.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-page-categorias',
  templateUrl: './page-categorias.page.html',
  styleUrls: ['./page-categorias.page.scss'],
})
export class PageCategoriasPage implements OnInit, OnDestroy {

  pathDomain = environment.urlDomain;
  subscCategoria: Subscription;
  idsucursal: string;
  categorias: Categoria[] = [];
  categoriasFilter: Categoria[] = [];


  constructor(private route: ActivatedRoute, private httpCategoria: CategoriaService,
    private toastController: ToastController) {
    this.idsucursal = this.route.snapshot.paramMap.get('idsucursal');
  }

  ngOnDestroy(): void {
    this.subscCategoria.unsubscribe();
  }

  ngOnInit() {
    this.subscCategoria = this.httpCategoria.getCategoriaSursal(this.idsucursal).subscribe(
      (value: Categoria[]) => {
        if (value === null || value.length === 0) {
          this.showAlertToast('No se encontraron categorías disponible.');
        }
        this.categorias = value;
        this.categoriasFilter = value;
      }
    );
  }

  onSearchChange(event: any): void {

    if (event.detail.value || event.detail.value !== "") {
      this.categoriasFilter = [...this.categorias].filter(
        (value) => {
          return value.nombre.toLowerCase().includes(event.detail.value.toLowerCase());
        }
      )
    } else {
      this.categoriasFilter = this.categorias;
    }

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
