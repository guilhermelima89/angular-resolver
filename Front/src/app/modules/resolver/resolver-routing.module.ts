import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TesteResolver } from 'app/shared/resolvers/teste.resolver';
import { PageListComponent } from './pages/page-list/page-list.component';

const routes: Routes = [
  {
    path: '',
    component: PageListComponent,
    resolve: {
      data: TesteResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResolverRoutingModule {}
