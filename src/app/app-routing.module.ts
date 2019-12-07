import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilComponent } from './perfil/perfil.component';
import { HomeComponent } from './home/home.component';
import { CardapioComponent } from './cardapio/cardapio.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_helpers/auth-guard';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  { path: '', component: LayoutComponent, canActivate: [AuthGuard],
  children: [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: 'home', component: HomeComponent },
    { path: 'perfil', component: PerfilComponent },
    { path: 'restaurante/:id', component: CardapioComponent },
  ]},
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
  
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
