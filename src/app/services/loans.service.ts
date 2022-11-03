import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../models/apiresponse.model';
import { Loan } from '../models/loan.model';

const BASE_URL = environment.BASE_URL_API + environment.LOAN_ENDPOINTS.LOAN_BASE_ENDPOINT;

@Injectable({
  providedIn: 'root'
})
export class LoansService {

  constructor(
    private _http: HttpClient
  ) { }

  getLoans(): Observable<ApiResponse> {
    let url = BASE_URL + environment.LOAN_ENDPOINTS.GET_ALL_LOANS;

    return this._http.get<ApiResponse>(url);
  }

  createLoan(newLoan: Loan): Observable<ApiResponse> {
    let url = BASE_URL + environment.LOAN_ENDPOINTS.CREATE_LOAN;
    return this._http.post<ApiResponse>(url, newLoan);
  }

  // editCustomerById(id: string | number, newLoanObj: Loan): Observable<ApiResponse> {
  //   let url ;
  //   return this._http.put<ApiResponse>(`${url}/${id}`, newLoanObj);
  // }
}
