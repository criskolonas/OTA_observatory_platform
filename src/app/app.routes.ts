import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {RegionsComponent} from "./regions/regions.component";
import {OtaFeaturesComponent} from "./ota-features/ota-features.component";
import {OtaFeatureDetailsComponent} from "./ota-feature-details/ota-feature-details.component";
import {RegionReportComponent} from "./region-report/region-report.component";
import {PrefectureReportComponent} from "./prefecture-report/prefecture-report.component";
import {LoginComponent} from "./login/login.component";

export const routes: Routes = [
  { path: '', pathMatch: "full", component: HomeComponent },
  { path: 'explore-map', loadChildren: () => import('./explore-map/explore-map.module').then((m) => m.ExploreMapModule), },
  { path: 'regions', component: RegionsComponent },
  { path: 'regions/:id', component: RegionReportComponent },
  { path: 'prefecture/:id', component: PrefectureReportComponent },
  { path: 'features', component: OtaFeaturesComponent },
  { path: 'features/:id', component: OtaFeatureDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegionsComponent },
];
