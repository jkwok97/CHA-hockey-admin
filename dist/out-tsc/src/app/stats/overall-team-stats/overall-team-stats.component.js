import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TeamsService } from 'src/app/teams/teams.service';
import { ActivatedRoute, Router } from '@angular/router';
import { takeWhile } from 'rxjs/operators';
let OverallTeamStatsComponent = class OverallTeamStatsComponent {
    constructor(_teamsService, _route, _router) {
        this._teamsService = _teamsService;
        this._route = _route;
        this._router = _router;
        this._alive = true;
        this.isLoading = false;
        this.stats = [];
        this.short_team_name = '';
        this.northwestTeams = [];
        this.southwestTeams = [];
        this.northeastTeams = [];
        this.southeastTeams = [];
        this.teamsColumnsToDisplay = [
            'team_logo', 'team_name', 'games_played', 'wins', 'loss', 'ties', 'points', 'goals_for', 'goals_for_game', 'goals_against', 'goals_against_game',
            'goals_diff', 'win_pct', 'pp_pct', 'pk_pct', 'sh_goals', 'penalty_minutes_game', 'shot_diff', 'div_record',
            'home_record', 'away_record', 'trail_record'
        ];
        this.page = 1;
        this.pageSize = 20;
        this.length = 0;
    }
    ngOnInit() {
        this.isLoading = true;
        this.league = this._teamsService.league;
        this.northwestTeams = this._teamsService.league.conference[0].division[0].teams;
        this.southwestTeams = this._teamsService.league.conference[0].division[1].teams;
        this.northeastTeams = this._teamsService.league.conference[1].division[0].teams;
        this.southeastTeams = this._teamsService.league.conference[1].division[1].teams;
        this.currentSeason = this._teamsService.currentSeason;
        this.currentSeasonType = this._teamsService.currentSeasonType;
        if (this._route.snapshot.routeConfig.path === "stats/league") {
            this._teamsService.getLeagueTeamsStats(this.currentSeason).pipe(takeWhile(() => this._alive)).subscribe(resp => {
                // console.log(resp);
                let tempLeaders = resp;
                tempLeaders.forEach(element => {
                    if (element['playing_year'] === this.currentSeason && element['season_type'] === this.currentSeasonType) {
                        element.win_pct = ((element.wins / element.games_played) * 100).toFixed(1);
                        element.goals_against_game = (element.goals_against / element.games_played).toFixed(2);
                        element.goals_diff = element.goals_for - element.goals_against;
                        element.goals_for_game = (element.goals_for / element.games_played).toFixed(2);
                        element.pp_pct = ((element.pp_goals / element.pp_attempts) * 100).toFixed(1);
                        element.pk_pct = (((element.pk_attempts - element.pk_goals) / element.pk_attempts) * 100).toFixed(1);
                        element.penalty_minutes_game = (element.penalty_minutes / element.games_played).toFixed(1);
                        element.shot_diff = (element.shots_for - element.shots_against);
                        this.stats.push(element);
                    }
                });
                this.teams = new MatTableDataSource(this.stats);
                this.length = this.stats.length;
                this.isLoading = false;
                setTimeout(() => {
                    this.teams.sort = this.overallSort;
                }, 350);
            });
        }
        else if (this._route.snapshot.routeConfig.path === "teams/:params") {
            this.short_team_name = this._route.snapshot.paramMap.get("params");
            this._teamsService.getTeamStats(this.short_team_name).pipe(takeWhile(() => this._alive)).subscribe(resp => {
                // console.log(resp);
                let tempLeaders = resp;
                tempLeaders.forEach(element => {
                    if (element['playing_year'] === this.currentSeason && element['season_type'] === this.currentSeasonType) {
                        element.win_pct = ((element.wins / element.games_played) * 100).toFixed(1);
                        element.goals_against_game = (element.goals_against / element.games_played).toFixed(2);
                        element.goals_diff = element.goals_for - element.goals_against;
                        element.goals_for_game = (element.goals_for / element.games_played).toFixed(2);
                        element.pp_pct = ((element.pp_goals / element.pp_attempts) * 100).toFixed(1);
                        element.pk_pct = (((element.pk_attempts - element.pk_goals) / element.pk_attempts) * 100).toFixed(1);
                        element.penalty_minutes_game = (element.penalty_minutes / element.games_played).toFixed(1);
                        element.shot_diff = (element.shots_for - element.shots_against);
                        this.stats.push(element);
                    }
                });
                this.teams = new MatTableDataSource(this.stats);
                this.length = this.stats.length;
                this.isLoading = false;
                setTimeout(() => {
                    this.teams.sort = this.overallSort;
                }, 350);
            });
        }
    }
    ngAfterViewInit() {
        setTimeout(() => {
            // this.typeSelect.value = "league"
        }, 250);
    }
    findLogo(shortName) {
        if (shortName) {
            let team = this._teamsService.getTeamInfo(shortName);
            return { image: team.image, name: team.name };
        }
        else {
            return { image: "../../assets/team_logos/Free_Agent_logo_square.jpg", name: "Free Agent" };
        }
    }
    getConferenceStats() {
        let westTeams = this.northwestTeams.concat(this.southwestTeams);
        let eastTeams = this.northeastTeams.concat(this.southeastTeams);
        this.westernStats = this.stats.filter(team => westTeams.find(divTeam => divTeam.shortName === team.team_name));
        this.easternStats = this.stats.filter(team => eastTeams.find(divTeam => divTeam.shortName === team.team_name));
        this.westernTeams = new MatTableDataSource(this.westernStats);
        this.easternTeams = new MatTableDataSource(this.easternStats);
        setTimeout(() => {
            this.length = this.westernStats.length;
            this.westernTeams.sort = this.westernSort;
            this.easternTeams.sort = this.easternSort;
            this.pageSize = 10;
        }, 500);
    }
    getDivisionStats() {
        this.northWesternStats = this.stats.filter(team => this.northwestTeams.find(divTeam => divTeam.shortName === team.team_name));
        this.southWesternStats = this.stats.filter(team => this.southwestTeams.find(divTeam => divTeam.shortName === team.team_name));
        this.northEasternStats = this.stats.filter(team => this.northeastTeams.find(divTeam => divTeam.shortName === team.team_name));
        this.southEasternStats = this.stats.filter(team => this.southeastTeams.find(divTeam => divTeam.shortName === team.team_name));
        this.northWesternTeams = new MatTableDataSource(this.northWesternStats);
        this.southWesternTeams = new MatTableDataSource(this.southWesternStats);
        this.northEasternTeams = new MatTableDataSource(this.northEasternStats);
        this.southEasternTeams = new MatTableDataSource(this.southEasternStats);
        setTimeout(() => {
            this.northWesternTeams.sort = this.nwSort;
            this.southWesternTeams.sort = this.swSort;
            this.northEasternTeams.sort = this.neSort;
            this.southEasternTeams.sort = this.seSort;
            this.pageSize = 5;
            this.length = this.northWesternStats.length;
        }, 500);
    }
    onTabChange(event) {
        // console.log(event);
        if (event.tab.textLabel === "League") {
            this.pageSize = 5;
            this.length = 20;
        }
        else if (event.tab.textLabel === "Conference") {
            this.getConferenceStats();
        }
        else if (event.tab.textLabel === "Division") {
            this.getDivisionStats();
        }
    }
    openTeam(shortName) {
        this._router.navigate([`teams/${shortName}`]);
        window.scrollTo(0, 0);
    }
    ngOnDestroy() {
        this._alive = false;
    }
};
tslib_1.__decorate([
    ViewChild("overallSort", { static: false }),
    tslib_1.__metadata("design:type", MatSort)
], OverallTeamStatsComponent.prototype, "overallSort", void 0);
tslib_1.__decorate([
    ViewChild("westernSort", { static: false }),
    tslib_1.__metadata("design:type", MatSort)
], OverallTeamStatsComponent.prototype, "westernSort", void 0);
tslib_1.__decorate([
    ViewChild("easternSort", { static: false }),
    tslib_1.__metadata("design:type", MatSort)
], OverallTeamStatsComponent.prototype, "easternSort", void 0);
tslib_1.__decorate([
    ViewChild("nwSort", { static: false }),
    tslib_1.__metadata("design:type", MatSort)
], OverallTeamStatsComponent.prototype, "nwSort", void 0);
tslib_1.__decorate([
    ViewChild("swSort", { static: false }),
    tslib_1.__metadata("design:type", MatSort)
], OverallTeamStatsComponent.prototype, "swSort", void 0);
tslib_1.__decorate([
    ViewChild("neSort", { static: false }),
    tslib_1.__metadata("design:type", MatSort)
], OverallTeamStatsComponent.prototype, "neSort", void 0);
tslib_1.__decorate([
    ViewChild("seSort", { static: false }),
    tslib_1.__metadata("design:type", MatSort)
], OverallTeamStatsComponent.prototype, "seSort", void 0);
OverallTeamStatsComponent = tslib_1.__decorate([
    Component({
        selector: 'app-overall-team-stats',
        templateUrl: './overall-team-stats.component.html',
        styleUrls: ['./overall-team-stats.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [TeamsService,
        ActivatedRoute,
        Router])
], OverallTeamStatsComponent);
export { OverallTeamStatsComponent };
//# sourceMappingURL=overall-team-stats.component.js.map