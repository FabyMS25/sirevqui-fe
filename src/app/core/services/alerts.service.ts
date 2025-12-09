import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { handleResponse, handleError } from './apiResponses';
import { environment } from 'src/environments/environment';
import { Alert } from '../models/alert.models';

const url = environment.backendUrl + '/alerta';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Alert[]> {
    return this.http.get<{ status: string; payload: any }>(`${url}`).pipe(
      map((res) => handleResponse<Alert[]>(res)),
      catchError(handleError('obtener todas las Alertas'))
    );
  }

  getByUuid(uuid: string): Observable<Alert> {
    return this.http.get<{ status: string; payload: any }>(`${url}/uuid/${uuid}`).pipe(
      map((res) => handleResponse<Alert>(res)),
      catchError(handleError(`obtener Alerta por UUID (${uuid})`))
    );
  }

  create(alertaDto: Alert): Observable<Alert> {
    return this.http.post<{ status: string; payload: any }>(`${url}`, alertaDto).pipe(
      map((res) => handleResponse<Alert>(res)),
      catchError(handleError('crear Alerta'))
    );
  }

  update(alertaDto: Alert): Observable<Alert> {
    return this.http.put<{ status: string; payload: any }>(`${url}`, alertaDto).pipe(
      map((res) => handleResponse<Alert>(res)),
      catchError(handleError('actualizar Alerta'))
    );
  }

  delete(uuid: string): Observable<any> {
    return this.http.delete<{ status: string; payload: any }>(`${url}/${uuid}`).pipe(
      map((res) => handleResponse<any>(res)),
      catchError(handleError(`eliminar Alerta por UUID (${uuid})`))
    );
  }

  getByFechaActual(fechaActual: Date): Observable<Alert[]> {
    const params = new HttpParams().set('fechaActual', fechaActual.toISOString());
    return this.http.get<{ status: string; payload: any }>(`${url}/fecha-actual`, { params }).pipe(
      map(res => handleResponse<Alert[]>(res)),
      catchError(handleError(`obtener Alertas por fecha actual ${fechaActual}`))
    );
  }

  getByFechaActualAndUuidDestinatario(fechaActual: Date, uuidDestinatario: string): Observable<Alert[]> {
    const params = new HttpParams()
      .set('fechaActual', fechaActual.toISOString())
      .set('uuidDestinatario', uuidDestinatario);
      
    return this.http.get<{ status: string; payload: any }>(`${url}/fecha-destinatario`, { params }).pipe(
      map(res => handleResponse<Alert[]>(res)),
      catchError(handleError(`obtener Alertas por fecha actual ${fechaActual} y destinatario ${uuidDestinatario}`))
    );
  }
}