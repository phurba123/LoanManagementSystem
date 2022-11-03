import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoansRoutingModule } from './loans-routing.module';
import { LoansComponent } from './loans.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModules } from '../material.module';
import { AddLoanComponent } from './add-loan/add-loan.component';


@NgModule({
  declarations: [
    LoansComponent,
    AddLoanComponent
  ],
  imports: [
    CommonModule,
    LoansRoutingModule,
    SharedModule,
    MaterialModules
  ]
})
export class LoansModule { }
