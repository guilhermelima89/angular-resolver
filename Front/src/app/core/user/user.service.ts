import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  get user(): string {
    return localStorage.getItem('user') ?? '';
  }

  set user(value: string) {
    localStorage.setItem('user', value);
  }
}
