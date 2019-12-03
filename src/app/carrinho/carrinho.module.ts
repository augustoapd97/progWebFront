import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarrinhoComponent } from './carrinho.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [CarrinhoComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  entryComponents: [
    CarrinhoComponent
  ],
  exports: [
    CarrinhoComponent
  ]
})
export class CarrinhoModule { }
