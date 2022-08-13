import { OverlayRef } from '@angular/cdk/overlay';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Produto } from 'app/shared/models/produto.model';
import { ProdutoService } from 'app/shared/services/produto.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-count',
  templateUrl: './count.component.html',
  styleUrls: ['./count.component.scss'],
})
export class CountComponent implements OnInit, OnDestroy {
  items: number = 0;
  private _overlayRef: OverlayRef;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private _changeDetectorRef: ChangeDetectorRef, private _produtoService: ProdutoService) {}

  ngOnInit(): void {
    this._produtoService.items$.pipe(takeUntil(this._unsubscribeAll)).subscribe((response: Produto[]) => {
      if (response && response.length) {
        this.items = response.length;
      }

      this._changeDetectorRef.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();

    if (this._overlayRef) {
      this._overlayRef.dispose();
    }
  }
}
