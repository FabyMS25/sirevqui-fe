import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { handleResponse, handleError } from '../apiResponses';
import { environment } from 'src/environments/environment';
import { Staff } from '../../models/staff';

const url = `${environment.backendUrl}/funcionario`;

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Staff[]> {
    return this.http.get<{ status: string; payload: any }>(`${url}`).pipe(
      map((res) => handleResponse<Staff[]>(res)),
      catchError(handleError('obtener todos los Funcionarios'))
    );
  }

  getByUserUuid(uuid: String): Observable<Staff> {
    return this.http.get<{ status: string; payload: any }>(`${url}/user/${uuid}`).pipe(
      map((res) => handleResponse<Staff>(res)),
      catchError(handleError(`obtener Funcionario por uuid de Usuario`))
    );
  }
  getByEmail(email: string): Observable<Staff> {
    return this.http.get<{ status: string; payload: any }>(`${url}/email/${email}`).pipe(
      map((res) => handleResponse<Staff>(res)),
      catchError(handleError(`obtener Funcionario por Email (${email})`))
    );
  }

  getByUuid(uuid: string): Observable<Staff> {
    return this.http.get<{ status: string; payload: any }>(`${url}/uuid/${uuid}`).pipe(
      map((res) => handleResponse<Staff>(res)),
      catchError(handleError(`obtener Funcionario por UUID (${uuid})`))
    );
  }

  getByDocumentNumber(numeroDocumento: string): Observable<Staff> {
    return this.http.get<{ status: string; payload: any }>(`${url}/numeroDocumento/${numeroDocumento}`).pipe(
      map((res) => handleResponse<Staff>(res)),
      catchError(handleError(`obtener Funcionario por Número Documento (${numeroDocumento})`))
    );
  }
  
  save(data: Staff): Observable<Staff> {
    return this.http.post<{ status: string; payload: any }>(`${url}`, data).pipe(
      map((res) => handleResponse<Staff>(res)),
      catchError(handleError('guardar Funcionario'))
    );
  }

  update(data: Staff): Observable<Staff> {
    return this.http.put<{ status: string; payload: any }>(`${url}`, data).pipe(
      map((res) => handleResponse<Staff>(res)),
      catchError(handleError('actualizar Funcionario'))
    );
  }

  delete(uuid: string): Observable<any> {
    return this.http.delete<{ status: string; payload: any }>(`${url}/${uuid}`).pipe(
      map((res) => handleResponse<Staff>(res)),
      catchError(handleError(`eliminar Funcionario por UUID (${uuid})`))
    );
  }

}
