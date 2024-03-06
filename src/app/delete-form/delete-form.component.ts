import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-form',
  templateUrl: './delete-form.component.html',
  styleUrls: ['./delete-form.component.scss']
})
export class DeleteFormComponent {
  @Output() cancel = new EventEmitter<any>()
  @Output() deleteItem = new EventEmitter<any>()
}
