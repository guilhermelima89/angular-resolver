import { ElementRef } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { fromEvent, merge, Observable } from 'rxjs';
import { DisplayMessage, GenericValidator, ValidationMessages } from './generic-form-validation';

export abstract class FormBaseComponent {
  displayMessage: DisplayMessage = {};
  genericValidator: GenericValidator;
  validationMessages: ValidationMessages;

  protected configurarMensagensValidacaoBase(validationMessages: ValidationMessages): void {
    this.genericValidator = new GenericValidator(validationMessages);
  }

  protected configurarValidacaoFormularioBase(formInputElements: ElementRef[], formGroup: UntypedFormGroup): void {
    const controlBlurs: Observable<any>[] = formInputElements.map((formControl: ElementRef) =>
      fromEvent(formControl.nativeElement, 'blur')
    );

    merge(...controlBlurs).subscribe(() => {
      this.validarFormulario(formGroup);
    });
  }

  protected validarFormulario(formGroup: UntypedFormGroup): void {
    this.displayMessage = this.genericValidator.processarMensagens(formGroup);
  }
}
