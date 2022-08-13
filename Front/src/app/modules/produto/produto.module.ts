import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FuseAlertModule } from '@fuse/components/alert';
import { MaterialModule } from 'app/shared/material.module';
import { SharedModule } from 'app/shared/shared.module';
import { CountComponent } from './components/count/count.component';
import { FormComponent } from './components/form/form.component';
import { TableComponent } from './components/table/table.component';
import { PageListComponent } from './pages/page-list/page-list.component';
import { ProdutoRoutingModule } from './produto-routing.module';
@NgModule({
  declarations: [PageListComponent, FormComponent, TableComponent, CountComponent],
  imports: [CommonModule, ProdutoRoutingModule, MaterialModule, SharedModule, FuseAlertModule],
})
export class ProdutoModule {}
