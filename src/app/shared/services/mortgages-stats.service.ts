import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MortgagesPerMonth } from '../models/stats/mortgages-per-month';
import { formatDate } from '@angular/common';
import { MortgagesForPrefectureForMonths } from '../models/stats/mortgages-for-prefecture-for-month';

@Injectable({
  providedIn: 'root',
})
export class MortgagesStatsService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getConfiscationsByPrefecturePerMonth(
    date?: Date,
  ): Observable<MortgagesPerMonth> {
    let httpParams = new HttpParams();
    if (date) {
      httpParams = httpParams.set(
        'date',
        formatDate(date, 'yyyy-MM-dd', 'en-US'),
      );
    }
    return this.http.get<MortgagesPerMonth>(
      this.apiUrl + 'api/user/stats/mortgages/per-month',
      { params: httpParams, withCredentials: true },
    );
  }

  getMortgagesForPrefecturePerMonth(
    prefectureId: number,
    fromDate?: Date,
    toDate?: Date,
  ): Observable<MortgagesForPrefectureForMonths> {
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
    return this.http.get<MortgagesForPrefectureForMonths>(
      this.apiUrl + 'api/user/stats/mortgages/for-prefecture-per-month',
      { params: httpParams, withCredentials: true },
    );
  }
}
