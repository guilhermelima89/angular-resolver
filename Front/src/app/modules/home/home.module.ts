import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FuseAlertModule } from '@fuse/components/alert';
import { MaterialModule } from 'app/shared/material.module';
import { SharedModule } from 'app/shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home.component';
import { CountComponent } from './components/count/count.component';
import { PdfComponent } from './components/pdf/pdf.component';

@NgModule({
  declarations: [HomeComponent, CountComponent, PdfComponent],
  imports: [CommonModule, HomeRoutingModule, MaterialModule, SharedModule, FuseAlertModule],
})
export class HomeModule {}
