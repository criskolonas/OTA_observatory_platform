import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { RoleEnum } from '../shared/interfaces/UserFormInterface';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  public async canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot,
  ): Promise<boolean> {
    const userRes = await this.authService.checkAuthentication(true);
    if (userRes && userRes.role.some((role) => role.id === RoleEnum.ADMIN)) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
