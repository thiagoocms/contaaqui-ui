import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

/**
 * Validador para CPF/CNPJ que aceita apenas números e verifica o comprimento
 * Válido quando tiver 11 (CPF) ou 14 (CNPJ) dígitos.
 */
export function documentValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const raw = (control.value ?? '').toString();
    const digits = raw.replace(/\D/g, '');

    if (digits?.length === 11 || digits?.length === 14) return null;

    return {documentInvalid: true};
  };
}
