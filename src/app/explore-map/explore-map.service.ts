import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PrefectureGeomSimple } from '../shared/models/prefecture-geom-simple';
import { RegionGeomSimple } from '../shared/models/region-geom-simple';

@Injectable()
export class ExploreMapService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getRegions(): Observable<RegionGeomSimple[]> {
    return this.http.get<RegionGeomSimple[]>(this.apiUrl + 'regions/geom', {
      withCredentials: true,
    });
  }

  getPrefecturesByRegion(regionId: number): Observable<PrefectureGeomSimple[]> {
    return this.http.get<PrefectureGeomSimple[]>(
      this.apiUrl + 'prefectures/geom/region/' + regionId,
    );
  }
}
