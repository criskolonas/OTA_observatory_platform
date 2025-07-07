import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfiscationsPerMonth } from '../models/stats/confiscations-per-month';
import { formatDate } from '@angular/common';
import { ConfiscationsForPrefectureForMonths } from '../models/stats/confiscations-for-prefecture-for-months';

@Injectable({
  providedIn: 'root',
})
export class ConfiscationsStatsService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getConfiscationsByPrefecturePerMonth(
    date?: Date,
  ): Observable<ConfiscationsPerMonth> {
    let httpParams = new HttpParams();
    if (date) {
      httpParams = httpParams.set(
        'date',
        formatDate(date, 'yyyy-MM-dd', 'en-US'),
      );
    }
    return this.http.get<ConfiscationsPerMonth>(
      this.apiUrl + 'api/user/stats/confiscations/per-month',
      { params: httpParams, withCredentials: true },
    );
  }

  getConfiscationsForPrefecturePerMonth(
    prefectureId: number,
    fromDate?: Date,
    toDate?: Date,
  ): Observable<ConfiscationsForPrefectureForMonths> {
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
    return this.http.get<ConfiscationsForPrefectureForMonths>(
      this.apiUrl + 'api/user/stats/confiscations/for-prefecture-per-month',
      { params: httpParams, withCredentials: true },
    );
  }
}
