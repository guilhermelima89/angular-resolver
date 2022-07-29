import { Component } from '@angular/core';

@Component({
  templateUrl: './page-list.component.html',
})
export class PageListComponent {
  public pageAction: string = 'Produto';
  public page: string = 'Lista de Produtos';
}
