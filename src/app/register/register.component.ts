import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterService } from '../shared/services/register-service';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { ToastService } from '../shared/services/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RecaptchaService } from '../shared/services/recaptcha.service';
import { RecaptchaModule } from 'ng-recaptcha';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RecaptchaModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  protected recaptchaResolved: boolean = false;

  constructor(
    private rs: RegisterService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toast: ToastService,
    private recaptcha: RecaptchaService,
    private authService: AuthService,
  ) {}

  form = this.formBuilder.nonNullable.group({
    username: [
      '',
      [Validators.required],
      [Validators.minLength(4)],
      [Validators.maxLength(12)],
    ],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(12)]],
  });

  public navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  onSubmit() {
    this.rs.postRegistrationData(this.form.getRawValue()).subscribe({
      next: () => {
        this.router.navigate(['']);
      },
      error: (err: HttpErrorResponse) => {
        this.toast.showToast(err.error);
      },
    });
  }

  protected readonly environment = environment;

  handleCaptchaResponse(token: string | null) {
    if (token) {
      this.recaptcha.postRecaptchaValidity(token).subscribe({
        next: () => {
          this.recaptchaResolved = true;
        },
      });
    }
  }

  onExpired() {
    this.recaptchaResolved = false;
  }
}
