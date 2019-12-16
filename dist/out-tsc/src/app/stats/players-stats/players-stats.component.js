import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { TeamsService } from 'src/app/teams/teams.service';
import { takeWhile } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
let PlayersStatsComponent = class PlayersStatsComponent {
    constructor(_teamsService, _route, _router) {
        this._teamsService = _teamsService;
        this._route = _route;
        this._router = _router;
        this._alive = true;
        this.isLoading = false;
        this.inAllPlayersStats = false;
        this.stats = [];
        this.short_team_name = '';
        this.playersColumnsToDisplay = [
            'team_logo', 'player_name', 'position', 'games_played', 'goals', 'assists', 'points', 'points_per_sixty', 'plus_minus', 'penalty_minutes', 'pp_goals', 'sh_goals',
            'gw_goals', 'gt_goals', 'shots', 'shooting_pct', 'minutes_per_game', 'fo_pct', 'pass_pct', 'corner_pct', 'hits', 'blocked_shots'
        ];
        this.teamPlayersColumnsToDisplay = [
            'player_name', 'position', 'games_played', 'goals', 'assists', 'points', 'points_per_sixty', 'plus_minus', 'penalty_minutes', 'pp_goals', 'sh_goals',
            'gw_goals', 'gt_goals', 'shots', 'shooting_pct', 'minutes_per_game', 'fo_pct', 'pass_pct', 'corner_pct', 'hits', 'blocked_shots'
        ];
        this.page = 1;
        this.pageSize = 10;
        this.length = 0;
    }
    ngOnInit() {
        this.isLoading = true;
        this.currentSeason = this._teamsService.currentSeason;
        this.currentSeasonType = this._teamsService.currentSeasonType;
        if (this._route.snapshot.routeConfig.path === "stats/players") {
            this.inAllPlayersStats = true;
            this._teamsService.getPlayerStatsByYearByType(this.currentSeason, this.currentSeasonType).pipe(takeWhile(() => this._alive)).subscribe(resp => {
                // console.log(resp);
                let stats = resp;
                stats.forEach(player => {
                    if (player.minutes_played > 0) {
                        player.points_per_sixty = ((player.points / player.minutes_played) * 60).toFixed(2);
                        this.stats.push(player);
                    }
                });
                this.players = new MatTableDataSource(this.stats);
                this.pageSize = 25;
                this.length = this.stats.length;
                this.isLoading = false;
                setTimeout(() => {
                    this.players.paginator = this.paginator;
                    this.players.sort = this.sort;
                }, 350);
            });
        }
        else if (this._route.snapshot.routeConfig.path === "teams/:params") {
            this.short_team_name = this._route.snapshot.paramMap.get("params");
            this._teamsService.getTeamPlayerStatsByYearByType(this.short_team_name, this.currentSeason, this.currentSeasonType).pipe(takeWhile(() => this._alive)).subscribe(resp => {
                // console.log(resp);
                let stats = resp;
                stats.forEach(player => {
                    if (player.minutes_played > 0) {
                        player.points_per_sixty = ((player.points / player.minutes_played) * 60).toFixed(2);
                        this.stats.push(player);
                    }
                });
                this.players = new MatTableDataSource(this.stats);
                this.length = this.stats.length;
                this.pageSize = 30;
                this.isLoading = false;
                setTimeout(() => {
                    this.players.paginator = this.paginator;
                    this.players.sort = this.sort;
                }, 350);
            });
        }
    }
    applyFilter(filterValue) {
        this.players.filter = filterValue.trim().toLowerCase();
        if (this.players.paginator) {
            this.players.paginator.firstPage();
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
    openPlayer(name, team, position, hits) {
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
], PlayersStatsComponent.prototype, "paginator", void 0);
tslib_1.__decorate([
    ViewChild(MatSort, { static: false }),
    tslib_1.__metadata("design:type", MatSort)
], PlayersStatsComponent.prototype, "sort", void 0);
PlayersStatsComponent = tslib_1.__decorate([
    Component({
        selector: 'app-players-stats',
        templateUrl: './players-stats.component.html',
        styleUrls: ['./players-stats.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [TeamsService,
        ActivatedRoute,
        Router])
], PlayersStatsComponent);
export { PlayersStatsComponent };
//# sourceMappingURL=players-stats.component.js.map