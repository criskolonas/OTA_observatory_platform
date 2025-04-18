import {Routes, CanActivate, RouterModule, ROUTES, ExtraOptions} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {RegionsComponent} from "./regions/regions.component";
import {OtaFeaturesComponent} from "./ota-features/ota-features.component";
import {OtaFeatureDetailsComponent} from "./ota-feature-details/ota-feature-details.component";
import {RegionReportComponent} from "./region-report/region-report.component";
import {PrefectureReportComponent} from "./prefecture-report/prefecture-report.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {AuthGuard} from "./utility-classes/authguard";
import {LogoutComponent} from "./logout/logout.component";
import {AuthenticatedGuard} from "./utility-classes/authenticatedguard";

export const routerConfig:ExtraOptions = {
  onSameUrlNavigation: 'reload'
};

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent, canActivate: [AuthGuard] },

  {
    path: 'explore-map',
    loadChildren: () => import('./explore-map/explore-map.module').then(m => m.ExploreMapModule),
    canActivate:[AuthGuard]
  },
  { path: 'regions', component: RegionsComponent,canActivate: [AuthGuard]},
  { path: 'regions/:id', component: RegionReportComponent ,canActivate: [AuthGuard]},
  { path: 'prefecture/:id', component: PrefectureReportComponent,canActivate: [AuthGuard] },
  { path: 'features', component: OtaFeaturesComponent ,canActivate: [AuthGuard]},
  { path: 'features/:id', component: OtaFeatureDetailsComponent,canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent,canActivate:[AuthenticatedGuard] },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent,canActivate:[AuthenticatedGuard] },
];


