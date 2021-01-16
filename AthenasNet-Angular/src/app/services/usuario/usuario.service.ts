import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  baseUrl: string = 'http://localhost:50419/api/Trabajador';

  constructor(private http: HttpClient) { }

  login(datoUsuario: any): Observable<any> {

    return this.http.post(this.baseUrl + '/Login', datoUsuario);
    
  }
}
