import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';
import { MaterialModules } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { AddEditDialogComponent } from './customers-dialogs/add-edit-dialog/add-edit-dialog.component';


@NgModule({
  declarations: [
    CustomersComponent,
    AddEditDialogComponent
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    MaterialModules,
    SharedModule
  ]
})
export class CustomersModule { }
