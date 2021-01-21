import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteComponent } from './components/cliente/cliente.component';
import { InicioComponent } from './components/inicio/inicio.component';
import {LoginComponent} from './components/login/login.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { ProveedorComponent } from './components/proveedor/proveedor.component';
import { ProductoComponent } from './components/producto/producto.component';
import { PromocionComponent } from './components/promocion/promocion.component';
import { TrabajadorComponent } from './components/trabajador/trabajador.component';
import { PedidoComponent } from './components/pedido/pedido.component';
import { VentaComponent } from './components/venta/venta.component';
import { AuthGuard } from './guard/authGuard';

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
      path: 'producto',
      component: ProductoComponent
    },
    {
      path: 'categoria',
      component: CategoriaComponent
    },
    {
      path: 'cliente',
      component: ClienteComponent
    },
    {
      path: 'promocion',
      component: PromocionComponent
    },
    {
      path: 'proveedor',
      component: ProveedorComponent
    },
    {
      path: 'trabajador',
      component: TrabajadorComponent
    },
    {
      path: 'pedido',
      component: PedidoComponent
    },
    {
      path: 'venta',
      component: VentaComponent
    }
  ],
  canActivate: [AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
