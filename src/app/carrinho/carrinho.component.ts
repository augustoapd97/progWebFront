import { Component, OnInit } from '@angular/core';
import { CarrinhoService } from '../_services/carrinho.service';
import { Prato } from '../_models/prato';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.scss']
})
export class CarrinhoComponent implements OnInit {

  constructor(private carrinho: CarrinhoService) { }

  ngOnInit() {
    
  }

  get restaurante() { return this.carrinho.getRestaurante() }
  get localEntrega() { return this.carrinho.getLocalEntrega() }
  get pedido() { return this.carrinho.getPedido() }
  get quantidadeItens() { return this.carrinho.quantidadeItens }

  cancelarPedido() { this.carrinho.cancelarPedido() }
  
  adicionarPrato(prato: Prato) {
    this.carrinho.adicionarPrato(prato);
  }

  removerPrato(prato: Prato) {
    this.carrinho.removerPrato(prato);
  }

}
