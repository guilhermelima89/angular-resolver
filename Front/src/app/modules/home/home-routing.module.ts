import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtualizacaoCadastralResolver } from 'app/shared/resolvers/atualizacao-cadastral.resolver';
import { HomeComponent } from './pages/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: {
      data: AtualizacaoCadastralResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
