import { Injectable } from '@angular/core';
import {NavItem} from "./nav-item.model";
import {Router} from "@angular/router";
import {LoginService} from "../../../shared/services/login-service";
import {map} from "rxjs";
import {UserLoginResultsInterface} from "../../../shared/interfaces/UserFormInterface";
import {AuthGuard} from "../../../utility-classes/authguard";

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  constructor(
    private router: Router,
    private authguard: AuthGuard
  ) { }

  private _navItems: NavItem[] = [
    {
      label: 'Αρχική',
      path: [''],
      action: () => {
        this.router.navigate(['']);
      }
    },
    {
      label: 'Διαδραστικός Χάρτης',
      path: ['explore-map'],
      action: () => {
        this.router.navigate(['explore-map']);
      }
    },
    {
      label: 'Περιοχές',
      path: ['regions'],
      action: () => {
        this.router.navigate(['regions']);
      }
    },
    {
      label: 'Μεταβλητές',
      path: ['features'],
      action: () => {
        this.router.navigate(['features']);
      }
    },
    {
      label: 'Αποσύνδεση',
      path: ['logout'],
      action: () => {
        this.router.navigate(['logout'])
      }
    },
  ];

  get navItems(): NavItem[] {
    return this._navItems;
  }

}
