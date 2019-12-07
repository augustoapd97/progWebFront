import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarrinhoComponent } from './carrinho.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [CarrinhoComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  entryComponents: [
    CarrinhoComponent
  ],
  exports: [
    CarrinhoComponent
  ]
})
export class CarrinhoModule { }
