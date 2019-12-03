import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthenticationService } from '../_services/authentication.service';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    
    constructor(private authService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentToken = this.authService.currentTokenValue;
        if (currentToken) {
            request = request.clone({
                setHeaders: {
                    Authorization: currentToken
                }
            });
        }

        return next.handle(request);
    }

}
