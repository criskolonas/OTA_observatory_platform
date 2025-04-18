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
import {UserDataService} from "../shared/services/user-data.service";


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private ls: LoginService, private router: Router,private toastService: ToastService,private userData:UserDataService) {
  }

  public checkAuthentication(): Promise<boolean> {
    return new Promise((resolve) => {
        this.ls.getSessionValidity().subscribe({
          next: (res) => {
            if(res) {
              this.userData.sessionData = {shouldDisplayNav:true,username: res.username}
              resolve(true);
              return;
            }
          },
          error: (err: HttpErrorResponse) => {
            this.userData.sessionData = {username:'',shouldDisplayNav:false}
            this.toastService.showToast(err.error)
            this.router.navigate(['login'])
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
