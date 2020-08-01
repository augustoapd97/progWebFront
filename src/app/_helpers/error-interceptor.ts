import { Injectable } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

    constructor(private authService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(
            err => {
                if (err.status === 401 || err.status === 403 ) {
                    this.authService.logout();
                    location.reload(true);
                }
                const error = err.error.message || err.statusText;
                return throwError(error);
            }
        ))

    }

}