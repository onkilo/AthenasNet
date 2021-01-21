import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import * as $ from 'jquery';
import 'bootstrap'

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  accion: string = 'registrar';


  clientes: any = []

  clienteSeleccionado: any = {
    Nombre: '',
    Apellido: '',
    Telefono: '',
    Dni: '',
    Sexo: 'M',

  }

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
      (res: any) => {
        console.log(res)
        this.clientes = res.Data;
      },
      (err) => {
        console.error(err);
      }
    )
  }


  muestraRegistrar() {
    this.accion = 'registrar';
    this.clienteSeleccionado = {
      Nombre: '',
      Apellido: '',
      Telefono: '',
      Dni: '',
      Sexo: 'M',
  
    }
    $('#modal-mantenedor').modal('show');
  }

  muestraEditar(cliente: any) {
    console.log(cliente);
    this.clienteSeleccionado = cliente;
    this.accion = 'editar';
    $('#modal-mantenedor').modal('show');
  }


  enviarCliente(){
    if(this.accion == 'registrar') {
      const nuevoCliente: any = {
        Nombre: this.clienteSeleccionado.Nombre,
        Apellido: this.clienteSeleccionado.Apellido,
        Telefono: this.clienteSeleccionado.Telefono,
        Dni: this.clienteSeleccionado.Dni,
        Sexo: this.clienteSeleccionado.Sexo
      }
      this.clienteService.postClientes(nuevoCliente)
      .subscribe(
        (res: any) => {
          console.log(res)
          $('#modal-mantenedor').modal('hide');
          this.listar()
        },
        (err) => {  
          console.error(err);
        }
      )
    }
    else {
      const nuevoCliente: any = {
        Nombre: this.clienteSeleccionado.Nombre,
        Apellido: this.clienteSeleccionado.Apellido,
        Telefono: this.clienteSeleccionado.Telefono,
        Dni: this.clienteSeleccionado.Dni,
        Sexo: this.clienteSeleccionado.Sexo
      }
      this.clienteService.putClientes( parseInt(this.clienteSeleccionado.Id), nuevoCliente)
      .subscribe(
        (res: any) => {
          console.log(res)
          $('#modal-mantenedor').modal('hide');
          this.listar()
        },
        (err) => {  
          console.error(err);
        }
      )
    }
  }

  muestraConfirmacion(cliente: any){
    this.clienteSeleccionado = cliente;
    this.accion = 'eliminar';
    $('#modal-confirmar').modal('show');
  }

  confEliminacion(){
    this.clienteService.deleteCliente(parseInt(this.clienteSeleccionado.Id))
    .subscribe(
      (res: any) => {
        $('#modal-confirmar').modal('hide');
        this.listar();
      },
      (err) => {
        console.error(err);
      }
    )
  }

}
