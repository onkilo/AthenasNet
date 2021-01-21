import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { NavbarComponent } from './components/main-layout/navbar/navbar.component';
import { SidebarComponent } from './components/main-layout/sidebar/sidebar.component';
import { FooterComponent } from './components/main-layout/footer/footer.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AuthInterceptor } from './interceptors/authInterceptor';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { ProveedorComponent } from './components/proveedor/proveedor.component';
import { ProductoComponent } from './components/producto/producto.component';
import { TrabajadorComponent } from './components/trabajador/trabajador.component';
import { PromocionComponent } from './components/promocion/promocion.component';
import { PedidoComponent } from './components/pedido/pedido.component';
import { VentaComponent } from './components/venta/venta.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainLayoutComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    ClienteComponent,
    InicioComponent,
    CategoriaComponent,
    ProveedorComponent,
    ProductoComponent,
    TrabajadorComponent,
    PromocionComponent,
    PedidoComponent,
    VentaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
      {
        provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
