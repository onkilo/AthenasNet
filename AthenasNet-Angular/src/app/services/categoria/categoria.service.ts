import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  baseUrl: string = 'http://localhost:50419/api/Categoria';
  constructor(private htpp: HttpClient) { }

  getCategoria(descripcion: string = '') {
    return this.htpp.get(this.baseUrl + '?Descripcion=' + descripcion)
  }
}
