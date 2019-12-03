import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { MaterialModule } from '../material/material.module';
import { RestaurantesComponent } from './restaurantes/restaurantes.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [HomeComponent, RestaurantesComponent, CategoriasComponent],
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule
  ]
})
export class HomeModule { }
