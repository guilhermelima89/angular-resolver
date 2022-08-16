import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { Produto } from '../models/produto.model';
import { ProdutoService } from '../services/produto.service';

@Injectable({ providedIn: 'root' })
export class ProdutoDetalhesResolver implements Resolve<Produto> {
  constructor(private _service: ProdutoService, private _router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Produto> {
    return this._service.getById(route.params['id']).pipe(
      catchError((error) => {
        // volto pra url
        const parentUrl = state.url.split('/').slice(0, -2).join('/');

        // redireciono pra pagina 404
        //const parentUrl = '/home';

        this._router.navigateByUrl(parentUrl);

        return throwError(error);
      })
    );
  }
}
