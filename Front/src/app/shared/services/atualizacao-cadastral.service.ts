import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AtualizacaoCadastral } from '../models/atualizacao-cadastral.model';
import { Pagination } from '../models/pagination.model';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'root' })
export class AtualizacaoCadastralService extends BaseService {
  private _items: BehaviorSubject<AtualizacaoCadastral[] | null> = new BehaviorSubject(null);
  private _pagination: BehaviorSubject<Pagination | null> = new BehaviorSubject(null);

  constructor(private _httpClient: HttpClient) {
    super();
  }

  get items$(): Observable<AtualizacaoCadastral[]> {
    return this._items.asObservable();
  }

  get pagination$(): Observable<Pagination> {
    return this._pagination.asObservable();
  }

  getAll(pageNumber: number = null, pageSize: number = 10, query: string = ''): Observable<any> {
    return this._httpClient
      .get<AtualizacaoCadastral[]>(this.apiUrl + 'AtualizacaoCadastral', {
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

  create(model: AtualizacaoCadastral): Observable<AtualizacaoCadastral> {
    return this._httpClient
      .post<AtualizacaoCadastral>(this.apiUrl + 'AtualizacaoCadastral', model)
      .pipe(map(super.extractData), catchError(super.serviceError));
  }

  conclude(id: number): Observable<any> {
    return this._httpClient
      .post(this.apiUrl + 'AtualizacaoCadastral/concluir/' + id, null)
      .pipe(map(super.extractData), catchError(super.serviceError));
  }
}
