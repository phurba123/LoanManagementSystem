import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
import { ApiResponse } from '../models/apiresponse.model';
import { Loan, LoanStatusEnum } from '../models/loan.model';
import { LoansService } from '../services/loans.service';
import { AddLoanComponent } from './add-loan/add-loan.component';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css']
})
export class LoansComponent implements OnInit, OnDestroy {

  displayColumn = ['SN', 'customerName', 'loanType', 'totalAmount', 'amountPaid', 'amountDue', 'loanStatus', 'actions'];
  loansList!: Loan [];
  loanResult!: ApiResponse;

  private _onDestroy$: Subject<boolean> = new Subject();

  constructor(
    private _loanService: LoansService,
    private _snackbar: MatSnackBar,
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllLoans();
  }

  getAllLoans(): void {
    this._loanService.getLoans()
    .pipe(takeUntil(this._onDestroy$))
    .subscribe((res: ApiResponse) => {
      this.loanResult = res;
      this.loansList = this.loanResult.data;
    },
    (err: any) => {
      this.showSnackbar("Some Error Occured");
    })
  }

  openAddDialog(): void {
    this._dialog.open(AddLoanComponent, {
      data:''
    })
    .afterClosed()
    .pipe(takeUntil(this._onDestroy$))
    .subscribe((val: any) => {
      if (val && val!==undefined) {
        console.log('got value : ', val)
        let newLoanObj: Loan = {
          customerId: val.customer._id,
          customerName: `${val.customer.firstName} ${val.customer.lastName}`,
          loanType: val.loanType,
          totalAmount: val.totalAmount,
          amountPaid: 0,
          amountDue: val.totalAmount,
          loanIssueDate: new Date(),
          loanStatus: LoanStatusEnum.ACTIVE
        };
        this.addNewLoan(newLoanObj);
      }
    },
    (err: any) => {
      console.log(err);
    })
  }

  addNewLoan(newLoan: Loan): void {
    this._loanService.createLoan(newLoan)
    .pipe(takeUntil(this._onDestroy$))
    .subscribe((res: ApiResponse) => {
      console.log('res after adding loan : ', res);
      this.showSnackbar("New Loan Added");
      this.loansList = [...this.loansList, res.data];
    },
    (err: any) => {
      this.showSnackbar("Some Error Occured");
    })
  }

  showSnackbar(message: string) {
    this._snackbar.open(message, "Close", {
      duration: 1500
    })
  }

  ngOnDestroy(): void {
    this._onDestroy$.next(true);
    this._onDestroy$.complete();
  }

}
