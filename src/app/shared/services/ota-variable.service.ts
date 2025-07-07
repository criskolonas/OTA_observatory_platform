import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { OtaVariable } from '../models/ota-variable';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OtaVariableService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getOtaVariables(): Observable<OtaVariable[]> {
    return this.http.get<OtaVariable[]>(
      this.apiUrl + 'api/user/ota-variables',
      {
        withCredentials: true,
      },
    );
  }

  getOtaVariableDetails(id: number): Observable<OtaVariable> {
    return this.http.get<OtaVariable>(
      this.apiUrl + `api/user/ota-variables/${id}`,
      {
        withCredentials: true,
      },
    );
  }
}
