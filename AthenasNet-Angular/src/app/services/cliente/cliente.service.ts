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

  postClientes(cliente: any) {
    return this.htpp.post(this.baseUrl, cliente);
  }

  putClientes(id: number, cliente: any) {
    return this.htpp.put(`${this.baseUrl}/${id}`, cliente);
  }

  deleteCliente(id: number) {
    return this.htpp.delete(this.baseUrl + '/' + id);
  }
}
