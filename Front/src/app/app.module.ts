import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FuseModule } from '@fuse';
import { FuseConfigModule } from '@fuse/services/config';
import { AppRoutingModule } from 'app/app-routing.module';
import { AppComponent } from 'app/app.component';
import { appConfig } from 'app/core/config/app.config';
import { CoreModule } from 'app/core/core.module';
import { LayoutModule } from 'app/layout/layout.module';
import { getDutchPaginatorIntl } from './shared/utils/duch-paginator';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,

    // Fuse & Fuse Mock API
    FuseModule,
    FuseConfigModule.forRoot(appConfig),

    // Core
    CoreModule,

    // Layout
    LayoutModule,
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getDutchPaginatorIntl() },
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR',
    },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
