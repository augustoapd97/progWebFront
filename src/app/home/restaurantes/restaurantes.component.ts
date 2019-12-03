import { Component, OnInit, Host } from '@angular/core';
import { ResponsiveService } from 'src/app/_services/responsive.service';

import { RestaurantesService } from 'src/app/_services/restaurantes.service';
import { HomeComponent } from '../home.component';
import { Restaurante } from 'src/app/_models/restaurante';
import { LocalEntrega } from 'src/app/_models/local-entrega';

@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.scss']
})
export class RestaurantesComponent implements OnInit {

  restaurantes: Restaurante[];
  loading = true;
  localEntrega: LocalEntrega;

  constructor(
    private restaurantesService: RestaurantesService,
    private responsivo: ResponsiveService,
    @Host() private homeComponent: HomeComponent
    ) { }

  ngOnInit() {

    if (localStorage.getItem('localEntrega')) {
      this.localEntrega = JSON.parse(localStorage.getItem('localEntrega'));
      this.carregarRestaurantes();
    }

    this.homeComponent.layoutComponent.localEntregaEmitter.asObservable()
      .subscribe(
        local => {
          this.localEntrega = local;
          this.carregarRestaurantes();
        }
      )
  }

  public carregarRestaurantes() {
    this.restaurantes = []
    this.loading = true;
    this.restaurantesService.getRestaurantesPorLocal(this.localEntrega.id)
      .subscribe(
        res => {
          this.restaurantes = <Restaurante[]>res;
          this.loading = false;
        }
      )
  }

  numColunas(): number {
    if (this.responsivo.isXSmall) {
      return 1;
    } else if (this.responsivo.isSmall) {
      return 2;
    } else if (this.responsivo.isMedium) {
      return 3;
    } else {
      return 4;
    }
  }

}
