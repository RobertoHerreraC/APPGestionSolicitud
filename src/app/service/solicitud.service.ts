import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SolicitudAlta } from '../interfaces/solicitud-alta';
import { environment } from 'src/environment/environment';
import { Observable } from 'rxjs';
import { ResponseApi } from '../interfaces/response-api';

@Injectable({providedIn: 'root'})
export class SolicitudService {
    private urlApi:string = environment.endpoint + "Solicitud/";
    
    constructor(private http: HttpClient) { }
    
    alta(solicitud: SolicitudAlta) {
      return this.http.post<ResponseApi>(`${this.urlApi}Guardar`,solicitud);
    }

    obtenerSolicitudes(): Observable<ResponseApi> {
        return this.http.get<ResponseApi>(`${this.urlApi}Lista`);
      }

    getSolicitudIs(id:number){

    }

    updateSolicitud(solicitud: SolicitudAlta, id : number){

    }


}