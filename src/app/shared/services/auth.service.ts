import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoginService } from './login-service';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';
import { UserDataService } from './user-data.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private ls: LoginService,
    private router: Router,
    private toastService: ToastService,
    private userData: UserDataService,
  ) {}

  public checkAuthentication(hideToaster?: boolean): Promise<boolean> {
    return new Promise((resolve) => {
      this.ls.getSessionValidity().subscribe({
        next: (res) => {
          if (res) {
            this.userData.sessionData = {
              shouldDisplayNav: true,
              username: res.username,
              isAdmin: res.is_admin,
            };
            resolve(true);
            return;
          }
        },
        error: (err: HttpErrorResponse) => {
          this.userData.sessionData = null;
          !hideToaster && this.toastService.showToast(err.error);
          resolve(false);
          return;
        },
      });
    });
  }
}
