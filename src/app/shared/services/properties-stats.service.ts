import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { formatDate } from '@angular/common';
import { PropertiesPerMonth } from '../models/stats/properties-per-month';
import { PropertiesForPrefectureForMonths } from '../models/stats/properties-for-prefecture-for-month';

@Injectable({
  providedIn: 'root',
})
export class PropertiesStatsService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getPropertiesByPrefecturePerMonth(
    date?: Date,
  ): Observable<PropertiesPerMonth> {
    let httpParams = new HttpParams();
    if (date) {
      httpParams = httpParams.set(
        'date',
        formatDate(date, 'yyyy-MM-dd', 'en-US'),
      );
    }
    return this.http.get<PropertiesPerMonth>(
      this.apiUrl + 'api/user/stats/properties/per-month',
      { params: httpParams, withCredentials: true },
    );
  }

  getPropertiesForPrefecturePerMonth(
    prefectureId: number,
    fromDate?: Date,
    toDate?: Date,
  ): Observable<PropertiesForPrefectureForMonths> {
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
    return this.http.get<PropertiesForPrefectureForMonths>(
      this.apiUrl + 'api/user/stats/properties/for-prefecture-per-month',
      { params: httpParams, withCredentials: true },
    );
  }
}
