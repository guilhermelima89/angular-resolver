import { Component } from '@angular/core';

@Component({
  templateUrl: './page-list.component.html',
})
export class PageListComponent {
  public pageAction: string = 'Configuração';
  public page: string = 'Mensagem';
}
