import { Component } from '@angular/core';
import {AuthGuard} from "../utility-classes/authguard";
import {LogoutService} from "../shared/services/logout.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent {

  constructor(private logoutService: LogoutService, private router: Router) {
    this.logout()
  }

  public logout(): void {
    try {
      this.logoutService.logoutUser().subscribe();
      this.router.navigate(['login'])
    } catch (error) {
      console.error('[LOGOUT]An error occurred:', error);
    }
  }

}
