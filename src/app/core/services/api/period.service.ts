import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { handleResponse, handleError } from '../apiResponses';
import { environment } from 'src/environments/environment';
import { Period } from '../../models/period';

const url = `${environment.backendUrl}/gestion`;

@Injectable({
  providedIn: 'root'
})
export class PeriodService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Period[]> {
    return this.http.get<{ status: string; payload: any }>(`${url}`).pipe(
      map((res) => handleResponse<Period[]>(res)),
      catchError(handleError('obtener todos los Funcionarios'))
    );
  }

  getByUuid(uuid: string): Observable<Period> {
    return this.http.get<{ status: string; payload: any }>(`${url}/uuid/${uuid}`).pipe(
      map((res) => handleResponse<Period>(res)),
      catchError(handleError(`obtener Funcionario por UUID (${uuid})`))
    );
  }
  
  save(data: Period): Observable<Period> {
    return this.http.post<{ status: string; payload: any }>(`${url}`, data).pipe(
      map((res) => handleResponse<Period>(res)),
      catchError(handleError('guardar Funcionario'))
    );
  }

  update(data: Period): Observable<Period> {
    return this.http.put<{ status: string; payload: any }>(`${url}`, data).pipe(
      map((res) => handleResponse<Period>(res)),
      catchError(handleError('actualizar Funcionario'))
    );
  }

  delete(uuid: string): Observable<any> {
    return this.http.delete<{ status: string; payload: any }>(`${url}/${uuid}`).pipe(
      map((res) => handleResponse<Period>(res)),
      catchError(handleError(`eliminar Funcionario por UUID (${uuid})`))
    );
  }

}
