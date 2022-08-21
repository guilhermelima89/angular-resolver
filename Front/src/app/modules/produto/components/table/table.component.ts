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
import { MatSnackBar } from '@angular/material/snack-bar';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Pagination } from 'app/shared/models/pagination.model';
import { Produto } from 'app/shared/models/produto.model';
import { ProdutoService } from 'app/shared/services/produto.service';
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
  public showAlert: boolean = false;
  public alert: any;

  public searchInputControl: UntypedFormControl = new UntypedFormControl();
  public pagination: Pagination;
  public data$: Observable<Produto[]>;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _produtoService: ProdutoService,
    private _matDialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _fuseConfirmationService: FuseConfirmationService
  ) {}

  ngOnInit(): void {
    this._produtoService.pagination$.pipe(takeUntil(this._unsubscribeAll)).subscribe((pagination: Pagination) => {
      this.pagination = pagination;
      this._changeDetectorRef.markForCheck();
    });

    this.data$ = this._produtoService.items$;

    this.searchInputControl.valueChanges
      .pipe(
        takeUntil(this._unsubscribeAll),
        debounceTime(300),
        switchMap((query) => {
          this.isLoading = true;
          return this._produtoService.getAll(1, 10, query);
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
            return this._produtoService.getAll(
              this._paginator.pageIndex + 1,
              this._paginator.pageSize,
              this.searchInputControl.value ?? ''
            );
          }),
          map(() => {
            this.isLoading = false;
            console.log(this.searchInputControl.value);
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

  openDialogForm(value: Produto): void {
    this._matDialog.open(FormComponent, {
      data: value,
    });
  }

  deleteItem(id: number): void {
    const confirmation = this._fuseConfirmationService.open({
      title: 'Atenção',
      message: 'Tem certeza que deseja remover esta informação? Essa ação não pode ser desfeita!',
      actions: {
        confirm: {
          label: 'Remover',
        },
        cancel: {
          label: 'Cancelar',
        },
      },
    });

    confirmation.afterClosed().subscribe((result) => {
      if (result === 'confirmed') {
        this._produtoService.delete(id).subscribe(
          () => {
            this._snackBar.open('Processado com sucesso!', 'OK', {
              horizontalPosition: 'center',
              verticalPosition: 'top',
              duration: 2000,
            });
          },
          (error) => {
            this.alert = {
              type: 'error',
              message: error.error.errors,
            };

            this.showAlert = true;
            this._changeDetectorRef.markForCheck();
          }
        );
      }
    });
  }
}
