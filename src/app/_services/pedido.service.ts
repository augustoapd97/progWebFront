import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pedido } from '../_models/pedido';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
    ) { }

  getCartoes(cpfPessoa: string) {
    return this.http.get(
      'http://localhost:8080/usuarios/cartoes',
      {params: {
        cpfPessoa: cpfPessoa
      }}
    )
  }

  postPedido(pedido: Pedido) {
    const usuario = this.authService.currentUserValue;
    return this.http.post('http://localhost:8080/pedido', {
      troco: pedido.troco,
      idCartao: pedido.idCartao,
      cliente: usuario,
      pratos: pedido.pratos,
      date: new Date(),
    });
  }

}
