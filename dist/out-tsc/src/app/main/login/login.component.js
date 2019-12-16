import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from '../auth.service';
let LoginComponent = class LoginComponent {
    constructor(formBuilder, route, router, _authService) {
        this.formBuilder = formBuilder;
        this.route = route;
        this.router = router;
        this._authService = _authService;
        this.isLoading = false;
        this.showNotification = false;
        this.submitted = false;
        this._alive = false;
        this.error = '';
        // redirect to home if already logged in
        if (this._authService.currentUserValue) {
            // console.log(this._authService.currentUserValue)
            this.router.navigate(['main']);
        }
    }
    ngOnInit() {
        this.loginForm = new FormGroup({
            'email': new FormControl('', [Validators.required, Validators.email])
        });
        // get return url from route parameters or default to '/'
        // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
    // convenience getter for easy access to form fields
    // get f() { return this.loginForm.controls; }
    get email() { return this.loginForm.get('email'); }
    getError(prop) {
        if (this[prop].hasError('email'))
            return 'not a valid email address';
        if (this[prop].hasError('required'))
            return 'required';
    }
    toLowerCase(value) {
        this.email.setValue(value.toLowerCase());
    }
    onSubmit() {
        this.submitted = true;
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        this.isLoading = true;
        const { email } = this.loginForm.value;
        this._authService.login(email).pipe(first()).subscribe(data => {
            console.log(data);
            this.router.navigate(['main']);
        }, error => {
            // console.log(error);
            this.error = error.error;
            this.showNotification = true;
            this.isLoading = false;
        });
    }
    ngOnDestroy() {
        this._alive = false;
    }
};
LoginComponent = tslib_1.__decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [FormBuilder,
        ActivatedRoute,
        Router,
        AuthService])
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map