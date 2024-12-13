import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../shared/services/login-service';  // Adjust import path as needed
import { Observable} from 'rxjs';
import {UserLoginResultsInterface} from "../shared/interfaces/UserFormInterface";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  public isAuthenticated: boolean = false; // Class-level variable to store session state
  private _sessionDataReceived: UserLoginResultsInterface | null;

  constructor(private cs: CookieService,private ls: LoginService,private router: Router) {
    this._sessionDataReceived = {email:'',userName:'',token:this.cs.get('authToken')};
  }

  get sessionDataReceived(): UserLoginResultsInterface | null {
    return this._sessionDataReceived;
  }

  set sessionDataReceived(value: UserLoginResultsInterface | null) {
    this._sessionDataReceived = value;
  }

  public checkAuthentication(): boolean {

    if (!this._sessionDataReceived) {
      this.router.navigate(['login'])
      return false
    }

    const authToken = this._sessionDataReceived?.token;
    if (authToken) {
      // Async call to check session validity
      this.ls.getSessionValidity(authToken).subscribe({
        next: (res) => {
          this._sessionDataReceived = res
          this.cs.set("authToken", authToken)
          this.isAuthenticated = true;  // Set the state once verified
        },
        error: (err) => {
          console.error('An error occurred:', err);
          this.isAuthenticated = false;
          this.router.navigate(['login']);  // Redirect to login if failed
        }
      });
    } else {
      this.isAuthenticated = false;
    }

    return this.isAuthenticated;  // Return initial state (will be updated later after async check)
  }

  public logout(): void {
    let token = '';

    if (this.sessionDataReceived) {
      try {
        token = this.sessionDataReceived.token;
        this.ls.logoutUser(token).subscribe({next:(res:UserLoginResultsInterface)=> console.log(res)});
        this.router.navigate(['login']);
      } catch (error) {
        console.error('Failed to parse authToken:', error);
      }
    } else {
      console.warn('No authToken found');
    }
  }

  public redirect(): void {
    this.isAuthenticated ? this.router.navigate(['explore-map']):null;
  }

  public isAuthRoute(): boolean {
    const authRoutes = ['/register', '/login'];
    return authRoutes.includes(this.router.url);
  }

  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): boolean{
    return this.checkAuthentication();
  }

  canActivateChild(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkAuthentication();
  }
}
