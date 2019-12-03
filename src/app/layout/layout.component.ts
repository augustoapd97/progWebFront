import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { ResponsiveService } from '../_services/responsive.service';
import { LocalEntrega } from '../_models/local-entrega';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  private localEntrega;
  localEntregaEmitter: EventEmitter<LocalEntrega>;
  @ViewChild('header', {static: true}) private header: HeaderComponent;

  constructor(private responsivo: ResponsiveService) { }

  ngOnInit() {
    this.localEntregaEmitter = new EventEmitter();
  }

  public getLocalEntrega(): LocalEntrega{
    return this.localEntrega;
  }

  mudaLocal(localNovo: LocalEntrega) {
    this.localEntrega = localNovo;
    this.localEntregaEmitter.emit(localNovo);
    localStorage.setItem('localEntrega', JSON.stringify(this.localEntrega));
  }



}
