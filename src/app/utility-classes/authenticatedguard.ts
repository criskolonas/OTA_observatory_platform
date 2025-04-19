import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { UserDataService } from '../shared/services/user-data.service';
import { AuthService } from '../shared/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticatedGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  public async canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot,
  ): Promise<boolean> {
    const isConnected = await this.authService.checkAuthentication(true);
    console.log(isConnected);
    if (isConnected) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
