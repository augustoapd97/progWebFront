import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocaisEntregaService {

  constructor(private http: HttpClient) { }

  public getLocaisEntrega() {
    return this.http.get('http://localhost:8080/locaisAtendimento');
  }

}
