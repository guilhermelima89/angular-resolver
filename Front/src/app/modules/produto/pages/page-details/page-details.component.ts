import { Component } from '@angular/core';

@Component({
  selector: 'app-page-details',
  templateUrl: './page-details.component.html',
})
export class PageDetailsComponent {
  public pageAction: string = 'Produto';
  public page: string = 'Detalhes do Produto';
}
