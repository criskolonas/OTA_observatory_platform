import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {NavbarComponent} from "./core/navbar/navbar.component";
import {RegisterService} from "./shared/services/register-service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ota-observatory-platform';

  constructor(private router:Router) {}

  isAuthRoute(): boolean {
    const authRoutes = ['/register', '/login'];
    return authRoutes.includes(this.router.url);
  }
}
