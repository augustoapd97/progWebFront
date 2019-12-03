import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscaComponent } from './busca.component';
import { MaterialModule } from '../material/material.module';
import { FiltroComponent } from './filtro/filtro.component';



@NgModule({
  declarations: [BuscaComponent, FiltroComponent],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class BuscaModule { }
