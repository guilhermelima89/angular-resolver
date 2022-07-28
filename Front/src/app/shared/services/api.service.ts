import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { ApiEmail } from '../models/api-email.model';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'root' })
export class ApiService extends BaseService {
  constructor(protected _httpClient: HttpClient) {
    super();
  }

  getById(id: number): Observable<ApiEmail> {
    return this._httpClient
      .get<ApiEmail>(this.apiUrl + 'ApiEmail/' + id)
      .pipe(map(super.extractData), catchError(super.serviceError));
  }

  update(id: number, model: ApiEmail): Observable<ApiEmail> {
    return this._httpClient
      .put<ApiEmail>(this.apiUrl + 'ApiEmail/' + id, model)
      .pipe(map(super.extractData), catchError(super.serviceError));
  }
}
