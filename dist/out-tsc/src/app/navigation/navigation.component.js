import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../main/auth.service';
let NavigationComponent = class NavigationComponent {
    constructor(_router, _authService) {
        this._router = _router;
        this._authService = _authService;
        this.loggedIn = false;
        this.activeLinkIndex = -1;
        this.routes = [
            { name: 'Statistics', url: 'stats', current: false },
            { name: 'Teams', url: 'teams', current: false },
            { name: 'History', url: 'history', current: false },
            { name: 'Rules & Prizes', url: 'rules', current: false },
            { name: 'Schedule', url: 'schedule', current: false },
            { name: 'Trades & Picks', url: 'trades-picks', current: false },
            { name: 'Waiver Priority', url: 'waiver-priority', current: false },
        ];
        // redirect to home if already logged in
        if (this._authService.currentUserValue) {
            // console.log(this._authService.currentUserValue)
            this.loggedIn = true;
            // console.log(this.loggedIn);
            this._router.navigate(['login']);
        }
        else {
            // console.log(this.loggedIn);
            this._router.navigate(['login']);
        }
        this._authService.currentUser.subscribe(x => this.currentUser = x);
        this._router.events.subscribe((res) => {
            this.activeLinkIndex = this.routes.indexOf(this.routes.find(tab => tab.url === '.' + this._router.url));
        });
    }
    onTabChange(event) {
        // console.log(event);
        if (event.tab.textLabel === "Statistics") {
            this._router.navigate(['stats']);
        }
        else if (event.tab.textLabel === "Conference") {
        }
        else if (event.tab.textLabel === "Division") {
        }
    }
    ngOnInit() {
        this._router.navigate(['login']);
    }
};
NavigationComponent = tslib_1.__decorate([
    Component({
        selector: 'app-navigation',
        templateUrl: './navigation.component.html',
        styleUrls: ['./navigation.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [Router,
        AuthService])
], NavigationComponent);
export { NavigationComponent };
//# sourceMappingURL=navigation.component.js.map