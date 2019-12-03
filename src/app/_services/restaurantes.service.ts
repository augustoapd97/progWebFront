import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestaurantesService {

  constructor(private http: HttpClient) { }

  getRestaurantesPorLocal(idLocal: number) {
    return this.http.get('http://localhost:8080/restaurantes', { params: {localAtendimento: idLocal.toString()}});
  }

  getRestaurante(idRestaurante: number) {
    return this.http.get('http://localhost:8080/restaurante', { params: {idRestaurante: idRestaurante.toString() }});
  }

}
