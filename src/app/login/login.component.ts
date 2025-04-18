import {Component, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {LoginService} from "../shared/services/login-service";

import {Router, UrlTree} from "@angular/router";
import {AuthGuard} from "../utility-classes/authguard";
import {UserDataService} from "../shared/services/user-data.service";
import {MessageService} from "primeng/api";
import {ToastService} from "../shared/services/toast.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent  {
  @Output() errorMessage:String;

  constructor(private ls : LoginService, private formBuilder: FormBuilder,private authGuard:AuthGuard,private router: Router,private toast: ToastService
  ) {
    this.errorMessage = '';
  }

  ngOnInit(){
    this.authGuard.checkAuthentication().then(r => r && this.router.navigate(['']))
  }


  form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required,Validators.email]],
    password: ['', [Validators.required]]
  })

  public navigateToRegister():void {
    this.router.navigate(['register']);
  }

  onSubmit() {
    this.ls.postLoginData(this.form.getRawValue()).subscribe({
      next: (res) => {
        this.router.navigate(['']);
      },
      error: (error:HttpErrorResponse) => {
        this.toast.showToast(error.error)
      }
    });
  }
}
