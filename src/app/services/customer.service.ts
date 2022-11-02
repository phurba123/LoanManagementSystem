import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/apiresponse.model';
import { Customer } from '../models/customer.model';

const BASE_URL = environment.BASE_URL_API+ environment.CUSTOMER_ENDPOINTS.CUSTOMER_BASE_ENDPOINT;

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private _http: HttpClient,
    private _snackbar: MatSnackBar
  ) { }

  getCustomers(): Observable<ApiResponse> {
    let url = BASE_URL + environment.CUSTOMER_ENDPOINTS.GET_ALL_CUSTOMERS;

    return this._http.get<ApiResponse>(url);
  }

  createCustomer(customer: Customer): Observable<ApiResponse> {
    let url = BASE_URL  + environment.CUSTOMER_ENDPOINTS.CREATE_CUSTOMER;
    return this._http.post<ApiResponse>(url, customer);
  }

  editCustomerById(id: string | number, newCustomerObj: any): Observable<ApiResponse> {
    let url = BASE_URL  + environment.CUSTOMER_ENDPOINTS.EDIT_CUSTOMER;
    return this._http.put<ApiResponse>(`${url}/${id}`, newCustomerObj);
  }

  deleteCustomerById(id: string | number): Observable<ApiResponse> {
    let url = BASE_URL  + environment.CUSTOMER_ENDPOINTS.DELETE_CUSTOMER;
    return this._http.delete<ApiResponse>(`${url}/${id}`);
  }

  searchCustomer(keyword: string) {
    //
  }
}
