import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interfaces';
import { Equipo } from '../interfaces/equipo.interfaces';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

    info: InfoPagina = {};
    cargada = false;
    equipo: any[] = [];

    constructor( private http: HttpClient) {
        // console.log('Info pagina cargada');
        this.cargarInfo();
        this.cargarEquipo();
    }

    private cargarInfo() {
        // Leer archivo JSON
        this.http.get('assets/data/data-pagina.json')
        .subscribe( (resp: InfoPagina) => {
            this.cargada = true;
            this.info = resp;
        });
    }

    private cargarEquipo() {
        this.http.get('https://angular-html-f8d93.firebaseio.com/equipo.json')
            .subscribe( (resp: any[]) => {
                this.equipo = resp;
                console.log(resp);
            });
    }
}
