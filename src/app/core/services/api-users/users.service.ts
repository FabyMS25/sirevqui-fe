import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { handleResponse, handleError } from '../apiResponses';
import { environment } from 'src/environments/environment';

import { LoginResponse } from '../../models/user/login-response.model';

const usersUrl = `${environment.apiLoginUrl}`;

@Injectable({ providedIn: 'root' })

export class UserService {

    constructor(private http: HttpClient ) {}
  
    loginByUsername(username: String, password: String): Observable<any> {
      return this.http.post<LoginResponse>(`${usersUrl}/auth/signin`, {username, password}).pipe(
        map((res) => res),
        catchError(handleError(`loguear usuario`))
      );
    }

    // loginByUsername(username: String, password: String) {
    //     return this.http.post<any>(`${usersUrl}/auth/signin`, {username, password});
    // }

    getAllUsers(): Observable<any[]> {
        return this.http.get<any[]>(`${usersUrl}/listar/usuarios`);
    } 
  
    getUserByUuid(uuid:String) {
        return this.http.get<any[]>(`${usersUrl}/usuario/${uuid}`);
    }

    updateUser(data:any): Observable<any> {
        return this.http.put<any>(`${usersUrl}/user/update`, data);
    }

    changePassword(uuidUsuario:string, newPassword:string): Observable<any> {
        return this.http.post<any>(`${usersUrl}/user/change-password`, {uuidUsuario, newPassword});
    }

    updatePersona(persona:any): Observable<any> {
        return this.http.put<any>(`${usersUrl}/persona`, persona);
    }
}
