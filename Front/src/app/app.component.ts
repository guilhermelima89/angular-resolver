import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styles: [
    `
      :host {
        display: flex;
        flex: 1 1 auto;
        width: 100%;
        height: 100%;
      }
    `,
  ],
})
export class AppComponent {}
