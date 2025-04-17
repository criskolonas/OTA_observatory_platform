import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { LoginService } from '../shared/services/login-service';
import {Injectable} from "@angular/core";
import {ToastService} from "../shared/services/toast.service";
import {HttpErrorResponse} from "@angular/common/http";


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  private _shouldDisplayNav = false


  get shouldDisplayNav(): boolean {
    return this._shouldDisplayNav;
  }

  set shouldDisplayNav(value: boolean) {
    this._shouldDisplayNav = value;
  }

  constructor(private ls: LoginService, private router: Router,private toastService: ToastService) {
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
          error: (err: HttpErrorResponse) => {
            this.toastService.showToaster(err.status,'checkValidation')
            console.error('[TOKEN CHECK]An error occurred:', err);
            this.router.navigate(['login'])
            this.shouldDisplayNav = false;
            resolve(false);
            return
          },
        });
    });
  }

  public async canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Promise<boolean> {
    return await this.checkAuthentication()
  }

}
