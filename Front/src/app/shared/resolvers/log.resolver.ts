import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Log } from '../models/log.model';
import { LogService } from '../services/log.service';

@Injectable({ providedIn: 'root' })
export class LogResolver implements Resolve<Log[]> {
  constructor(private _service: LogService) {}

  resolve(): Observable<Log[]> {
    return this._service.getAll();
  }
}
