import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { fuseAnimations } from '@fuse/animations';
import { Pagination } from 'app/shared/models/pagination.model';
import { Texto } from 'app/shared/models/texto.model';
import { TextoService } from 'app/shared/services/texto.service';
import { debounceTime, map, merge, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: fuseAnimations,
})
export class TableComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator) _paginator: MatPaginator;

  public isLoading: boolean = false;

  public searchInputControl: UntypedFormControl = new UntypedFormControl();
  public pagination: Pagination;
  public data$: Observable<Texto[]>;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _crudService: TextoService,
    private _matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.data$ = this._crudService.items$;

    this._crudService.pagination$.pipe(takeUntil(this._unsubscribeAll)).subscribe((pagination: Pagination) => {
      this.pagination = pagination;
      this._changeDetectorRef.markForCheck();
    });

    this.searchInputControl.valueChanges
      .pipe(
        takeUntil(this._unsubscribeAll),
        debounceTime(300),
        switchMap((query) => {
          this.isLoading = true;
          return this._crudService.getAll(1, 10, query);
        }),
        map(() => {
          this.isLoading = false;
        })
      )
      .subscribe();
  }

  ngAfterViewInit(): void {
    if (this._paginator) {
      this._changeDetectorRef.markForCheck();

      merge(this._paginator.page)
        .pipe(
          switchMap(() => {
            this.isLoading = true;
            return this._crudService.getAll(this._paginator.pageIndex + 1, this._paginator.pageSize);
          }),
          map(() => {
            this.isLoading = false;
          })
        )
        .subscribe();
    }
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  openDialogForm(value: Texto): void {
    this._matDialog.open(FormComponent, {
      data: value,
    });
  }
}
