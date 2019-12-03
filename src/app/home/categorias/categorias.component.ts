import { Component, OnInit } from '@angular/core';
import { ResponsiveService } from 'src/app/_services/responsive.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {

  constructor(private responsivo: ResponsiveService) { }

  ngOnInit() {
  }

  

}
