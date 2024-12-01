import { Component } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {LoginService} from "../shared/services/login-service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private ls : LoginService, private formBuilder: FormBuilder,private cookie:CookieService) {
  }


  form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })

  onSubmit(){this.ls.postLoginData(this.form.getRawValue()).subscribe(res=> {
    console.log('Login successful, token:', res.token);
    this.cookie.set('authToken', res.token, 1, '/');

  },(error) => {          console.error('Login failed:', error);
  })}
}
