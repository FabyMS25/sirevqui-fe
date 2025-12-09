import { throwError } from 'rxjs';

export function handleResponse<T>(response: { status: string; payload: any }): T {
  if (response.status === 'OK') {
    return response.payload as T;
  } else {
    throw new Error(response.payload?.message || 'Respuesta inesperada del servidor');
  }
}

export function handleError(operation = 'operación') {
  return (error: any) => {
    let message = `Error en ${operation}`;

    if (error?.error?.message) {
      message = error.error.message;
    } else if (error?.message) {
      message = error.message;
    } else if (typeof error === 'string') {
      message = error;
    }
    return throwError(() => new Error(message));
  };
}
// export function handleError(operation = 'operación') {
//   return (error: any) => {
//     return throwError(() => new Error(error?.message || `Error en ${operation}`));
//   };
// }


  // update(data: Vehicle): Observable<Vehicle> {
  //   return this.http.put<{ status: string; payload: any }>(`${url}`, data).pipe(
  //     map((response) => {
  //       if (response.status === 'OK') {
  //         return response.payload as Vehicle;
  //       } else {
  //         const msg = typeof response.payload === 'string' ? response.payload : JSON.stringify(response.payload);
  //         throw new Error(`Error del servidor: ${msg}`);
  //       }
  //     }),
  //     catchError((error) => {
  //       let errorMessage = 'Error desconocido';
        
  //       if (error.error) {
  //         if (typeof error.error === 'string') {
  //           errorMessage = error.error;
  //         } else if (typeof error.error === 'object') {
  //           errorMessage = error.error.message || error.error.details || JSON.stringify(error.error);
  //         }
  //       } else if (error.message) {
  //         errorMessage = error.message;
  //       }

  //       return throwError(() => new Error(errorMessage));
  //     })
  //   );
  // }