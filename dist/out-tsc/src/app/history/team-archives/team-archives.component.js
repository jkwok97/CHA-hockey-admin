import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { takeWhile } from 'rxjs/operators';
import { TeamsService } from 'src/app/teams/teams.service';
import { ActivatedRoute, Router } from '@angular/router';
let TeamArchivesComponent = class TeamArchivesComponent {
    constructor(_teamsService, _route, _router) {
        this._teamsService = _teamsService;
        this._route = _route;
        this._router = _router;
        this._alive = true;
        this.isLoading = false;
        this.seasonType = 'Regular';
        this.totalGP = 0;
        this.totalWins = 0;
        this.totalLoss = 0;
        this.totalTies = 0;
        this.totalPoints = 0;
        this.totalGF = 0;
        this.totalGA = 0;
        this.totalPP = 0;
        this.totalPPA = 0;
        this.totalPK = 0;
        this.totalPKA = 0;
        this.totalSHG = 0;
        this.totalPIM = 0;
        this.totalShotsFor = 0;
        this.totalShotsAgainst = 0;
        this.teamsColumnsToDisplay = [
            'playing_year', 'season_type', 'team_logo', 'team_name', 'games_played', 'wins', 'loss', 'ties', 'points', 'goals_for', 'goals_for_game', 'goals_against', 'goals_against_game',
            'goals_diff', 'win_pct', 'pp_pct', 'pk_pct', 'sh_goals', 'penalty_minutes_game', 'shot_diff', 'div_record',
            'home_record', 'away_record', 'trail_record'
        ];
        this.short_team_name = this._route.snapshot.paramMap.get("params");
        this.team = this._teamsService.getTeamInfo(this.short_team_name);
    }
    ngOnInit() {
        this.checkString(this.team);
    }
    openTeam(shortName, season, type) {
        this._router.navigate([`/teams/${shortName}/${season}/${type}`]);
        window.scrollTo(0, 0);
    }
    checkString(team) {
        if (team.shortName === "STA") {
            this.resetStats();
            this.getKillerBeesStats(team, this.seasonType);
        }
        else if (team.shortName === "ATL") {
            this.resetStats();
            this.getFlashersStats(team, this.seasonType);
        }
        else if (team.shortName === "CHY") {
            this.resetStats();
            this.getDesperadosStats(team, this.seasonType);
        }
        else if (team.shortName === "SCS") {
            this.resetStats();
            this.getStringraysStats(team, this.seasonType);
        }
        else if (team.shortName === "OAK") {
            this.resetStats();
            this.getAssassinsStats(team, this.seasonType);
        }
        else {
            this._teamsService.getAlltimeTeamStatsByType(team.shortName, this.seasonType).pipe(takeWhile(() => this._alive)).subscribe(resp => {
                // console.log(resp);
                let teamStats = resp;
                this.isLoading = false;
                this.resetStats();
                this.getTeamTotals(teamStats);
                this.teams = new MatTableDataSource(teamStats);
                this.teams.sort = this.overallSort;
            });
        }
    }
    getTeamTotals(stats) {
        stats.forEach(year => {
            this.totalGP += Number(year.games_played);
            this.totalWins += Number(year.wins);
            this.totalLoss += Number(year.loss);
            this.totalTies += Number(year.ties);
            this.totalPoints += Number(year.points);
            this.totalGF += Number(year.goals_for);
            this.totalGA += Number(year.goals_against);
            this.totalPP += Number(year.pp_goals);
            this.totalPPA += Number(year.pp_attempts);
            this.totalPK += Number(year.pk_goals);
            this.totalPKA += Number(year.pk_attempts);
            this.totalSHG += Number(year.sh_goals);
            this.totalPIM += Number(year.penalty_minutes);
            this.totalShotsFor += Number(year.shots_for);
            this.totalShotsAgainst += Number(year.shots_against);
        });
        this.goalsForPerGame = (this.totalGF / this.totalGP).toFixed(2);
        this.goalsAgainstPerGame = (this.totalGA / this.totalGP).toFixed(2);
        this.goalDiff = (this.totalGF - this.totalGA).toString();
        this.winPct = ((this.totalWins / this.totalGP) * 100).toFixed(1);
        this.ppPct = ((this.totalPP / this.totalPPA) * 100).toFixed(1);
        this.pkPct = (((this.totalPKA - this.totalPK) / this.totalPKA) * 100).toFixed(1);
        this.pimPerGame = (this.totalPIM / this.totalGP).toFixed(1);
        this.totalShotDiff = (this.totalShotsFor - this.totalShotsAgainst).toString();
    }
    resetStats() {
        this.totalGP = 0;
        this.totalWins = 0;
        this.totalLoss = 0;
        this.totalTies = 0;
        this.totalGF = 0;
        this.totalGA = 0;
        this.totalPP = 0;
        this.totalPPA = 0;
        this.totalPK = 0;
        this.totalPKA = 0;
        this.totalSHG = 0;
        this.totalPIM = 0;
        this.totalShotsFor = 0;
        this.totalShotsAgainst = 0;
    }
    changeSeason(value) {
        if (value === 'Playoffs') {
            this.isLoading = true;
            this.seasonType = value;
            this.checkString(this.team);
        }
        else {
            this.isLoading = true;
            this.seasonType = value;
            this.resetStats();
            this.checkString(this.team);
        }
    }
    getKillerBeesStats(team, type) {
        this._teamsService.getAlltimeTeamStatsByType(team.shortName, type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
            let teamStats = resp;
            this._teamsService.getAlltimeTeamStatsByType("MIS", type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
                let oldTeamStats = resp;
                oldTeamStats.forEach(element => {
                    teamStats.push(element);
                });
                // console.log(teamStats);
                this.isLoading = false;
                teamStats.sort((a, b) => b['playing_year'] - a['playing_year']);
                this.getTeamTotals(teamStats);
                this.teams = new MatTableDataSource(teamStats);
                this.teams.sort = this.overallSort;
            });
        });
    }
    getFlashersStats(team, type) {
        this._teamsService.getAlltimeTeamStatsByType(team.shortName, type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
            let teamStats = resp;
            this._teamsService.getAlltimeTeamStatsByType("CHA", type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
                let oldTeamStats = resp;
                oldTeamStats.forEach(element => {
                    teamStats.push(element);
                });
                // console.log(teamStats);
                this.isLoading = false;
                teamStats.sort((a, b) => b['playing_year'] - a['playing_year']);
                this.getTeamTotals(teamStats);
                this.teams = new MatTableDataSource(teamStats);
                this.teams.sort = this.overallSort;
            });
        });
    }
    getDesperadosStats(team, type) {
        this._teamsService.getAlltimeTeamStatsByType(team.shortName, type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
            let teamStats = resp;
            this._teamsService.getAlltimeTeamStatsByType("LVD", type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
                let oldTeamStats = resp;
                oldTeamStats.forEach(element => {
                    teamStats.push(element);
                });
                this._teamsService.getAlltimeTeamStatsByType("SDC", type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
                    let oldTeamStats = resp;
                    oldTeamStats.forEach(element => {
                        teamStats.push(element);
                    });
                    // console.log(teamStats);
                    this.isLoading = false;
                    teamStats.sort((a, b) => b['playing_year'] - a['playing_year']);
                    this.getTeamTotals(teamStats);
                    this.teams = new MatTableDataSource(teamStats);
                    this.teams.sort = this.overallSort;
                });
            });
        });
    }
    getStringraysStats(team, type) {
        this._teamsService.getAlltimeTeamStatsByType(team.shortName, type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
            let teamStats = resp;
            this._teamsService.getAlltimeTeamStatsByType("SAO", type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
                let oldTeamStats = resp;
                oldTeamStats.forEach(element => {
                    teamStats.push(element);
                });
                // console.log(teamStats);
                this.isLoading = false;
                teamStats.sort((a, b) => b['playing_year'] - a['playing_year']);
                this.getTeamTotals(teamStats);
                this.teams = new MatTableDataSource(teamStats);
                this.teams.sort = this.overallSort;
            });
        });
    }
    getAssassinsStats(team, type) {
        this._teamsService.getAlltimeTeamStatsByType(team.shortName, type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
            let teamStats = resp;
            this._teamsService.getAlltimeTeamStatsByType("OAO", type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
                let oldTeamStats = resp;
                oldTeamStats.forEach(element => {
                    teamStats.push(element);
                });
                // console.log(teamStats);
                this.isLoading = false;
                teamStats.sort((a, b) => b['playing_year'] - a['playing_year']);
                this.getTeamTotals(teamStats);
                this.teams = new MatTableDataSource(teamStats);
                this.teams.sort = this.overallSort;
            });
        });
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
    ngOnDestroy() {
        this._alive = false;
    }
};
tslib_1.__decorate([
    ViewChild("overallSort", { static: false }),
    tslib_1.__metadata("design:type", MatSort)
], TeamArchivesComponent.prototype, "overallSort", void 0);
TeamArchivesComponent = tslib_1.__decorate([
    Component({
        selector: 'app-team-archives',
        templateUrl: './team-archives.component.html',
        styleUrls: ['./team-archives.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [TeamsService,
        ActivatedRoute,
        Router])
], TeamArchivesComponent);
export { TeamArchivesComponent };
//# sourceMappingURL=team-archives.component.js.map