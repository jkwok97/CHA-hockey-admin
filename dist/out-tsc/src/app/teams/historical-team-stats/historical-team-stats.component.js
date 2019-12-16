import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { TeamsService } from '../teams.service';
import { ActivatedRoute } from '@angular/router';
let HistoricalTeamStatsComponent = class HistoricalTeamStatsComponent {
    constructor(_teamsService, _route) {
        this._teamsService = _teamsService;
        this._route = _route;
        this._alive = true;
        this.isLoading = false;
        this.short_team_name = '';
    }
    ngOnInit() {
        this.isLoading = true;
        this.short_team_name = this._route.snapshot.paramMap.get("params");
        this.team = this._teamsService.getTeamInfo(this.short_team_name);
        this.isLoading = false;
    }
    ngOnDestroy() {
        this._alive = false;
    }
};
HistoricalTeamStatsComponent = tslib_1.__decorate([
    Component({
        selector: 'app-historical-team-stats',
        templateUrl: './historical-team-stats.component.html',
        styleUrls: ['./historical-team-stats.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [TeamsService,
        ActivatedRoute])
], HistoricalTeamStatsComponent);
export { HistoricalTeamStatsComponent };
//# sourceMappingURL=historical-team-stats.component.js.map