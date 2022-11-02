import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Customer } from 'src/app/models/customer.model';

@Component({
  selector: 'lms-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // dataSource = [...ELEMENT_DATA];

  @Input() displayedColumns!: string[];
  @Input() tableDataSource!: {}[];
  @Input() enableEdit!: boolean;
  @Input() enableDelete!: boolean;

  // emits id of current customer, setting it to string | number
  @Output() dataToDelete: EventEmitter<string| number> = new EventEmitter();
  @Output() dataToEdit: EventEmitter<Customer> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  emitDeleteEvent(customer: Customer): void {
    this.dataToDelete.emit(customer._id);
  }

  emitEditEvent(customer: Customer): void {
    this.dataToEdit.emit(customer);
  }

}
