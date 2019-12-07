import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CarrinhoService } from '../_services/carrinho.service';
import { Prato } from '../_models/prato';
import { Cartao } from '../_models/cartao';
import { PedidoService } from '../_services/pedido.service';
import { AuthenticationService } from '../_services/authentication.service';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.scss']
})
export class CarrinhoComponent implements OnInit {

  @ViewChild('cartao', {static: false}) cartao: MatSelect;

  troco: number;
  idCartao: number;

  constructor(
    private carrinho: CarrinhoService,
    private pedidoService: PedidoService,
    private authService: AuthenticationService
    ) { }

  cartoes: Cartao[];

  ngOnInit() {
    this.pedidoService.getCartoes(this.authService.currentUserValue.cpf)
      .subscribe(
        res => {
          this.cartoes = <Cartao[]>res;
          console.log(this.cartoes);
        }
      )

    
  }

  get restaurante() { return this.carrinho.getRestaurante() }
  get localEntrega() { return this.carrinho.getLocalEntrega() }
  get pedido() { return this.carrinho.getPedido() }
  get quantidadeItens() { return this.carrinho.quantidadeItens }
  get valorTotal() { return this.carrinho.valorTotal }

  zerarPagamento() {
    this.idCartao = undefined;
    this.troco = undefined;
  }

  cancelarPedido() { this.carrinho.cancelarPedido() }
  
  adicionarPrato(prato: Prato) {
    this.carrinho.adicionarPrato(prato);
  }

  removerPrato(prato: Prato) {
    this.carrinho.removerPrato(prato);
  }

  fecharPedido() {
    this.carrinho.fecharPedido(this.troco, this.idCartao);
  }

}
