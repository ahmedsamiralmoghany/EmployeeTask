import { Injectable } from '@angular/core';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
    api = environment.api + 'auth/';
    constructor(private http: HttpClient) { }
    login(userName: string, password: string): Observable<any> {
        return this.http.post<any>(this.api + 'login', { userName: userName, password: password })
    } 
    register(userName: string, password: string): Observable<any> {
        return this.http.post<any>(this.api + 'register', { userName: userName, password: password })
    }
}
