import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { TeamsService } from 'src/app/teams/teams.service';
import { takeWhile } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
let ArchivesComponent = class ArchivesComponent {
    constructor(_teamsService, _router) {
        this._teamsService = _teamsService;
        this._router = _router;
        this._alive = true;
        this.isLoading = false;
        this.page = 1;
        this.pageSize = 20;
        this.length = 0;
        this.seasonType = 'Regular';
        this.showType = 'Season';
        this.teamsColumnsToDisplay = [
            'playing_year', 'season_type', 'team_logo', 'team_name', 'games_played', 'wins', 'loss', 'ties', 'points', 'goals_for', 'goals_for_game', 'goals_against', 'goals_against_game',
            'goals_diff', 'win_pct', 'pp_pct', 'pk_pct', 'sh_goals', 'penalty_minutes_game', 'shot_diff', 'div_record',
            'home_record', 'away_record', 'trail_record'
        ];
    }
    ngOnInit() {
        this.isLoading = true;
        this.getStats(this.seasonType, this.showType);
    }
    getStats(type, group) {
        if (group === "Season") {
            this._teamsService.getAlltimeLeagueTeamsStatsByType(type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
                // console.log(resp);
                let teamStats = resp;
                teamStats.sort((a, b) => b['points'] - a['points']);
                this.teams = new MatTableDataSource(teamStats);
                this.teamsColumnsToDisplay = [
                    'playing_year', 'season_type', 'team_logo', 'team_name', 'games_played', 'wins', 'loss', 'ties', 'points', 'goals_for', 'goals_for_game', 'goals_against', 'goals_against_game',
                    'goals_diff', 'win_pct', 'pp_pct', 'pk_pct', 'sh_goals', 'penalty_minutes_game', 'shot_diff', 'div_record',
                    'home_record', 'away_record', 'trail_record'
                ];
                this.length = teamStats.length;
                this.isLoading = false;
                setTimeout(() => {
                    this.teams.paginator = this.paginator;
                    this.teams.sort = this.sort;
                }, 350);
            });
        }
        else {
            this._teamsService.getAlltimeLeagueTeamsStatsByType(type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
                // console.log(resp);
                let teamStats = resp['rows'];
                teamStats.sort((a, b) => b['points'] - a['points']);
                this.teams = new MatTableDataSource(teamStats);
                this.teamsColumnsToDisplay = [
                    'season_type', 'team_logo', 'team_name', 'games_played', 'wins', 'loss', 'ties', 'points', 'goals_for', 'goals_for_game', 'goals_against', 'goals_against_game',
                    'goals_diff', 'win_pct', 'pp_pct', 'pk_pct', 'sh_goals', 'penalty_minutes_game', 'shot_diff'
                ];
                this.length = teamStats.length;
                this.isLoading = false;
                setTimeout(() => {
                    this.teams.paginator = this.paginator;
                    this.teams.sort = this.sort;
                }, 350);
            });
        }
    }
    changeSeason(value) {
        if (value === 'Playoffs') {
            this.isLoading = true;
            this.seasonType = value;
            this.getStats(value, this.showType);
        }
        else {
            this.isLoading = true;
            this.seasonType = value;
            this.getStats(value, this.showType);
        }
    }
    changeShow(value) {
        if (value === 'Alltime') {
            this.isLoading = true;
            this.showType = value;
            this.getStats(this.seasonType, value);
        }
        else {
            this.isLoading = true;
            this.showType = value;
            this.getStats(this.seasonType, value);
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
    applyFilter(filterValue) {
        this.teams.filter = filterValue.trim().toLowerCase();
        if (this.teams.paginator) {
            this.teams.paginator.firstPage();
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
    ViewChild(MatSort, { static: false }),
    tslib_1.__metadata("design:type", MatSort)
], ArchivesComponent.prototype, "sort", void 0);
tslib_1.__decorate([
    ViewChild(MatPaginator, { static: false }),
    tslib_1.__metadata("design:type", MatPaginator)
], ArchivesComponent.prototype, "paginator", void 0);
ArchivesComponent = tslib_1.__decorate([
    Component({
        selector: 'app-archives',
        templateUrl: './archives.component.html',
        styleUrls: ['./archives.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [TeamsService,
        Router])
], ArchivesComponent);
export { ArchivesComponent };
//# sourceMappingURL=archives.component.js.map