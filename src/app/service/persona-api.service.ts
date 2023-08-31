import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseApi } from '../interfaces/response-api';
import { environment } from '../../environment/environment';

@Injectable({providedIn: 'root'})
export class PersonaApiService {
    private urlApi:string = environment.endpoint + "APIExterno/";
    
    constructor(private http: HttpClient) {    }
    
  
  
    validarDni(nroDocumento : string):Observable<ResponseApi>{
      return this.http.get<ResponseApi>(`${this.urlApi}${nroDocumento}`)
    }
}