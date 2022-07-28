import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { FuseFullscreenModule } from '@fuse/components/fullscreen';
import { FuseLoadingBarModule } from '@fuse/components/loading-bar';
import { FuseNavigationModule } from '@fuse/components/navigation';
import { DarkModeModule } from 'app/layout/common/dark-mode/dark-mode.module';
import { CenteredLayoutComponent } from 'app/layout/layouts/horizontal/centered/centered.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [CenteredLayoutComponent],
  imports: [
    HttpClientModule,
    RouterModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
    FuseFullscreenModule,
    FuseLoadingBarModule,
    FuseNavigationModule,
    SharedModule,
    DarkModeModule,
  ],
  exports: [CenteredLayoutComponent],
})
export class CenteredLayoutModule {}
