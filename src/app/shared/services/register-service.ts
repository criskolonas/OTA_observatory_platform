import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { UserRegisterInterface} from "../interfaces/UserFormInterface";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  postRegistrationData(registrationData:UserRegisterInterface): Observable<any> {
    return this.http.post(this.apiUrl + 'register', registrationData,{withCredentials:true});
  }
}
