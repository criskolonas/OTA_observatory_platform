import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegionGeomSimple } from '../models/region-geom-simple';
import { Region } from '../models/region';
import { RegionGeom } from '../models/region-geom';
import { RegionReport } from '../models/region-report';

@Injectable({
  providedIn: 'root',
})
export class RegionService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getRegions(): Observable<any> {
    return this.http.get(this.apiUrl + 'api/user/regions/geom');
  }

  getRegionById(id: number): Observable<RegionGeomSimple> {
    return this.http.get<RegionGeomSimple>(
      this.apiUrl + 'api/user/regions/geom/' + id,
    );
  }

  getRegionDetails(regionId: number): Observable<Region> {
    return this.http.get<Region>(
      this.apiUrl + 'api/user/regions/details/' + regionId,
    );
  }

  getRegionDetailsGeom(regionId: number): Observable<RegionGeom> {
    return this.http.get<RegionGeom>(
      this.apiUrl + 'api/user/regions/geom/details/' + regionId,
    );
  }

  getRegionReport(regionId: number): Observable<RegionReport> {
    return this.http.get<RegionReport>(
      this.apiUrl + 'api/user/regions/report/' + regionId,
      { withCredentials: true },
    );
  }
}
