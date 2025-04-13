import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { LoginService } from '../shared/services/login-service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {

  private _shouldDisplayNav = false

  get shouldDisplayNav(): boolean {
    return this._shouldDisplayNav;
  }

  set shouldDisplayNav(value: boolean) {
    this._shouldDisplayNav = value;
  }

  constructor(private ls: LoginService, private router: Router) {
  }

  public checkAuthentication(): Promise<boolean> {
    return new Promise((resolve) => {
        this.ls.getSessionValidity().subscribe({
          next: (res) => {
            if(res) {
              this.shouldDisplayNav=true;
              resolve(true);
              return;
            }
          },
          error: (err) => {
            console.error('[TOKEN CHECK]An error occurred:', err);
            this.router.navigate(['login'])
            this.shouldDisplayNav = false;
            resolve(false);
          },
        });
    });
  }

  public logout(): void {
      try {
        this.ls.logoutUser().subscribe();
        this.router.navigate(['login'])
      } catch (error) {
        console.error('[LOGOUT]An error occurred:', error);
      }
  }

  public async canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Promise<boolean> {
    return await this.checkAuthentication()
  }

  public async canActivateChild(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Promise<boolean> {
    return await this.checkAuthentication();
  }
}
