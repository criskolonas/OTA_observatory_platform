import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

import {UserLoginInterface, UserLoginResultsInterface, UserSessionInterface} from "../interfaces/UserFormInterface";

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  logoutUser(): Observable<UserLoginResultsInterface> {
    return this.http.get<UserLoginResultsInterface>(this.apiUrl + 'logout', {
      withCredentials: true
    });
  }
}
