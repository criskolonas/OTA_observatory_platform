import {Component} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {RegisterService} from "../shared/services/register-service";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {AuthGuard} from "../utility-classes/authguard";
import {ToastService} from "../shared/services/toast.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent   {

  constructor(private rs : RegisterService, private formBuilder: FormBuilder,private router: Router, private toast:ToastService) {
  }

  form = this.formBuilder.nonNullable.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required,Validators.email]],
    password: ['', [Validators.required]]
  })

  public navigateToLogin():void {
    this.router.navigate(['login']);
  }

  onSubmit(){this.rs.postRegistrationData(this.form.getRawValue()).subscribe({next:()=>{
      this.router.navigate([''])
    },error:(err:HttpErrorResponse)=> {
      this.toast.showToast(err.error)
  }} )}

}
