import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CardapioService {

  constructor(private http: HttpClient) { }

  getItens(idRestaurante: number, idLocalAtendimento: number) {
    return this.http.get(
      'http://localhost:8080/cardapio', 
      { params: {
        idRestaurante: idRestaurante.toString(),
        idLocalAtendimento: idLocalAtendimento.toString()
      }});
  }

}
