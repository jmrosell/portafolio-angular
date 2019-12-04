import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor( private http: HttpClient) {
    this.cargarProductos();
   }

  private cargarProductos() {

    return new Promise( ( resolve, reject ) => {
      this.http.get('https://angular-html-f8d93.firebaseio.com/productos_idx.json')
        .subscribe( (resp: Producto[]) => {
          // console.log(resp);
          this.productos = resp;
          this.cargando = false;
          resolve();
        });
    });
  }

  getProductos( id: string ){
    return this.http.get(`https://angular-html-f8d93.firebaseio.com/productos/${ id }.json`);
  }

  buscarProducto( termino: string) {
    if ( this.productos.length === 0) {
      this.cargarProductos().then( () => {
        this.filtrarProductos( termino );
      });
    } else {
      this.filtrarProductos( termino );
    }
  }

  private filtrarProductos( termino: string ) {
    this.productosFiltrado = [];
    this.productos.forEach( prod => {
      const tituloLower = prod.titulo.toLowerCase();
      const categoriaLower = prod.categoria.toLowerCase();
      if ( categoriaLower.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0) {
        // console.log(tituloLower + '  ' + categoriaLower);
        this.productosFiltrado.push(prod);
      }
    });
    // console.log(this.productosFiltrado);
  }
}
