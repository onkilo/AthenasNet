import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  buscarForm = {
    Nombre: ''
  }


  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.listar();
  }


  listar(){
    this.clienteService.getClientes(this.buscarForm.Nombre)
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
