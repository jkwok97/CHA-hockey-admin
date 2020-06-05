import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;

  isLoading: boolean = false;
  showNotification: boolean = false;
  submitted: boolean = false;
  private _alive = false;

  returnUrl: string;
  error:string = '';

  constructor(
    private router: Router,
    private _authService: AuthService
  ) {
      if (this._authService.currentUserValue) { 
        this.router.navigate(['games']);
      } 
   }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email])
    })
  }

  get email() { return this.loginForm.get('email'); }

  getError(prop) {
    if (this[prop].hasError('email')) return 'not a valid email address';
    if (this[prop].hasError('required')) return 'required';
  }

  toLowerCase(value: string) {
    this.email.setValue(value.toLowerCase());
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
        return;
    }
    this.isLoading = true;
    const { email } = this.loginForm.value;
    this._authService.login(email).pipe(first()).subscribe(
      data => {
        // console.log(data);
        if (data.error) {
          this.error = data.error;
          this.showNotification = true;
          this.isLoading = false;
        } else {
          this.router.navigate(['games']);
        }
      },
      error => {
        // console.log(error);
        this.error = error.error;
        this.showNotification = true;
        this.isLoading = false;
      });
  }

    ngOnDestroy() {
      this._alive = false;
    }

}