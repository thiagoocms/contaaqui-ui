import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {AuthDataService} from '../auth/auth-data.service';
import {PageResponse} from '../domain/page.model';


export abstract class BaseService<T, ID = number> {
  protected http: HttpClient;
  protected baseUrl: string;
  protected authDataService: AuthDataService;


  protected constructor(http: HttpClient, path: string, authDataService: AuthDataService) {
    this.authDataService = authDataService;
    this.http = http;

    const envBase = (environment && environment.BASE_URL) ? String(environment.BASE_URL) : '';
    this.baseUrl = `${envBase}/${path}`.replace(/\/+$/, '');

  }

  list(queryParams?: {
    [key: string]: any
  } | HttpParams, headers: HttpHeaders = this.getHeaders()): Observable<PageResponse<T>> {
    let params: HttpParams | undefined;
    if (queryParams instanceof HttpParams) {
      params = queryParams;
    } else if (queryParams) {
      params = new HttpParams({
        fromObject: Object.keys(queryParams).reduce((acc, key) => {
          const val = queryParams![key];
          if (val === undefined || val === null) return acc;
          acc[key] = String(val);
          return acc;
        }, {} as { [k: string]: string })
      });
    }
    return this.http.get<PageResponse<T>>(this.baseUrl, {params, headers});
  }

  get(id: ID, headers: HttpHeaders = this.getHeaders()): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${id}`, {headers});
  }

  create(entity: Partial<T>, headers: HttpHeaders = this.getHeaders()): Observable<T> {
    return this.http.post<T>(this.baseUrl, entity, {headers});
  }

  update(id: ID, entity: Partial<T>, headers: HttpHeaders = this.getHeaders()): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${id}`, entity, {headers});
  }

  delete(id: ID, headers: HttpHeaders = this.getHeaders()): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, {headers});
  }

  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authDataService.getTokenAccess()}`
    });
  }

  public getHeadersNoAuth(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

}
