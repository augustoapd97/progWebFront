import { Component, OnInit, Host } from '@angular/core';
import { RestaurantesService } from '../_services/restaurantes.service';
import { LayoutComponent } from '../layout/layout.component';
import { LocalEntrega } from '../_models/local-entrega';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    @Host() public layoutComponent: LayoutComponent,
    private restaurantesService: RestaurantesService
    ) { }

  ngOnInit() {
  }

  public getLocalEntrega(): LocalEntrega {
    return this.layoutComponent.getLocalEntrega();
  }

  

}
