import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class RecaptchaService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  postRecaptchaValidity(token: string): Observable<any> {
    return this.http.post(this.apiUrl + 'recaptcha',{captchaResponse:token});
  }


}
