import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GlobalComponent } from 'src/app/global-component';

// const CODE_APP = GlobalComponent.AUTH_API;
const USERS_API = `${environment.apiLoginUrl}/permiso`;
const CODE_APP= "SIS-009";
@Injectable({
  providedIn: 'root'
})
export class PermissionUserService {

  constructor(private http: HttpClient) { }

  getPermisosApp(): Observable<any[]> {
    return this.http.get<any[]>(`${USERS_API}/padres/${CODE_APP}`);
  }

  getPermisosUsuario(uuid: String): Observable<any[]> {
    return this.http.get<any[]>(`${USERS_API}/permisos-porusuario?uuidUsuario=${uuid}&codigoModulo=${CODE_APP}`);
  }

}
