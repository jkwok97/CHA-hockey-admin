import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamsService } from '../teams.service';
let TeamStatsComponent = class TeamStatsComponent {
    constructor(_route, _teamsService) {
        this._route = _route;
        this._teamsService = _teamsService;
        this._alive = true;
        this.isLoading = false;
        this.currentTeam = false;
        this.short_team_name = '';
        this.currentTeams = [];
        this._teamsService.league.conference[0].division[0].teams.forEach(team => { this.currentTeams.push(team); });
        this._teamsService.league.conference[0].division[1].teams.forEach(team => { this.currentTeams.push(team); });
        this._teamsService.league.conference[1].division[0].teams.forEach(team => { this.currentTeams.push(team); });
        this._teamsService.league.conference[1].division[1].teams.forEach(team => { this.currentTeams.push(team); });
        // console.log(this.currentTeams);
    }
    ngOnInit() {
        this.isLoading = true;
        this.short_team_name = this._route.snapshot.paramMap.get("params");
        this.team = this._teamsService.getTeamInfo(this.short_team_name);
        if (this.currentTeams.find(team => team.shortName === this.team.shortName)) {
            this.currentTeam = true;
        }
        // console.log(this.currentTeam);
        this.isLoading = false;
    }
    toSalaryPage() {
        window.open(this.team.link);
    }
    ngOnDestroy() {
        this._alive = false;
    }
};
TeamStatsComponent = tslib_1.__decorate([
    Component({
        selector: 'app-team-stats',
        templateUrl: './team-stats.component.html',
        styleUrls: ['./team-stats.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [ActivatedRoute,
        TeamsService])
], TeamStatsComponent);
export { TeamStatsComponent };
//# sourceMappingURL=team-stats.component.js.map