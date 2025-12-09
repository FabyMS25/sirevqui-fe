import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

// Custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const form = formGroup as FormGroup;
    const control = form.controls[controlName];
    const matchingControl = form.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
      return null;
    }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
      return { mustMatch: true };
    } else {
      matchingControl.setErrors(null);
      return null;
    }
  };
}
