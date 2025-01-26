import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ActivatedRoute, UrlSegment, Event, NavigationEnd
} from '@angular/router';
import { LoginService } from '../shared/services/login-service';
import { UserLoginResultsInterface } from '../shared/interfaces/UserFormInterface';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {

  route: string = window.location.pathname;


  private _sessionDataReceived: UserLoginResultsInterface | null = null;

  private _allowedUnauthenticatedRoutes: string[] = ['/login','/register'];

  constructor(private cs: CookieService, private ls: LoginService, private router: Router) {
    router.events.subscribe({
      next: (s: Event) => {
        if (s instanceof NavigationEnd) {
          this.route = s.url;
        }
      }
    })
  }

  get sessionDataReceived(): UserLoginResultsInterface | null {
    return this._sessionDataReceived;
  }

  set sessionDataReceived(value: UserLoginResultsInterface | null) {
    this._sessionDataReceived = value;
  }

  // Make checkAuthentication return a Promise<UserLoginResultsInterface | null>
  public checkAuthentication(): Promise<UserLoginResultsInterface | null> {
    return new Promise((resolve, reject) => {
      const authToken = this._sessionDataReceived?.token ?? this.cs.get('authToken');
      if (authToken) {
        // Async call to check session validity
        this.ls.getSessionValidity(authToken).subscribe({
          next: (res) => {
            this._sessionDataReceived = res;
            this.cs.set('authToken', res.token);
            resolve(res); // Resolve with the session data
          },
          error: (err) => {
            console.error('An error occurred:', err);
            this.router.navigate(['login']); // Redirect to login if session is invalid
            resolve(null); // Resolve with null if there's an error
          },
        });
      } else {
        resolve(null);
      }
    });
  }

  public logout(): void {
    let token = '';

    if (this.sessionDataReceived) {
      try {
        token = this.sessionDataReceived.token;
        this.ls.logoutUser(token).subscribe({next:(res:UserLoginResultsInterface)=> console.log(res)});
        this.sessionDataReceived = null;
        this.cs.delete('authToken');
        this.router.navigate(['login'])
      } catch (error) {
        console.error('An error occurred during logout:', error);
      }
    } else {
      console.warn('No authToken found');
    }
  }

  public isAuthRoute(): boolean {
    console.log(this.route)
    return this._allowedUnauthenticatedRoutes.includes(this.route);
  }

  public async canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Promise<boolean> {
    const userSession = await this.checkAuthentication(); // Wait for checkAuthentication to complete
    if (userSession) {
        return true;
    }
    return false;
  }

  public async canActivateChild(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Promise<boolean> {
    const userSession = await this.checkAuthentication(); // Wait for checkAuthentication to complete
    if (userSession && !this.isAuthRoute()) {
      return true;
    }
    return false
  }
}
