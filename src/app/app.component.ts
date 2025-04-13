import {Component} from '@angular/core';
import { Router, RouterOutlet} from '@angular/router';
import {NavbarComponent} from "./core/navbar/navbar.component";
import { NgIf} from "@angular/common";
import {AuthGuard} from "./utility-classes/authguard";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers:[]
})
export class AppComponent {
  title = 'ota-observatory-platform';

  constructor( private authGuard :AuthGuard) {
  }

  isLoggedIn(): boolean {
    return this.authGuard.shouldDisplayNav
  }

}
