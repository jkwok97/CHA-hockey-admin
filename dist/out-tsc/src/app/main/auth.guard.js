import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
let AuthGuard = class AuthGuard {
    constructor(router, _authService) {
        this.router = router;
        this._authService = _authService;
    }
    canActivate(route, state) {
        const currentUser = this._authService.currentUser;
        if (currentUser) {
            // logged in so return true
            // console.log(currentUser);
            return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
};
AuthGuard = tslib_1.__decorate([
    Injectable({ providedIn: 'root' }),
    tslib_1.__metadata("design:paramtypes", [Router,
        AuthService])
], AuthGuard);
export { AuthGuard };
//# sourceMappingURL=auth.guard.js.map