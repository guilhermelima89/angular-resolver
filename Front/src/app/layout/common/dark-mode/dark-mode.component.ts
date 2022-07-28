import { Component, OnDestroy, OnInit } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config';
import { AppConfig, Scheme } from 'app/core/config/app.config';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dark-mode',
  templateUrl: './dark-mode.component.html',
})
export class DarkModeComponent implements OnInit, OnDestroy {
  config: AppConfig;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private _fuseConfigService: FuseConfigService) {}

  ngOnInit(): void {
    this._fuseConfigService.config$.pipe(takeUntil(this._unsubscribeAll)).subscribe((config: AppConfig) => {
      this.config = config;
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  setScheme(scheme: Scheme): void {
    this._fuseConfigService.config = { scheme };
  }
}
