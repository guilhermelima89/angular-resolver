import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Texto } from '../models/texto.model';
import { TextoService } from '../services/texto.service';

@Injectable({ providedIn: 'root' })
export class TextoResolver implements Resolve<Texto> {
  constructor(private _service: TextoService) {}

  resolve(): Observable<Texto> {
    return this._service.getAll();
  }
}
