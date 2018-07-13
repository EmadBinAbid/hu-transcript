import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'hut-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    public router: Router,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.createFormGroup(formBuilder);
  }

  createFormGroup(formBuilder: FormBuilder) {
    return new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  ngOnInit() {
  }

  submitForm() {
    if (this.loginForm.valid) {
      const formValue = this.loginForm.value;
      if (formValue.email === 'test@test.com' && formValue.password === 'pakistan') {
        this.router.navigate(['/dashboard']);
      }
    }
  }

}
