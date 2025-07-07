import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GreeceArea } from '../models/greece-area';

@Injectable({
  providedIn: 'root',
})
export class GreeceAreaService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getGreeceAreas(): Observable<GreeceArea[]> {
    return this.http.get<GreeceArea[]>(this.apiUrl + 'api/user/greece-areas', {
      withCredentials: true,
    });
  }
}
