import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { CarrinhoComponent } from 'src/app/carrinho/carrinho.component';
import { CarrinhoService } from 'src/app/_services/carrinho.service';
import { LocalEntrega } from 'src/app/_models/local-entrega';
import { Router } from '@angular/router';
import { LocaisEntregaService } from 'src/app/_services/locais-entrega.service';
import { PerfilComponent } from 'src/app/perfil/perfil.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() novoLocal = new EventEmitter<LocalEntrega>();
  
  locaisEntrega: LocalEntrega[];

  localEntrega: LocalEntrega = {id: null, local: 'carregando'};

  constructor(
    public dialog: MatDialog, 
    private router: Router, 
    public carrinho: CarrinhoService,
    private localService: LocaisEntregaService
    ) {}

  ngOnInit() {

    if (localStorage.getItem('localEntrega')) {
      this.localEntrega = JSON.parse(localStorage.getItem('localEntrega'));
      this.novoLocal.emit(this.localEntrega);
    }

    this.localService.getLocaisEntrega().subscribe(
      res => {
        this.locaisEntrega = <LocalEntrega[]>res;
        this.localEntrega = this.locaisEntrega[0];
        this.novoLocal.emit(this.locaisEntrega[0]);
      }
    )
  }
  mudarEntrega(local: LocalEntrega) {
    this.localEntrega = local;
    this.novoLocal.emit(local);
    this.router.navigateByUrl('');
  }

  abrirCarrinho() {
    this.dialog.open(CarrinhoComponent);
  }
  
  abrirPerfil() {
    this.dialog.open(PerfilComponent);
  }

}
