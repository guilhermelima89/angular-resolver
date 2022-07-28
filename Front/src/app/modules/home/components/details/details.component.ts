import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fuseAnimations } from '@fuse/animations';
import { AtualizacaoCadastral } from 'app/shared/models/atualizacao-cadastral.model';
import { AtualizacaoCadastralService } from 'app/shared/services/atualizacao-cadastral.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None,
})
export class DetailsComponent implements OnInit {
  public showAlert: boolean = false;
  public loading: boolean = false;
  public alert: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AtualizacaoCadastral,
    public matDialogRef: MatDialogRef<DetailsComponent>,
    private _crudService: AtualizacaoCadastralService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  saveAndClose(): void {
    this.matDialogRef.close(false);
  }

  send(id: number): void {
    this.showAlert = false;
    this.loading = true;

    this._crudService.conclude(id).subscribe(
      () => {
        this._snackBar.open('Processado com sucesso!', '', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 2000,
        });

        this._crudService.getAll().subscribe();
        this.loading = false;
        this.matDialogRef.close(true);
      },
      (error) => {
        this.alert = {
          type: 'error',
          message: error.error.errors,
        };

        this.loading = false;
        this.showAlert = true;
      }
    );
  }
}
