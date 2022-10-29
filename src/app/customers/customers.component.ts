import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  // mock table column and data for customer table
  displayColumn = ['customerId', 'firstName', 'lastName', 'contact', 'email', 'address', 'department'];
  tableData: {}[] = [
    {
      customerId: 1,
      firstName: 'phurba',
      lastName: 'sherpa',
      contact: 2348283848,
      email: 'fakemail@gmail.com',
      address: 'fake address, fake street',
      department: 'department 1'
    },
    {
      customerId: 2,
      firstName: 'dawa',
      lastName: 'sherpa',
      contact: 43555678443,
      email: 'fakemail2@gmail.com',
      address: 'fake address, fake colony',
      department: 'department 1'
    },
    {
      customerId: 3,
      firstName: 'namgyal',
      lastName: 'sherpa',
      contact: 4433223345,
      email: 'fakemail3@gmail.com',
      address: 'fake address, fake street',
      department: 'department 1'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
