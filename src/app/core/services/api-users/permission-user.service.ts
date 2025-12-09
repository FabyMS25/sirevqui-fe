import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GlobalComponent } from 'src/app/global-component';

const CODE_APP = GlobalComponent.CODE_APP;
const USERS_API = `${environment.apiLoginUrl}/permiso`;
@Injectable({
  providedIn: 'root'
})
export class PermissionUserService {

  constructor(private http: HttpClient) { }

  getPermissionsApp(): Observable<any[]> {
    return this.http.get<any[]>(`${USERS_API}/padres/${CODE_APP}`);
  }


  public getPermissionsUser(user: any): Observable<any[]> {
    let params = new HttpParams();
    params = params.append('uuidUsuario', user.uuid);
    params = params.append('codigoModulo', CODE_APP);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + user.token
    });
    return this.http.get<any[]>(`${USERS_API}/permisos-porusuario`, { params: params, headers: headers });
  }
}
