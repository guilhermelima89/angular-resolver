import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, switchMap, take, tap } from 'rxjs';
import { Pagination } from '../models/pagination.model';
import { Produto } from '../models/produto.model';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'root' })
export class ProdutoService extends BaseService {
  private _pagination: BehaviorSubject<Pagination | null> = new BehaviorSubject(null);
  private _items: BehaviorSubject<Produto[] | null> = new BehaviorSubject(null);
  private _item: BehaviorSubject<Produto | null> = new BehaviorSubject(null);

  constructor(protected _httpClient: HttpClient) {
    super();
  }

  get pagination$(): Observable<Pagination> {
    return this._pagination.asObservable();
  }

  get items$(): Observable<Produto[]> {
    return this._items.asObservable();
  }

  get item$(): Observable<Produto> {
    return this._item.asObservable();
  }

  set reset(value: boolean) {
    if (value) {
      this._items.next(null);
    }
  }

  getAll(pageNumber: number = 1, pageSize: number = 10, query: string = ''): Observable<any> {
    return this._httpClient
      .get<Produto[]>(this.apiUrl + 'Produto', {
        observe: 'response',
        params: {
          pageNumber: pageNumber,
          pageSize: pageSize,
          query: query,
        },
      })
      .pipe(
        tap((response) => {
          // atualiza a lista de produtos
          this._items.next(response.body);

          // paginação pelo cabeçalho
          this._pagination.next(JSON.parse(response.headers.get('X-Pagination')));
        })
      );
  }

  getById(id: number): Observable<Produto> {
    return this._httpClient
      .get<Produto>(this.apiUrl + 'Produto/' + id)
      .pipe(tap((response: any) => this._item.next(response), super.serviceError));
  }

  update(id: number, value: Produto): Observable<Produto> {
    return this.items$.pipe(
      take(1),
      switchMap(items =>
        this._httpClient.put<Produto>(this.apiUrl + 'Produto/' + id, value).pipe(
          map((response) => {
            // busca o produto
            const index = items.findIndex(x => x.id === id);

            // atualiza o produto
            items[index] = value;

            // atualiza a lista de produtos
            this._items.next(items);

            // retorna
            return response;
          }),
          catchError(super.serviceError)
        )
      )
    );
  }

  delete(id: number): Observable<boolean> {
    return this.items$.pipe(
      take(1),
      switchMap(response =>
        this._httpClient.delete(this.apiUrl + 'Produto/' + id).pipe(
          map((isDeleted: boolean) => {
            // busca o produto
            const index = response.findIndex(item => item.id === id);

            // remove o produto
            response.splice(index, 1);

            // atualiza a lista de produtos
            this._items.next(response);

            //retorna
            return isDeleted;
          }),
          catchError(super.serviceError)
        )
      )
    );
  }
}
