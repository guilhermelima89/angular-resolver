import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FuseAlertModule } from '@fuse/components/alert';
import { MaterialModule } from 'app/shared/material.module';
import { SharedModule } from 'app/shared/shared.module';
import { DetailsComponent } from './components/details/details.component';
import { GeneratePdfComponent } from './components/generate-pdf/generate-pdf.component';
import { TableComponent } from './components/table/table.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home.component';

@NgModule({
  declarations: [HomeComponent, TableComponent, DetailsComponent, GeneratePdfComponent],
  imports: [CommonModule, HomeRoutingModule, MaterialModule, SharedModule, FuseAlertModule],
})
export class HomeModule {}
