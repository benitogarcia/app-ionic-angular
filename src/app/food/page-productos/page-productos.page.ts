import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Producto } from 'src/app/models/producto.model';
import { ProductoService } from 'src/app/services/producto.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-page-productos',
  templateUrl: './page-productos.page.html',
  styleUrls: ['./page-productos.page.scss'],
})
export class PageProductosPage implements OnInit, OnDestroy {

  pathDomain= environment.urlDomain;
  idcategoria: string;
  subscGetProductosCategoria: Subscription;
  productos: Producto[] = [];
  productosFilter: Producto[] = [];

  constructor(private servProducto: ProductoService, private route: ActivatedRoute) {
    this.idcategoria = this.route.snapshot.paramMap.get('idcategoria');
  }

  ngOnInit() {
    this.subscGetProductosCategoria = this.servProducto.getProductosCategoria(this.idcategoria).subscribe(
      (data: Producto[]) => {
        this.productos = data;
        this.productosFilter = data;
      },
      (error: any) => {

      }
    );
  }

  onSearchChange(event: any): void {
    if (event.detail.value || event.detail.value !== "") {
      this.productosFilter = [...this.productos].filter(
        (value) => {
          return value.nombre.toLowerCase().includes(event.detail.value.toLowerCase());
        }
      )
    } else {
      this.productosFilter = this.productos;
    }
  }

  ngOnDestroy(): void {
    this.subscGetProductosCategoria.unsubscribe();
  }

}
