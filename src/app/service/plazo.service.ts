import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseApi } from '../interfaces/response-api';
import { environment } from '../../environment/environment';

@Injectable({providedIn: 'root'})
export class PlazoService {
    private urlApi:string = environment.endpoint + "Plazo/";
    
    constructor(private http: HttpClient) {    }
    
  
  
    obtenerPlazo():Observable<ResponseApi>{
      return this.http.get<ResponseApi>(`${this.urlApi}Obtener`)
    }
}