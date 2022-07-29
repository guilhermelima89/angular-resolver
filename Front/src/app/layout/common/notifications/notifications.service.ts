import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Notification } from 'app/layout/common/notifications/notifications.types';
import { BaseService } from 'app/shared/services/base.service';
import { Observable, ReplaySubject } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService extends BaseService {
  private _notifications: ReplaySubject<Notification[]> = new ReplaySubject<Notification[]>(1);

  constructor(private _httpClient: HttpClient) {
    super();
  }

  get notifications$(): Observable<Notification[]> {
    return this._notifications.asObservable();
  }

  getAll(): Observable<Notification[]> {
    return this._httpClient.get<Notification[]>(this.apiUrl + 'MensagemNotificao').pipe(
      tap((notifications) => {
        this._notifications.next(notifications);
      })
    );
  }

  create(notification: Notification): Observable<Notification> {
    return this.notifications$.pipe(
      take(1),
      switchMap(notifications =>
        this._httpClient.post<Notification>('api/common/notifications', { notification }).pipe(
          map((newNotification) => {
            // Update the notifications with the new notification
            this._notifications.next([...notifications, newNotification]);

            // Return the new notification from observable
            return newNotification;
          })
        )
      )
    );
  }

  update(id: string, value: Notification): Observable<Notification> {
    return this.notifications$.pipe(
      take(1),
      switchMap(items =>
        this._httpClient.put<Notification>(this.apiUrl + 'MensagemNotificao/' + id, value).pipe(
          map((response: Notification) => {
            // Find the index of the updated notification
            const index = items.findIndex(x => x.id === id);

            // Update the notification
            items[index] = value;

            // Update the notifications
            this._notifications.next(items);

            // Return the updated notification
            return response;
          })
        )
      )
    );
  }

  delete(id: string): Observable<boolean> {
    return this.notifications$.pipe(
      take(1),
      switchMap(notifications =>
        this._httpClient.delete<boolean>(this.apiUrl + 'MensagemNotificao/' + id).pipe(
          map((isDeleted: boolean) => {
            // Find the index of the deleted notification
            const index = notifications.findIndex(item => item.id === id);

            // Delete the notification
            notifications.splice(index, 1);

            // Update the notifications
            this._notifications.next(notifications);

            // Return the deleted status
            return isDeleted;
          })
        )
      )
    );
  }

  markAllAsRead(): Observable<boolean> {
    return this.notifications$.pipe(
      take(1),
      switchMap(notifications =>
        this._httpClient.post<boolean>(this.apiUrl + 'MensagemNotificao/marcar-todos', null).pipe(
          map((isUpdated: boolean) => {
            // Go through all notifications and set them as read
            notifications.forEach((notification, index) => {
              notifications[index].read = true;
            });

            // Update the notifications
            this._notifications.next(notifications);

            // Return the updated status
            return isUpdated;
          })
        )
      )
    );
  }
}
