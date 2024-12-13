import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {UserLoginInterface, UserLoginResultsInterface} from "../interfaces/UserFormInterface";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  postLoginData(loginData:UserLoginInterface): Observable<UserLoginResultsInterface> {
    return this.http.post<UserLoginResultsInterface>(this.apiUrl + 'login', loginData);
  }

  getSessionValidity(token: string): Observable<UserLoginResultsInterface> {
    return this.http.get<UserLoginResultsInterface>(this.apiUrl + 'token-check', {params: {token: token}});
  }

  logoutUser(token: string): Observable<UserLoginResultsInterface> {
    return this.http.get<UserLoginResultsInterface>(this.apiUrl + 'logout', {params: {token: token}});
  }
}
