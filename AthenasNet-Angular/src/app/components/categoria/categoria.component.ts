import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  buscarForm = {
    Descripcion: ''
  }

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.listar();
  }

  listar(){
    this.categoriaService.getCategoria(this.buscarForm.Descripcion)
    .subscribe(
      (res) => {
        console.log(res)
      },
      (err) => {
        console.error(err);
      }
    )
  }

}
