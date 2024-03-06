import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, UntypedFormControl, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { IClient, MODES } from '../model/client.model';
import { isFormGroupValidated } from '../utils/common';

function russiaPhoneValidator(control: AbstractControl): ValidationErrors | null {
  const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/; // Российский формат номера +7 (XXX) XXX-XX-XX
  if (control.value && !(phoneRegex.test(control.value))) {
    return { invalidRussiaPhone: true };
  }
  return null;
}

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss']
})
export class AddFormComponent implements OnInit {
  @Input() title!: string 
  @Input() mode!: MODES 
  @Input() item?: IClient 
  @Output() cancel = new EventEmitter<any>()
  @Output() addItem = new EventEmitter<any>()
  @Output() submit = new EventEmitter<any>()

  formGroup: UntypedFormGroup = new UntypedFormGroup(
    {
      name: new UntypedFormControl(null, [Validators.required, Validators.minLength(2)]),
      surname: new UntypedFormControl(null, [Validators.required, Validators.minLength(2)]),
      email: new UntypedFormControl(null, [Validators.required, Validators.email]),
      phone: new UntypedFormControl(null, [Validators.required, russiaPhoneValidator]),
    },
  )

  ngOnInit(): void {
    this.formGroup.reset()
    if(this.mode === MODES.EDIT){
      this.formGroup.patchValue({
        name: this.item?.name,
        surname: this.item?.surname,
        email: this.item?.email,
        phone: this.item?.phone,
     })
    }
  }

  onSubmit(){
    if(isFormGroupValidated(this.formGroup)){
        const controls = this.formGroup.controls
        const data: IClient = {
          id: this.mode === MODES.ADD ? Math.floor(Math.random() * 99999999) + 1 : this.item?.id,
          name: controls['name'].value,
          surname: controls['surname'].value,
          email: controls['email'].value,
          phone: controls['phone'].value,
       }
      this.submit.emit({mode: this.mode, item: data})
    }
    
  }
}
