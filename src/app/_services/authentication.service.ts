import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from '../_models/usuario';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<Usuario>;
  public currentUser: Observable<Usuario>;
  
  private currentTokenSubject: BehaviorSubject<string>;
  public currentToken: Observable<string>;

  constructor(private http: HttpClient) {

    this.currentUserSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

    this.currentTokenSubject = new BehaviorSubject<string>(localStorage.getItem('authorization'));
    this.currentToken = this.currentTokenSubject.asObservable();

  }

  public get currentUserValue(): Usuario {
    return this.currentUserSubject.value;
  }

  public get currentTokenValue(): string {
    return this.currentTokenSubject.value;
  }

  login(email: string, senha: string){
    return this.http.post<any>('http://localhost:8080/login',{email, senha},{observe: 'response'})
      .pipe(map(
        resposta => {

          const token = resposta.headers.get('authorization');
          localStorage.setItem('authorization', token);
          this.currentTokenSubject.next(token);

          this.http.get('http://localhost:8080/usuarios', {params: { email: resposta.headers.get('username') }, observe: 'response'}).subscribe(
            resposta => {
              const user = resposta.body;
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.currentUserSubject.next(user);
            }
          )

        }
      ));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    localStorage.removeItem('token');
    this.currentTokenSubject.next(null);
  }

}
