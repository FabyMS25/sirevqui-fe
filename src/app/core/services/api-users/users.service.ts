import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const usersUrl = `${environment.apiLoginUrl}`;
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })  };

@Injectable({ providedIn: 'root' })

export class UserService {

    constructor(private http: HttpClient ) {}
  
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
