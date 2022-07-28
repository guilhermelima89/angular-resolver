import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Log } from '../models/log.model';
import { Pagination } from '../models/pagination.model';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'root' })
export class LogService extends BaseService {
  private _items: BehaviorSubject<Log[] | null> = new BehaviorSubject(null);
  private _pagination: BehaviorSubject<Pagination | null> = new BehaviorSubject(null);

  constructor(private _httpClient: HttpClient) {
    super();
  }

  get items$(): Observable<Log[]> {
    return this._items.asObservable();
  }

  get pagination$(): Observable<Pagination> {
    return this._pagination.asObservable();
  }

  getAll(pageNumber: number = null, pageSize: number = 10, query: string = ''): Observable<any> {
    return this._httpClient
      .get<Log[]>(this.apiUrl + 'Log', {
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
}
