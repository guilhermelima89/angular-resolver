import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { AtualizacaoCadastral } from '../models/atualizacao-cadastral.model';
import { AtualizacaoCadastralService } from '../services/atualizacao-cadastral.service';

@Injectable({ providedIn: 'root' })
export class AtualizacaoCadastralResolver implements Resolve<AtualizacaoCadastral[]> {
  constructor(private _service: AtualizacaoCadastralService) {}

  resolve(): Observable<AtualizacaoCadastral[]> {
    return this._service.getAll();
  }
}
