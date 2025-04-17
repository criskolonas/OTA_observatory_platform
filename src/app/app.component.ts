import {Component} from '@angular/core';
import { RouterOutlet} from '@angular/router';
import {NavbarComponent} from "./core/navbar/navbar.component";
import { NgIf} from "@angular/common";
import {AuthGuard} from "./utility-classes/authguard";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, NgIf, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ota-observatory-platform';

  constructor( private authGuard :AuthGuard) {
  }

  isLoggedIn(): boolean {
    return this.authGuard.shouldDisplayNav
  }

}
