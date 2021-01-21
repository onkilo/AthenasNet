import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuarioForm: any = {
    Usuario: '',
    Contrasenia: ''
  }

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
  }


  inicioSesion() {
    console.log('works')
    console.log(this.usuarioForm);
    this.usuarioService.login(this.usuarioForm)
    .subscribe(
      (res: any) => {
        localStorage.setItem('usuarioActual', JSON.stringify(res.Data));
        localStorage.setItem('token', res.Data.Token);
        this.router.navigate(['/']);
      },
      (err) => {
        console.error(err);
      }
    )
  }

}
