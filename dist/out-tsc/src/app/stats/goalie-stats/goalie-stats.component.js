import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { TeamsService } from 'src/app/teams/teams.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { takeWhile } from 'rxjs/operators';
let GoalieStatsComponent = class GoalieStatsComponent {
    constructor(_teamsService, _route, _router) {
        this._teamsService = _teamsService;
        this._route = _route;
        this._router = _router;
        this._alive = true;
        this.isLoading = false;
        this.inAllPlayersStats = false;
        this.short_team_name = '';
        this.goaliesColumnsToDisplay = [
            'team_logo', 'player_name', 'games_played', 'minutes_played', 'goals_against_avg', 'wins', 'loss', 'ties', 'en_goals',
            'shutouts', 'goals_against', 'saves', 'shots_for', 'save_pct', 'goals', 'assists', 'points', 'penalty_minutes', 'pass_pct'
        ];
        this.teamGoaliesColumnsToDisplay = [
            'player_name', 'games_played', 'minutes_played', 'goals_against_avg', 'wins', 'loss', 'ties', 'en_goals',
            'shutouts', 'goals_against', 'saves', 'shots_for', 'save_pct', 'goals', 'assists', 'points', 'penalty_minutes', 'pass_pct'
        ];
        this.page = 1;
        this.pageSize = 10;
        this.length = 0;
    }
    ngOnInit() {
        this.isLoading = true;
        this.currentSeason = this._teamsService.currentSeason;
        this.currentSeasonType = this._teamsService.currentSeasonType;
        if (this._route.snapshot.routeConfig.path === "stats/goalies") {
            this._teamsService.getGoalieStatsByYearByType(this.currentSeason, this.currentSeasonType).pipe(takeWhile(() => this._alive)).subscribe(resp => {
                this.inAllPlayersStats = true;
                this.stats = resp;
                this.goalies = new MatTableDataSource(this.stats);
                this.pageSize = 25;
                this.length = this.stats.length;
                this.isLoading = false;
                setTimeout(() => {
                    this.goalies.paginator = this.paginator;
                    this.goalies.sort = this.sort;
                }, 350);
            });
        }
        else if (this._route.snapshot.routeConfig.path === "teams/:params") {
            this.short_team_name = this._route.snapshot.paramMap.get("params");
            this._teamsService.getTeamGoalieStatsByYearByType(this.short_team_name, this.currentSeason, this.currentSeasonType).pipe(takeWhile(() => this._alive)).subscribe(resp => {
                this.stats = resp;
                this.goalies = new MatTableDataSource(this.stats);
                this.length = this.stats.length;
                this.isLoading = false;
                setTimeout(() => {
                    this.goalies.paginator = this.paginator;
                    this.goalies.sort = this.sort;
                }, 350);
            });
        }
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
    openGoaliePlayer(name, team, position, hits) {
        this._router.navigate([`/stats/players/${name}`]);
        this._teamsService.setPlayerPosition(position);
        this._teamsService.setPlayerHits(hits);
        window.scrollTo(0, 0);
    }
    ngOnDestroy() {
        this._alive = false;
    }
};
tslib_1.__decorate([
    ViewChild(MatPaginator, { static: false }),
    tslib_1.__metadata("design:type", MatPaginator)
], GoalieStatsComponent.prototype, "paginator", void 0);
tslib_1.__decorate([
    ViewChild(MatSort, { static: false }),
    tslib_1.__metadata("design:type", MatSort)
], GoalieStatsComponent.prototype, "sort", void 0);
GoalieStatsComponent = tslib_1.__decorate([
    Component({
        selector: 'app-goalie-stats',
        templateUrl: './goalie-stats.component.html',
        styleUrls: ['./goalie-stats.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [TeamsService,
        ActivatedRoute,
        Router])
], GoalieStatsComponent);
export { GoalieStatsComponent };
//# sourceMappingURL=goalie-stats.component.js.map