import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { AtualizacaoCadastral } from 'app/shared/models/atualizacao-cadastral.model';
import { Pagination } from 'app/shared/models/pagination.model';
import { AtualizacaoCadastralService } from 'app/shared/services/atualizacao-cadastral.service';
import { debounceTime, map, merge, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator) _paginator: MatPaginator;

  public isLoading: boolean = false;

  public searchInputControl: UntypedFormControl = new UntypedFormControl();
  public pagination: Pagination;
  public data$: Observable<AtualizacaoCadastral[]>;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _matDialog: MatDialog,
    private _crudService: AtualizacaoCadastralService
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

  openComposeDialog(item: AtualizacaoCadastral): void {
    const dialogRef = this._matDialog.open(DetailsComponent, {
      autoFocus: false,
      data: item,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // this.obterAtualizacoes();
      }
    });
  }
}
