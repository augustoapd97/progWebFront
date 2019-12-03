import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

@Injectable({ providedIn: 'root'})
export class AuthGuard implements CanActivate {

    constructor( private router: Router, private authService: AuthenticationService ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        
        if (this.authService.currentUserValue) {
            return true;
        } else {
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            return false;
        }

    }

}
