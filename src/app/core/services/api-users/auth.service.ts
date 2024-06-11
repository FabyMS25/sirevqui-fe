import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const usersUrl = `${environment.apiLoginUrl}`;

@Injectable({
    providedIn: 'root'
})
export class AuthUserService {

    constructor(private http: HttpClient ) {}

    loginByUsername(username: String, password: String) {
        return this.http.post<any>(`${usersUrl}/auth/signin`, {username, password});
    }
}
