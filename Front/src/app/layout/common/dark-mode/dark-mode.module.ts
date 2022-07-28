import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DarkModeComponent } from './dark-mode.component';

@NgModule({
  declarations: [DarkModeComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTooltipModule],
  exports: [DarkModeComponent],
})
export class DarkModeModule {}
