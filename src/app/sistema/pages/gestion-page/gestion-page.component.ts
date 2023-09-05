import { Component, OnInit } from '@angular/core';
import { SolicitudAlta } from 'src/app/interfaces/solicitud-alta';
import { SolicitudService } from 'src/app/service/solicitud.service';

@Component({
    selector: 'app-gestion-page',
    templateUrl: './gestion-page.component.html',
    styleUrls: ['./gestion-page.component.css']
})

export class GestionPageComponent implements OnInit {
    solicitudes : SolicitudAlta[] = [];

    constructor(private _solicitudServicio: SolicitudService){  }

    ngOnInit(): void {
        this._solicitudServicio.obtenerSolicitudes().subscribe({
            next:(resp) =>{
                if(resp.status) {
                    this.solicitudes = resp.value;
                    console.log(this.solicitudes);
                }
            },
            error: (e) => {}
        });
    }
}