import { inject, Injectable } from '@angular/core';
import { environment } from '@environments';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { ApiResponse } from '@api/types/api.response';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl: string = environment.apiUrl || 'http://localhost:2023/';

  private readonly http: HttpClient = inject(HttpClient);

  private readonly paramIsMissingErrorCode: number = environment.PARAM_IS_MISSING;

  constructor() { }

  get(partURL: string): Observable<any> {
    return this.handle(this.http.get<ApiResponse>(`${this.baseUrl}${partURL}`));
  }

  post(partURL: string, payload: any): Observable<any> {
    return this.handle(this.http.post<ApiResponse>(`${this.baseUrl}${partURL}`, payload));
  }

  put(partURL: string, payload: any): Observable<any> {
    return this.handle(this.http.put<ApiResponse>(`${this.baseUrl}${partURL}`, payload));
  }

  delete(partURL: string): Observable<any> {
    return this.handle(this.http.delete<ApiResponse>(`${this.baseUrl}${partURL}`));
  }

  private handle(obs: Observable<any>) {
    return obs.pipe(
      map((response: Object) => this.successHandler(response)),
      catchError((error: HttpErrorResponse) => of(this.errorHandler(error))),

    );
  }

  private errorHandler(httpError: HttpErrorResponse): ApiResponse {
    console.log('error while handling request', httpError);
    return {
      ...httpError.error,
      paramError: (httpError.status === this.paramIsMissingErrorCode),
    };
  }

  private successHandler(response: Object): ApiResponse {
    console.log('response', response);
    return { ...response as ApiResponse, paramError: false};
  }
}
