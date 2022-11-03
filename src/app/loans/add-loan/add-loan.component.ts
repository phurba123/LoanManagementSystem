import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiResponse } from 'src/app/models/apiresponse.model';
import { Customer } from 'src/app/models/customer.model';
import { Loan } from 'src/app/models/loan.model';
import { CustomerService } from 'src/app/services/customer.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-loan',
  templateUrl: './add-loan.component.html',
  styleUrls: ['./add-loan.component.css']
})
export class AddLoanComponent implements OnInit, OnDestroy {
  title: string = "Add Loan";
  customers!: Customer[];
  // _id?: string,
  //   customerId: string,
  //   customerName: string,
  //   loanType: string,
  //   totalAmount: number,
  //   amountPaid: number,
  //   amountDue: number,
  //   loanIssueDate: Date | string,
  //   loanStatus: LoanStatusEnum.ACTIVE | LoanStatusEnum.INACTIVE

  loanForm = new FormGroup({
    loanType: new FormControl(''),
    totalAmount: new FormControl(),
    customer: new FormControl()
  });

  private _onDestroy$: Subject<boolean> = new Subject();

  constructor(
    private _customerService: CustomerService,
    private _dialogRef: MatDialogRef<AddLoanComponent>
  ) { }

  ngOnInit(): void {
    this._customerService.getCustomers()
    .pipe(takeUntil(this._onDestroy$))
    .subscribe((res: ApiResponse) => {
      this.customers = res.data;
    })
  }

  onSubmit(): void {
    this._dialogRef.close(this.loanForm.value)
  }

  ngOnDestroy(): void {
    this._onDestroy$.next(true);
    this._onDestroy$.complete();
  }

}
