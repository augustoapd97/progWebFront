import { Component, OnInit, Host } from '@angular/core';
import { Restaurante } from '../_models/restaurante';
import { ResponsiveService } from '../_services/responsive.service';
import { CarrinhoService } from '../_services/carrinho.service';
import { LocalEntrega } from '../_models/local-entrega';
import { LayoutComponent } from '../layout/layout.component';
import { RestaurantesService } from '../_services/restaurantes.service';
import { CardapioService } from '../_services/cardapio.service';
import { ActivatedRoute } from '@angular/router';
import { ItemCardapio } from '../_models/item-cardapio';
import { Categoria } from '../_models/categoria';

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.scss']
})
export class CardapioComponent implements OnInit {

  restaurante: Restaurante;
  loadingRestaurante = true;
  itensCardapio: ItemCardapio[];
  loadingItens = true;
  localEntrega: LocalEntrega;

  constructor(
    private rs: ResponsiveService, 
    private carrinho: CarrinhoService, 
    private restaurantesService: RestaurantesService,
    private cardapioService: CardapioService,
    private route: ActivatedRoute,
    @Host() private layout: LayoutComponent) { 
  }

  ngOnInit() {

    this.carregaRestaurante();

    if (localStorage.getItem('localEntrega')) {
      this.localEntrega = JSON.parse(localStorage.getItem('localEntrega'));
      if (!this.loadingRestaurante) this.carregaCardapio();
    }

    this.layout.localEntregaEmitter.subscribe(
      local => {
        this.localEntrega = local;
        if (!this.loadingItens) this.carregaCardapio();
      }
    )
  }

  carregaRestaurante() {
    this.restaurantesService.getRestaurante(Number.parseInt(this.route.snapshot.paramMap.get('id')))
      .subscribe(
        res => {
          this.restaurante = <Restaurante> res;
          this.loadingRestaurante = false;
          this.carregaCardapio();
        }
      );
  }

  carregaCardapio() {
    this.cardapioService.getItens(this.restaurante.idUsuario, this.localEntrega.id)
      .subscribe(
        res => {
          this.itensCardapio = <ItemCardapio[]>res;
          this.loadingItens = false;
        }
      );
  }

  cardapio(): {categoria: Categoria, itens: ItemCardapio[]}[] {
    const secoes: {categoria: Categoria, itens: ItemCardapio[]}[] = [];
    this.itensCardapio.forEach(
      item => {
        if (secoes.length == 0) {
          secoes.push({categoria: item.prato.categoria, itens: [item]});
        } else {
          if (secoes.length > 0 && (secoes.map(s => s.categoria.id).includes(item.prato.categoria.id))) {
            secoes.find(s => s.categoria.id == item.prato.categoria.id).itens.push(item);
          } else {
            secoes.push({categoria: item.prato.categoria, itens: [item]});
          }
        }
        
      }
    )
    return secoes;
  }

  adicionarNoCarrinho(item: ItemCardapio){
    this.carrinho.adicionarItem(item, this.restaurante, this.localEntrega);
    console.log(this.carrinho);
  }

}
