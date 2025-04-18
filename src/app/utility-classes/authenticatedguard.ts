import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import {Injectable} from "@angular/core";
import {UserDataService} from "../shared/services/user-data.service";


@Injectable({
  providedIn: 'root',
})
export class AuthenticatedGuard implements CanActivate {

  constructor(private userData:UserDataService) {
  }

  public async canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Promise<boolean> {
    return !this.userData.sessionData.shouldDisplayNav
  }

}
