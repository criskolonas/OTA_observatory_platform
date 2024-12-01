import { Component } from '@angular/core';
import {RegisterService} from "../shared/services/register-service";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {LoginService} from "../shared/services/login-service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private ls : LoginService, private formBuilder: FormBuilder) {
  }


  form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })

  onSubmit(){this.ls.postLoginData(this.form.getRawValue()).subscribe(res=> console.log(res))}
}
