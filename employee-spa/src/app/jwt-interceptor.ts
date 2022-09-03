import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class JWTInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var token = localStorage.getItem('token');
        if (token) {
            const JWT = `Bearer ${token}`;
            req = req.clone({
                setHeaders: {
                    Authorization: JWT,
                },
            });
        }
        return next.handle(req);
    }

}