import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { Usuario } from '../_models/usuario';
import { Pedido } from '../_models/pedido';
import { Router } from '@angular/router';
import { CarrinhoService } from '../_services/carrinho.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  usuario: Usuario;
  pedidoAndamento: Pedido;

  constructor(
    private auth: AuthenticationService,
    private carrinho: CarrinhoService,
    private dialogRef: MatDialogRef<PerfilComponent>,
    private router: Router
  ) { }

  ngOnInit() {
    this.usuario = this.auth.currentUserValue;
  }

  logout() {
    this.auth.logout();
    this.carrinho.cancelarPedido();
    this.dialogRef.close();
    this.router.navigateByUrl('login');
  }

}
