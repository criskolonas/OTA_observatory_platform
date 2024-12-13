import {Component, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {RegisterService} from "../shared/services/register-service";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {AuthGuard} from "../utility-classes/authguard";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent   {

  constructor(private rs : RegisterService, private formBuilder: FormBuilder,private router: Router, private authGuard: AuthGuard) {
  }

  form = this.formBuilder.nonNullable.group({
    userName: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })

  onSubmit(){this.rs.postRegistrationData(this.form.getRawValue()).subscribe({next:(res)=>{
      this.authGuard.sessionDataReceived = res
      this.router.navigate([''])
    }})}

}
