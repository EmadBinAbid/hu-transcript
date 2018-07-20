import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'hut-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    public router: Router,
    private loginService: LoginService,
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

      this.loginService.login(formValue)
      .subscribe( (result)  => {
        if(result['user']['userType'] === 'supervisor')
          this.router.navigate(['/supervisor']);
        else if(result['user']['userType'] === 'administrator')
          this.router.navigate(['/dashboard']);
      });
    }
  }

}
