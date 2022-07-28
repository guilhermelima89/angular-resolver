import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, tap } from 'rxjs';
import { Pagination } from '../models/pagination.model';
import { Texto } from '../models/texto.model';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'root' })
export class TextoService extends BaseService {
  private _items: BehaviorSubject<Texto[] | null> = new BehaviorSubject(null);
  private _pagination: BehaviorSubject<Pagination | null> = new BehaviorSubject(null);

  constructor(protected _httpClient: HttpClient) {
    super();
  }

  get items$(): Observable<Texto[]> {
    return this._items.asObservable();
  }

  get pagination$(): Observable<Pagination> {
    return this._pagination.asObservable();
  }

  getAll(pageNumber: number = null, pageSize: number = 10, query: string = ''): Observable<any> {
    return this._httpClient
      .get<Texto[]>(this.apiUrl + 'Texto', {
        observe: 'response',
        params: {
          pageNumber: pageNumber,
          pageSize: pageSize,
          query: query,
        },
      })
      .pipe(
        tap((response) => {
          this._items.next(response.body);
          this._pagination.next(JSON.parse(response.headers.get('X-Pagination')));
        })
      );
  }

  getById(id: number): Observable<Texto> {
    return this._httpClient
      .get<Texto>(this.apiUrl + 'Texto/' + id)
      .pipe(map(super.extractData), catchError(super.serviceError));
  }

  update(id: number, model: Texto): Observable<Texto> {
    return this._httpClient
      .put<Texto>(this.apiUrl + 'Texto/' + id, model)
      .pipe(map(super.extractData), catchError(super.serviceError));
  }
}
