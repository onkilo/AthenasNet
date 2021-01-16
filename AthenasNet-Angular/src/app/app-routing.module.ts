import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteComponent } from './components/cliente/cliente.component';
import { InicioComponent } from './components/inicio/inicio.component';
import {LoginComponent} from './components/login/login.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';

const routes: Routes = [{
  path: 'login',
  component: LoginComponent
}, {
  path: '',
  component: MainLayoutComponent,
  children: [
    {
      path: '',
      component: InicioComponent
    },
    {
      path: 'cliente',
      component: ClienteComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
