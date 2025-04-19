import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './core/navbar/navbar.component';
import { NgIf } from '@angular/common';
import { AuthGuard } from './utility-classes/authguard';
import { ToastModule } from 'primeng/toast';
import { UserDataService } from './shared/services/user-data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, NgIf, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ota-observatory-platform';

  constructor(
    private ud: UserDataService,
    private router: Router,
  ) {
    router.events.subscribe(console.log);
  }

  isLoggedIn(): boolean {
    return this.ud.sessionData.shouldDisplayNav;
  }
}
