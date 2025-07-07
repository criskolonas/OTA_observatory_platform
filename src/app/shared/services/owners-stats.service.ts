import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { formatDate } from '@angular/common';
import { OwnersPerMonth } from '../models/stats/owners-per-month';
import { OwnersForPrefectureForMonths } from '../models/stats/owners-for-prefecture-for-month';

@Injectable({
  providedIn: 'root',
})
export class OwnersStatsService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getOwnersByPrefecturePerMonth(date?: Date): Observable<OwnersPerMonth> {
    let httpParams = new HttpParams();
    if (date) {
      httpParams = httpParams.set(
        'date',
        formatDate(date, 'yyyy-MM-dd', 'en-US'),
      );
    }
    return this.http.get<OwnersPerMonth>(
      this.apiUrl + 'api/user/stats/owners/per-month',
      { params: httpParams, withCredentials: true },
    );
  }

  getOwnersForPrefecturePerMonth(
    prefectureId: number,
    fromDate?: Date,
    toDate?: Date,
  ): Observable<OwnersForPrefectureForMonths> {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('prefectureId', prefectureId.toString());
    if (fromDate) {
      httpParams = httpParams.set(
        'fromDate',
        formatDate(fromDate, 'yyyy-MM-dd', 'en-US'),
      );
    }
    if (toDate) {
      httpParams = httpParams.set(
        'fromDate',
        formatDate(toDate, 'yyyy-MM-dd', 'en-US'),
      );
    }
    return this.http.get<OwnersForPrefectureForMonths>(
      this.apiUrl + 'api/user/stats/owners/for-prefecture-per-month',
      { params: httpParams, withCredentials: true },
    );
  }
}
