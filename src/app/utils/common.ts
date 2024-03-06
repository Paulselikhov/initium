import { UntypedFormGroup } from "@angular/forms";

export const isFormGroupValidated = (formGroup: UntypedFormGroup): boolean => {
    let isValid = true;
    Object.keys(formGroup.controls).forEach((key) => {
      if (formGroup.controls.hasOwnProperty(key)) {
        const control = formGroup.controls[key];
        control.markAsTouched({onlySelf: true});
        control.markAsDirty({onlySelf: true});
      }
  
      if (formGroup.controls[key].status === 'INVALID') {
        isValid = false;
      }
    });
  
    return isValid;
  }