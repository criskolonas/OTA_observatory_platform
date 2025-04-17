import { Injectable } from '@angular/core';
import {NavItem} from "./nav-item.model";
import {Router} from "@angular/router";
import {AuthGuard} from "../../../utility-classes/authguard";
import {UserDataService} from "../../../shared/services/user-data.service";

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  constructor(
    private router: Router,
    private userData: UserDataService
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
      label: `Αποσύνδεση ${this.userData.sessionData.username ?? ""}`,
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
