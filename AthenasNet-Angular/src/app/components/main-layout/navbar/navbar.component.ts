import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import 'bootstrap'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuarioActual');
    this.router.navigate(['/login']);
  }

  abreUsuario(){
    $('#dropdownSesion').dropdown('toggle');
  }
}
