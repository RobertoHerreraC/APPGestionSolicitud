import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseApi } from '../interfaces/response-api';
import { environment } from '../../environment/environment';

@Injectable({providedIn: 'root'})
export class TipoEntregaService {
    private urlApi:string = environment.endpoint + "CatalogoFormaEntrega/";
    
    constructor(private http: HttpClient) {    }
    
  
  
    lista():Observable<ResponseApi>{
      return this.http.get<ResponseApi>(`${this.urlApi}Lista`)
    }
}