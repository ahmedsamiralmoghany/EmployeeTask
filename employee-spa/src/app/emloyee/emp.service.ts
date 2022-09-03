import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from './employee';

@Injectable()
export class EmpService {
    private apiurl = environment.api + 'employee/'
    constructor(private http: HttpClient) { }
    getAllEmployee(): Observable<any> {
        return this.http.get<Array<any>>(this.apiurl)
    }

    add(emplyee: Employee) {
        return this.http.post(this.apiurl, emplyee)
    }
    update(emplyee: Employee) {
        return this.http.put(this.apiurl, emplyee)
    }

    getById(id: number) {
        return this.http.get(this.apiurl + id)
    } 
    delete(id: number) {
        return this.http.delete(this.apiurl + id)
    }
}
