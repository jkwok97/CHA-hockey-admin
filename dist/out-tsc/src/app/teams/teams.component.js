import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { TeamsService } from './teams.service';
import { ActivatedRoute } from '@angular/router';
import { takeWhile } from 'rxjs/operators';
let TeamsComponent = class TeamsComponent {
    constructor(_teamsService, _route) {
        this._teamsService = _teamsService;
        this._route = _route;
        this._alive = true;
        this.short_team_name = '';
        this.short_team_name = this._route.snapshot.paramMap.get("params");
        this._teamsService.getTeamStats(this.short_team_name).pipe(takeWhile(() => this._alive)).subscribe(resp => {
            // console.log(resp);
            this.stats = resp;
            this.team = this.stats[0];
            // console.log(this.team);
        });
    }
    ngOnInit() {
    }
    ngAfterViewInit() {
    }
    ngOnDestroy() {
        this._alive = false;
    }
};
TeamsComponent = tslib_1.__decorate([
    Component({
        selector: 'app-teams',
        templateUrl: './teams.component.html',
        styleUrls: ['./teams.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [TeamsService,
        ActivatedRoute])
], TeamsComponent);
export { TeamsComponent };
//# sourceMappingURL=teams.component.js.map