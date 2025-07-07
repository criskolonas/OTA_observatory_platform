import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prefecture } from '../models/prefecture';

@Injectable({
  providedIn: 'root',
})
export class PrefectureService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getPrefecturesByRegion(regionId: number): Observable<any> {
    return this.http.get(
      this.apiUrl + 'api/userprefectures/geom/region/' + regionId,
      {
        withCredentials: true,
      },
    );
  }

  getPrefectureDetails(prefectureId: number): Observable<Prefecture> {
    return this.http.get<Prefecture>(
      this.apiUrl + 'api/user/prefectures/geom/' + prefectureId,
      { withCredentials: true },
    );
  }
}
