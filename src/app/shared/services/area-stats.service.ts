import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AreaPerMonth } from '../models/stats/area-per-month';
import { formatDate } from '@angular/common';
import { AreaForPrefectureForMonths } from '../models/stats/area-for-prefecture-for-month';

@Injectable({
  providedIn: 'root',
})
export class AreaStatsService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAreaByPrefecturePerMonth(date?: Date): Observable<AreaPerMonth> {
    let httpParams = new HttpParams();
    if (date) {
      httpParams = httpParams.set(
        'date',
        formatDate(date, 'yyyy-MM-dd', 'en-US'),
      );
    }
    return this.http.get<AreaPerMonth>(
      this.apiUrl + 'api/user/stats/areas/per-month',
      {
        params: httpParams,
        withCredentials: true,
      },
    );
  }

  getAreaForPrefecturePerMonth(
    prefectureId: number,
    fromDate?: Date,
    toDate?: Date,
  ): Observable<AreaForPrefectureForMonths> {
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
    return this.http.get<AreaForPrefectureForMonths>(
      this.apiUrl + 'api/user/stats/areas/for-prefecture-per-month',
      { params: httpParams, withCredentials: true },
    );
  }
}
