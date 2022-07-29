import { OverlayRef } from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Produto } from 'app/shared/models/produto.model';
import { ProdutoService } from 'app/shared/services/produto.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'notifications',
  templateUrl: './notifications.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'notifications',
})
export class NotificationsComponent implements OnInit, OnDestroy {
  @ViewChild('notificationsOrigin') private _notificationsOrigin: MatButton;
  @ViewChild('notificationsPanel') private _notificationsPanel: TemplateRef<any>;

  notifications: Produto[];
  unreadCount: number = 0;
  private _overlayRef: OverlayRef;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private _changeDetectorRef: ChangeDetectorRef, private _notificationsService: ProdutoService) {}

  ngOnInit(): void {
    // Subscribe to notification changes
    this._notificationsService.items$.pipe(takeUntil(this._unsubscribeAll)).subscribe((notifications: Produto[]) => {
      // Load the notifications
      this.notifications = notifications;

      // Calculate the unread count
      this._calculateUnreadCount();

      // Mark for check
      this._changeDetectorRef.markForCheck();
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();

    // Dispose the overlay
    if (this._overlayRef) {
      this._overlayRef.dispose();
    }
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  private _calculateUnreadCount(): void {
    let count = 0;

    if (this.notifications && this.notifications.length) {
      count = this.notifications.length;
    }

    this.unreadCount = count;
  }
}
