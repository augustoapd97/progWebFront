import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './perfil.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { PedidoComponent } from './pedidos/pedido/pedido.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [PerfilComponent, PedidosComponent, PedidoComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  entryComponents: [
    PerfilComponent
  ]
})
export class PerfilModule { }
