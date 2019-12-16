import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TeamsService } from '../teams/teams.service';
let LeagueComponent = class LeagueComponent {
    constructor(_router, _teamsService) {
        this._router = _router;
        this._teamsService = _teamsService;
        this.northwestTeams = [];
        this.southwestTeams = [];
        this.northeastTeams = [];
        this.southeastTeams = [];
    }
    ngOnInit() {
        this.northwestTeams = this._teamsService.league.conference[0].division[0].teams;
        this.southwestTeams = this._teamsService.league.conference[0].division[1].teams;
        this.northeastTeams = this._teamsService.league.conference[1].division[0].teams;
        this.southeastTeams = this._teamsService.league.conference[1].division[1].teams;
    }
    sendToTeam(team) {
        this._router.navigate([`teams/${team}`]);
    }
};
LeagueComponent = tslib_1.__decorate([
    Component({
        selector: 'app-league',
        templateUrl: './league.component.html',
        styleUrls: ['./league.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [Router,
        TeamsService])
], LeagueComponent);
export { LeagueComponent };
//# sourceMappingURL=league.component.js.map