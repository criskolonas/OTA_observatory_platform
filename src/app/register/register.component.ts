import { Component,inject } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {RegisterService} from "../shared/services/register-service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(private rs : RegisterService, private formBuilder: FormBuilder) {
  }


  form = this.formBuilder.nonNullable.group({
    userName: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })

  onSubmit(){this.rs.postRegistrationData(this.form.getRawValue()).subscribe(res=> console.log(res))}

}
