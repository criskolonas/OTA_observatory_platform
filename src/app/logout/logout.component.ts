import { Component } from '@angular/core';
import {AuthGuard} from "../utility-classes/authguard";

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent {

  constructor(authGuard: AuthGuard) {
    authGuard.logout()
  }

}
