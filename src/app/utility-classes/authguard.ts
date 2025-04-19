import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { LoginService } from '../shared/services/login-service';
import { Injectable } from '@angular/core';
import { ToastService } from '../shared/services/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserDataService } from '../shared/services/user-data.service';
import { AuthService } from '../shared/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
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
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
