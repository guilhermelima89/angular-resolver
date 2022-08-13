import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResolverRoutingModule } from './resolver-routing.module';
import { PageListComponent } from './pages/page-list/page-list.component';


@NgModule({
  declarations: [
    PageListComponent
  ],
  imports: [
    CommonModule,
    ResolverRoutingModule
  ]
})
export class ResolverModule { }
