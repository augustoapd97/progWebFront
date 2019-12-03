import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardapioComponent } from './cardapio.component';
import { MaterialModule } from '../material/material.module';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [CardapioComponent],
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule
  ]
})
export class CardapioModule { }
