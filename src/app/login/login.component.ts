import {Component, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {LoginService} from "../shared/services/login-service";

import {Router} from "@angular/router";
import {AuthGuard} from "../utility-classes/authguard";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent  {
  @Output() errorMessage:String;

  constructor(private ls : LoginService, private formBuilder: FormBuilder,private authGuard:AuthGuard,private router: Router
  ) {
    this.errorMessage = '';
  }


  form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })

  onSubmit() {
    this.ls.postLoginData(this.form.getRawValue()).subscribe({
      next: (res) => {
        this.authGuard.sessionDataReceived = res
        this.router.navigate(['']);
      },
      error: (error) => {
        if (error.status === 404) {
          this.errorMessage = 'User Not Found';
        } else if (error.status === 401) {
          this.errorMessage = 'Invalid password. Please try again.';
        }
      }
    });
  }
}
