import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { formatDate } from '@angular/common';
import { PropertyDealingPerMonth } from '../models/stats/property-dealing-per-month';
import { PropertyDealingForPrefectureForMonths } from '../models/stats/property-dealing-prefecture-per-month';

@Injectable({
  providedIn: 'root',
})
export class PropertyDealingStatsService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getPropertyDealingByPrefecturePerMonth(
    date?: Date,
  ): Observable<PropertyDealingPerMonth> {
    let httpParams = new HttpParams();
    if (date) {
      httpParams = httpParams.set(
        'date',
        formatDate(date, 'yyyy-MM-dd', 'en-US'),
      );
    }
    return this.http.get<PropertyDealingPerMonth>(
      this.apiUrl + 'api/user/stats/propertyDealings/per-month',
      { params: httpParams, withCredentials: true },
    );
  }

  getPropertyDealingForPrefecturePerMonth(
    prefectureId: number,
    fromDate?: Date,
    toDate?: Date,
  ): Observable<PropertyDealingForPrefectureForMonths> {
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
    return this.http.get<PropertyDealingForPrefectureForMonths>(
      this.apiUrl + 'api/user/stats/propertyDealings/for-prefecture-per-month',
      { params: httpParams, withCredentials: true },
    );
  }
}
