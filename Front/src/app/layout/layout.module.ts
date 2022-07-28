import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LayoutComponent } from 'app/layout/layout.component';
import { EmptyLayoutModule } from 'app/layout/layouts/empty/empty.module';
import { SharedModule } from 'app/shared/shared.module';
import { CenteredLayoutModule } from './layouts/horizontal/centered/centered.module';

const layoutModules = [
  // Empty
  EmptyLayoutModule,

  // Horizontal navigation
  CenteredLayoutModule,
];

@NgModule({
  declarations: [LayoutComponent],
  imports: [MatIconModule, MatTooltipModule, SharedModule, ...layoutModules],
  exports: [LayoutComponent, ...layoutModules],
})
export class LayoutModule {}
