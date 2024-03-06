import { Component, OnInit } from '@angular/core';
import { IClient, IClientWithSelect, MODES } from '../model/client.model';
import { ClientService } from './service/clients.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  tableItems: IClientWithSelect[] = [...JSON.parse(localStorage.getItem('clients')!)]

  isFormVisible = false
  isDeleteDialogVisible = false

  item?: IClient
  mode: MODES = MODES.ADD
  MODES = MODES
  selectAll: boolean = false

  constructor(
    private service: ClientService,
  ) {
    if (!this.tableItems.length) {
      this.service.getClients().subscribe(res => this.tableItems = res)
    }

  }

  submit($event: { mode: MODES, item: IClient }) {
    switch ($event.mode) {
      case MODES.ADD:
        if ($event.item) this.tableItems.push({ ...$event.item, selected: false })
        localStorage.setItem('clients', JSON.stringify(this.tableItems))
        break
      case MODES.EDIT:
        if ($event.item) {
          this.tableItems = this.tableItems.map(i => i.id === $event.item?.id ? { ...$event.item, selected: false } : i)
          localStorage.setItem('clients', JSON.stringify(this.tableItems))
        }
        break
    }
    this.isFormVisible = false
  }

  openForm(mode: MODES, item?: IClient) {
    switch (mode) {
      case MODES.ADD:
        this.item = undefined
        this.mode = MODES.ADD
        break
      case MODES.EDIT:
        this.item = item
        this.mode = MODES.EDIT
        break
    }
    this.isFormVisible = true
  }

  cancel() {
    this.isFormVisible = false
  }

  deleteItem() {
    this.tableItems = this.tableItems.filter(i => !i.selected)
    localStorage.setItem('clients', JSON.stringify(this.tableItems))
    this.isDeleteDialogVisible = false
    this.selectAll = false
  }

  itemSelectionChanged() {
    this.selectAll = this.tableItems.every(item => item.selected);
  }

  selectAllItems() {
    console.log(this.selectAll)
    for (const item of this.tableItems) {
      item.selected = this.selectAll;
    }
    
  }

  deleteDialogVisibleChange() {
    if(this.tableItems.filter(i => i.selected).length) this.isDeleteDialogVisible = true
  }

  cancelDeleteDialog() {
    this.isDeleteDialogVisible = false
  }

}
