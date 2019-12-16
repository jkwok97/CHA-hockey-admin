import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
let HistoryComponent = class HistoryComponent {
    constructor(_router) {
        this._router = _router;
        this.activeLinkIndex = -1;
        this.routes = [
            { name: 'Champions', url: 'champions', current: false },
            { name: 'Drafts', url: 'drafts', current: false },
            { name: 'Archives', url: 'archives', current: false },
        ];
        this._router.events.subscribe((res) => {
            this.activeLinkIndex = this.routes.indexOf(this.routes.find(tab => tab.url === '.' + this._router.url));
        });
    }
    ngOnInit() {
    }
};
HistoryComponent = tslib_1.__decorate([
    Component({
        selector: 'app-history',
        templateUrl: './history.component.html',
        styleUrls: ['./history.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [Router])
], HistoryComponent);
export { HistoryComponent };
//# sourceMappingURL=history.component.js.map