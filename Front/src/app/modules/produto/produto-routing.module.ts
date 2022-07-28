import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TextoResolver } from 'app/shared/resolvers/texto.resolver';
import { PageListComponent } from './pages/page-list/page-list.component';

const routes: Routes = [
  {
    path: '',
    component: PageListComponent,
    resolve: {
      data: TextoResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProdutoRoutingModule {}
