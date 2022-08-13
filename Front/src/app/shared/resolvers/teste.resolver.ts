import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class TesteResolver implements Resolve<any> {
  constructor() {}

  resolve(): void {
    console.log('resolve');
  }
}
