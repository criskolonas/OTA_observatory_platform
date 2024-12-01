import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {NavbarComponent} from "./core/navbar/navbar.component";
import { CookieService } from 'ngx-cookie-service';
import {NgIf} from "@angular/common";
import {UserLoginResultsInterface} from "./shared/interfaces/UserFormInterface";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers:[CookieService]
})
export class AppComponent {
  title = 'ota-observatory-platform';

  constructor(private router:Router,private cookieService:CookieService) {}

  isAuthRoute(): boolean {
    const authRoutes = ['/register', '/login'];
    return authRoutes.includes(this.router.url);
  }

  isLoggedIn(): boolean {
    const token = this.cookieService.get('authToken'); // Get token from cookies
    return !!token; // Return true if token exists, otherwise false
  }

  getLoggedInUser(): UserLoginResultsInterface | null {
    const token:UserLoginResultsInterface = JSON.parse(this.cookieService.get('authToken'));
    if (token) {
      return token;
    }
    return null;
  }
}
