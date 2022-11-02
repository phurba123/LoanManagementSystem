import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { MatDialog } from '@angular/material/dialog'
import { AddEditDialogComponent } from './customers-dialogs/add-edit-dialog/add-edit-dialog.component';
import { AddEditEnum, Customer } from '../models/customer.model';
import { Subject, Observable, takeUntil } from 'rxjs';
import { ApiResponse } from '../models/apiresponse.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit, OnDestroy {

  // mock table column and data for customer table
  displayColumn = ['SN', 'firstName', 'lastName', 'contactNo', 'email', 'dob', 'department', 'actions'];
  customerResults: any;
  customerList!: Customer[];
  newCustomerObj!: Customer;

  onDestroy$: Subject<boolean> = new Subject();

  constructor(
    private _customerService: CustomerService,
    private _dialog: MatDialog,
    private _snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getAllCustomers();
  }

  getAllCustomers(): void {
    this._customerService.getCustomers().subscribe((res: ApiResponse) => {
      this.customerResults = res;
      this.customerList = this.customerResults.data;
      this.customerList
      // simple formatting of date
      this.customerList.forEach((customer: Customer )=> {
        if(customer.dob) {
          customer.dob = new Date(customer.dob).toLocaleDateString()
        }
      });
    })
  }

  openAddDialog(): void {
    this._dialog.open(AddEditDialogComponent, {
      data: {
        type: AddEditEnum.AddCustomer
      }
    })
    .afterClosed()
    .pipe(takeUntil(this.onDestroy$))
    .subscribe((val: Customer) => {
      if(val) {
        // val.
        this.newCustomerObj = {
          firstName: val.firstName,
          lastName: val.lastName,
          email: val.email,
          dob: val.dob,
          department: val.department,
          contactNo: val.contactNo
        };

        // call create customer method
        this.addNewCustomer(this.newCustomerObj);
      }
    })
  }

  addNewCustomer(customer: Customer): void {
    this._customerService.createCustomer(customer)
    .pipe(takeUntil(this.onDestroy$))
    .subscribe((res: ApiResponse) => {
      res.data.dob = new Date(res.data.dob).toLocaleDateString();
      this.customerList = [...this.customerList, res.data];
      this.showSnackbar("Customer Created");
    })
  }

  deleteCustomer(customerId: string| number) {
    this._customerService.deleteCustomerById(customerId).subscribe((res: ApiResponse) => {
      this.showSnackbar("Customer Deleted");
      this.customerList = this.customerList.filter((customer: Customer) => customer._id !== customerId);
    },
    (err: any) => {
      this.showSnackbar("Some Error Occured");
    })
  }

  openEditCustomer(customer: Customer): void {
    console.log('customer : ', customer)
    this._dialog.open(AddEditDialogComponent, {
      data: {
        type: AddEditEnum.EditCustomer,
        data: customer
      }
    })
    .afterClosed()
    .pipe(takeUntil(this.onDestroy$))
    .subscribe((val: Customer) => {
      if(val) {
        this.newCustomerObj = {
          firstName: val.firstName,
          lastName: val.lastName,
          email: val.email,
          dob: val.dob,
          department: val.department,
          contactNo: val.contactNo
        };
        // call edit customer method
        this.editCustomer(this.newCustomerObj, customer._id);
      }
    })
  }

  editCustomer(customer: Customer, id: string| number): void {
    this._customerService.editCustomerById(id, customer)
    .pipe(takeUntil(this.onDestroy$)).subscribe(
      (res: ApiResponse) => {
        this.showSnackbar("Customer Edited");
        console.log('res: ', res.data);
        this.customerList =  this.customerList.map((singleCustomer: Customer) => {
          if(singleCustomer._id === id) {
            singleCustomer = res.data;
            singleCustomer.dob = new Date(singleCustomer.dob).toLocaleDateString()
          };
          return singleCustomer;
        })
      },
      (err: any) => {
        this.showSnackbar("Some Error Occured");
      }
    )
  }

  showSnackbar(message: string) {
    this._snackbar.open(message, "Close", {
      duration: 1500
    })
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

}
