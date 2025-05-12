import { Component } from '@angular/core';
import { LogoutService } from '../shared/services/logout.service';
import { Router } from '@angular/router';
import { UserDataService } from '../shared/services/user-data.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss',
})
export class LogoutComponent {
  constructor(
    private logoutService: LogoutService,
    private router: Router,
    private ud: UserDataService,
  ) {
    this.logout();
  }

  public logout(): void {
    try {
      this.logoutService.logoutUser().subscribe();
      this.ud.sessionData = null;
      this.router.navigate(['login']);
    } catch (error) {
      console.error('[LOGOUT]An error occurred:', error);
    }
  }
}
