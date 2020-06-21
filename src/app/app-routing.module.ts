import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClienteComponent } from './cliente/cliente.component';

const routes: Routes = 
[
  { path: '', redirectTo: '/home', pathMatch: 'full' },//Se añade para rutear en automatico a home
  { path: "home", component: HomeComponent },//se deben añadir las rutas siempre que se crea un componente
  { path: "cliente", component: ClienteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
