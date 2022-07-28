import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChildren } from '@angular/core';
import { FormControlName, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fuseAnimations } from '@fuse/animations';
import { FormBaseComponent } from 'app/shared/components/form-base.component';
import { Texto } from 'app/shared/models/texto.model';
import { TextoService } from 'app/shared/services/texto.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  animations: fuseAnimations,
})
export class FormComponent extends FormBaseComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  public form: UntypedFormGroup;
  public showAlert: boolean = false;
  public alert: any;
  public title: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) private _data: Texto,
    private _matDialogRef: MatDialogRef<FormComponent>,
    private _snackBar: MatSnackBar,
    private _formBuilder: UntypedFormBuilder,
    private _textoService: TextoService
  ) {
    super();

    this.validationMessages = {
      id: {
        required: 'O campo é obrigatório',
      },
      titulo: {
        required: 'O campo é obrigatório',
        maxlength: 'Descrição deve possuir entre 1 e 50 caracteres',
      },
      descricao: {
        required: 'O campo é obrigatório',
        maxlength: 'Descrição deve possuir entre 1 e 250 caracteres',
      },
    };

    this.title = this._data.id ? 'Atualizar' : 'Adicionar';

    super.configurarMensagensValidacaoBase(this.validationMessages);
  }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      id: [this._data.id, [Validators.required]],
      titulo: [this._data.titulo, [Validators.required, Validators.maxLength(50)]],
      descricao: [this._data.descricao, [Validators.required, Validators.maxLength(250)]],
      tipoTextoId: [this._data.tipoTextoId, [Validators.required]],
    });
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormularioBase(this.formInputElements, this.form);
  }

  close(): void {
    this._matDialogRef.close();
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.form.disable();
    this.showAlert = false;

    const data = this.form.value;

    this._textoService.update(data.id, data).subscribe(
      () => {
        this._snackBar.open('Processado com sucesso!', 'OK', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 2000,
        });

        this.close();
        this._textoService.getAll().subscribe();
      },
      (error) => {
        this.alert = {
          type: 'error',
          message: error.error.errors,
        };

        this.showAlert = true;
        this.form.enable();
      }
    );
  }
}
