import { Injectable } from '@angular/core';

import { Restaurante } from '../_models/restaurante';
import { LocalEntrega } from '../_models/local-entrega';
import { Pedido } from '../_models/pedido';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Prato } from '../_models/prato';
import { ItemCardapio } from '../_models/item-cardapio';


@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  private restaurante: Restaurante;
  private pedido: Pedido;
  private localEntrega: LocalEntrega;

  constructor(
    private _snackBar: MatSnackBar
  ) {
    const carrinho = JSON.parse(localStorage.getItem('carrinho'));
    if (carrinho) {
      this. restaurante = carrinho.restaurante;
      this.pedido = carrinho.pedido;
      this.localEntrega = carrinho.localEntrega;
    }
  }

  get quantidadeItens() {
    if (!this.localEntrega) return;
    return this.pedido.pratos.map(p => p.quantidade).reduce((prev, curr) => {
      return curr += prev
    });
  }

  getRestaurante() { return this.restaurante }
  getLocalEntrega() { return this.localEntrega }
  getPedido() { return this.pedido }

  adicionarItem(item: ItemCardapio, restaurante: Restaurante, localEntrega: LocalEntrega) {

    if (!this.localEntrega) {

      this.localEntrega = localEntrega;
      this.restaurante = restaurante;

    } else {

      if (this.localEntrega.id !== localEntrega.id) {

        this._snackBar.open('Você não pode fazer um pedido para dois lugares diferentes', 'ok', {duration: 4000});
        return;

      } else if (this.restaurante.idUsuario !== restaurante.idUsuario){

        this._snackBar.open('Você não pode fazer um pedido em dois restaurantes diferentes', 'ok', {duration: 4000});
        return;

      } else {
        const itemPedido = this.pedido.pratos.find(i => i.prato.id === item.id);
        if ( itemPedido && itemPedido.quantidade >= item.quantidade ) {

        this._snackBar.open('O restaurante não possui mais um ' + item.nome + 'disponível', 'ok', {duration: 4000});
        return;

        }
      }

    }

    this.adicionarPrato(item.prato);
    this._snackBar.open(item.prato.nome + ' adicionado com sucesso!', 'ok', {duration: 4000});

  }

  adicionarPrato(prato: Prato) {
    if (!this.pedido) {
      this.pedido = {id: undefined, pratos: []};
    }
    const item = this.pedido.pratos.find(i => i.prato.id === prato.id);
    if (item) {
      item.quantidade++;
    } else {
      this.pedido.pratos.push({prato: prato, quantidade: 1});
    }
    this.salvarCarrinho();
  }

  removerPrato(prato: Prato) {
    const item = this.pedido.pratos.find( i => i.prato.id === prato.id);
    if (item.quantidade > 1) {
      item.quantidade -= 1;
    } else {
      this.pedido.pratos.splice(  this.pedido.pratos.findIndex( i => i.prato.id === prato.id), 1 );
      this._snackBar.open(prato.nome + ' foi removido do carrinho', 'ok', {duration: 4000});
    }
    if (this.pedido.pratos.length === 0) {
      this.cancelarPedido();
    } else {
      this.salvarCarrinho();
    }
    
    
  }

  salvarCarrinho() {
    localStorage.setItem('carrinho', JSON.stringify(
      {
        restaurante: this.restaurante,
        pedido: this.pedido,
        localEntrega: this.localEntrega
      }
    ));
  }

  cancelarPedido() {
    this.restaurante = undefined;
    this.pedido = undefined;
    this.localEntrega = undefined;
    localStorage.removeItem('carrinho');
  }

  fecharPedido() {
    
  }

}
