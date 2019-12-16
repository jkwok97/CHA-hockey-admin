import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
let MainService = class MainService {
    constructor(_http) {
        this._http = _http;
    }
    getAllUsers() {
        return this._http.get(`${environment.back_end_url}/users/`);
    }
    getUser(email) {
        return this._http.get(`${environment.back_end_url}/players-stats/${email}`);
    }
};
MainService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], MainService);
export { MainService };
//# sourceMappingURL=main.service.js.map