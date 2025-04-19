import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { LoginService } from '../shared/services/login-service';
import { Router } from '@angular/router';
import { UserDataService } from '../shared/services/user-data.service';
import { ToastService } from '../shared/services/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private ls: LoginService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toast: ToastService,
    private userData: UserDataService,
    private authService: AuthService,
  ) {}

  form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  public navigateToRegister(): void {
    this.router.navigate(['register']);
  }

  onSubmit() {
    this.ls.postLoginData(this.form.getRawValue()).subscribe({
      next: (res) => {
        this.router.navigate(['']);
      },
      error: (error: HttpErrorResponse) => {
        this.toast.showToast(error.error);
      },
    });
  }
}
