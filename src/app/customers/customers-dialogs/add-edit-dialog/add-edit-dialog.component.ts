import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddEditEnum, Customer } from 'src/app/models/customer.model';
import { FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-add-edit-dialog',
  templateUrl: './add-edit-dialog.component.html',
  styleUrls: ['./add-edit-dialog.component.css']
})
export class AddEditDialogComponent implements OnInit {
  // holds a type that indicates whether current state of dialog is for adding or for editing a customer
  type!: string;
  title!: string;

  customerForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(),
    department: new FormControl(''),
    contactNo: new FormControl(),
    dob: new FormControl()
  });


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddEditDialogComponent>
  ) { }

  ngOnInit(): void {
    console.log('data received : ', this.data);
    this.type = this.data.type;
    if(this.type === AddEditEnum.AddCustomer) {
      this.title = "Add Customer";
    }
    else {
      this.title = "Edit Customer";
      this.customerForm.patchValue({
        firstName: this.data.data.firstName,
        lastName: this.data.data.lastName,
        email: this.data.data.email,
        department: this.data.data.department,
        contactNo: this.data.data.contactNo,
        dob: new Date(this.data.data.dob)
      })
    }
  }

  onSubmit(): void {
    this.dialogRef.close(this.customerForm.value)
  }

}
