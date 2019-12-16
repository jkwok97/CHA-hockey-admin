import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
let AuthService = class AuthService {
    constructor(http) {
        this.http = http;
        this.currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }
    get currentUserValue() {
        return this.currentUserSubject.value;
    }
    login(email) {
        // console.log(email);
        return this.http.get(`${environment.back_end_url}/users/${email}`)
            .pipe(map(user => {
            // console.log(user);
            // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
            user.authdata = window.btoa(email);
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            return user;
        }));
    }
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
};
AuthService = tslib_1.__decorate([
    Injectable({ providedIn: 'root' }),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map