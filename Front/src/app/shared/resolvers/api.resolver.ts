import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiEmail } from '../models/api-email.model';
import { ApiService } from '../services/api.service';

@Injectable({ providedIn: 'root' })
export class ApiResolver implements Resolve<ApiEmail> {
  constructor(private _service: ApiService) {}

  resolve(): Observable<ApiEmail> {
    return this._service.getById(1);
  }
}
