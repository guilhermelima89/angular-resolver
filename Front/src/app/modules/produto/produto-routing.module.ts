import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutoDetalhesResolver } from 'app/shared/resolvers/produto-detalhes.resolver';
import { ProdutoResolver } from 'app/shared/resolvers/produto.resolver';
import { PageDetailsComponent } from './pages/page-details/page-details.component';
import { PageListComponent } from './pages/page-list/page-list.component';

const routes: Routes = [
  {
    path: '',
    component: PageListComponent,
    resolve: {
      data: ProdutoResolver,
    },
  },
  {
    path: 'detalhes/:id',
    component: PageDetailsComponent,
    resolve: {
      data: ProdutoDetalhesResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProdutoRoutingModule {}
