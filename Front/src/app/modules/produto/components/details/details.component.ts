import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Produto } from 'app/shared/models/produto.model';
import { ProdutoService } from 'app/shared/services/produto.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent implements OnInit, OnDestroy {
  public model: Produto;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private _changeDetectorRef: ChangeDetectorRef, private _service: ProdutoService) {}

  ngOnInit(): void {
    this._service.item$.pipe(takeUntil(this._unsubscribeAll)).subscribe((item: Produto) => {
      this.model = item;

      this._changeDetectorRef.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
