import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { IClient, MODES } from '../model/client.model';

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
      id: new UntypedFormControl(null, [Validators.required]),
      name: new UntypedFormControl(null, [Validators.required]),
      surname: new UntypedFormControl(null, [Validators.required]),
      email: new UntypedFormControl(null, [Validators.required]),
      phone: new UntypedFormControl(null, [Validators.required]),
    },
  )

  ngOnInit(): void {
    this.formGroup.reset()
    if(this.mode === MODES.EDIT){
      this.formGroup.patchValue({
        id: this.item?.id,
        name: this.item?.name,
        surname: this.item?.surname,
        email: this.item?.email,
        phone: this.item?.phone,
     })
    }
  }

  onSubmit(){
    const controls = this.formGroup.controls
    const data: IClient = {
      id: this.mode === 'add' ? Math.floor(Math.random() * 99999999) + 1 : controls['id'].value,
      name: controls['name'].value,
      surname: controls['surname'].value,
      email: controls['email'].value,
      phone: controls['phone'].value,
    }
    this.submit.emit({mode: this.mode, item: data})
  }
}
