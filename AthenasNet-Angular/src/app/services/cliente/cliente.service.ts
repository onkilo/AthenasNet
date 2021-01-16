import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  baseUrl: string = 'http://localhost:50419/api/Cliente';

  constructor(private htpp: HttpClient) { }

  getClientes(nombre: string = '') {
    return this.htpp.get(this.baseUrl + '?Nombre=' + nombre)
  }
}
