import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CarrinhoService } from 'src/app/_services/carrinho.service';
import { CarrinhoComponent } from 'src/app/carrinho/carrinho.component';
import { PerfilComponent } from 'src/app/perfil/perfil.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(public dialog: MatDialog, private carrinho: CarrinhoService) { }

  ngOnInit() {
  }

  abrirCarrinho() {
    this.dialog.open(CarrinhoComponent, {minHeight: '100vh', minWidth: '100vw'});
  }

  abrirPerfil() {
    this.dialog.open(PerfilComponent, {minHeight: '100vh', minWidth: '100vw'})
  }

}
