import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { TeamsService } from 'src/app/teams/teams.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { takeWhile } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
let GoalieArchivesComponent = class GoalieArchivesComponent {
    constructor(_teamsService, _route, _router) {
        this._teamsService = _teamsService;
        this._route = _route;
        this._router = _router;
        this._alive = true;
        this.isLoading = false;
        this.inMainPage = false;
        this.page = 1;
        this.pageSize = 20;
        this.length = 0;
        this.seasonType = 'Regular';
        this.showType = 'Season';
        this.goaliesColumnsToDisplay = [
            'team_logo', 'player_name', 'games_played', 'wins', 'loss', 'ties', 'goals_against_avg', 'goals_against', 'en_goals',
            'shutouts', 'saves', 'shots_for', 'save_pct', 'minutes_played', 'goals', 'assists', 'points', 'penalty_minutes', 'pass_pct',
            'playing_year', 'season_type', 'player_status'
        ];
        this.goaliesTeamColumnsToDisplay = ['playing_year', 'season_type',
            'player_name', 'games_played', 'minutes_played', 'goals_against_avg', 'wins', 'loss', 'ties', 'en_goals',
            'shutouts', 'goals_against', 'saves', 'shots_for', 'save_pct', 'goals', 'assists', 'points', 'penalty_minutes', 'pass_pct', 'player_status'
        ];
    }
    ngOnInit() {
        this.isLoading = true;
        this.currentSeason = this._teamsService.currentSeason;
        this.seasonType = this._teamsService.currentSeasonType;
        if (this._route.snapshot.routeConfig.path === "history") {
            this.getStats(this.seasonType, this.showType);
        }
        else if (this._route.snapshot.routeConfig.path === "main") {
            this.teamString = this._route.snapshot.queryParams.team;
            this.checkString(this.teamString, this.seasonType, this.showType);
        }
        else if (this._route.snapshot.routeConfig.path === "teams/:params") {
            this.teamString = this._route.snapshot.params.params;
            this.checkString(this.teamString, this.seasonType, this.showType);
        }
    }
    calcGAA(goalsAgainst, minutes) {
        return (goalsAgainst * 60) / minutes;
    }
    calcSvPct(saves, shots) {
        return (saves / shots);
    }
    openGoaliePlayer(name, team, position, hits) {
        this._router.navigate([`/stats/players/${name}`]);
        this._teamsService.setPlayerPosition(position);
        this._teamsService.setPlayerHits(hits);
        window.scrollTo(0, 0);
    }
    checkString(team, type, group) {
        if (group === "Season") {
            if (team === "STA") {
                this.getKillerBeesStats(team, type, group);
            }
            else if (team === "ATL") {
                this.getFlashersStats(team, type, group);
            }
            else if (team === "CHY") {
                this.getDesperadosStats(team, type, group);
            }
            else if (team === "SCS") {
                this.getStringraysStats(team, type, group);
            }
            else if (team === "OAK") {
                this.getAssassinsStats(team, type, group);
            }
            else {
                this.inMainPage = true;
                this.getTeamStats(team, type, group);
            }
        }
        else if (group === "Alltime") {
            if (team === "STA") {
                this.getKillerBeesRawStats(team, type, group);
            }
            else if (team === "ATL") {
                this.getFlashersRawStats(team, type, group);
            }
            else if (team === "CHY") {
                this.getDesperadosRawStats(team, type, group);
            }
            else if (team === "SCS") {
                this.getStringraysRawStats(team, type, group);
            }
            else if (team === "OAK") {
                this.getAssassinsRawStats(team, type, group);
            }
            else {
                this.inMainPage = true;
                this.getRawTeamStats(team, type, group);
            }
        }
    }
    getStats(type, group) {
        if (group === "Season") {
            this._teamsService.getGoalieStatsByType(type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
                // console.log(resp);
                let stats = resp;
                this.goalies = new MatTableDataSource(stats);
                this.goaliesColumnsToDisplay = [
                    'team_logo', 'player_name', 'games_played', 'wins', 'loss', 'ties', 'goals_against_avg', 'goals_against', 'en_goals',
                    'shutouts', 'saves', 'shots_for', 'save_pct', 'minutes_played', 'goals', 'assists', 'points', 'penalty_minutes', 'pass_pct',
                    'playing_year', 'season_type', 'player_status'
                ];
                this.pageSize = 25;
                this.length = stats.length;
                this.isLoading = false;
                setTimeout(() => {
                    this.goalies.paginator = this.paginator;
                    this.goalies.sort = this.sort;
                }, 350);
            });
        }
        else {
            this._teamsService.getGoalieStatsByType(type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
                // console.log(resp);
                let stats = resp['rows'];
                this.goalies = new MatTableDataSource(stats);
                this.goaliesColumnsToDisplay = ['player_name', 'games_played', 'wins', 'loss', 'ties', 'calc_goals_against_avg', 'goals_against', 'en_goals',
                    'shutouts', 'saves', 'shots_for', 'calc_save_pct', 'minutes_played', 'goals', 'assists', 'points', 'penalty_minutes', 'season_type',
                ];
                this.pageSize = 25;
                this.length = stats.length;
                this.isLoading = false;
                setTimeout(() => {
                    this.goalies.paginator = this.paginator;
                    this.goalies.sort = this.sort;
                }, 350);
            });
        }
    }
    getTeamStats(team, type, group) {
        this._teamsService.getAlltimeTeamGoalieStatsByType(team, type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
            // console.log(resp);
            let stats = resp;
            this.goalies = new MatTableDataSource(stats);
            this.goaliesColumnsToDisplay = [
                'team_logo', 'player_name', 'games_played', 'wins', 'loss', 'ties', 'goals_against_avg', 'goals_against', 'en_goals',
                'shutouts', 'saves', 'shots_for', 'save_pct', 'minutes_played', 'goals', 'assists', 'points', 'penalty_minutes', 'pass_pct',
                'playing_year', 'season_type', 'player_status'
            ];
            this.goaliesTeamColumnsToDisplay = [
                'player_name', 'games_played', 'wins', 'loss', 'ties', 'goals_against_avg', 'goals_against', 'en_goals',
                'shutouts', 'saves', 'shots_for', 'save_pct', 'minutes_played', 'goals', 'assists', 'points', 'penalty_minutes', 'pass_pct',
                'playing_year', 'season_type', 'player_status'
            ];
            this.pageSize = 25;
            this.length = stats.length;
            this.isLoading = false;
            setTimeout(() => {
                this.goalies.paginator = this.paginator;
                this.goalies.sort = this.sort;
            }, 350);
        });
    }
    getRawTeamStats(team, type, group) {
        this._teamsService.getAlltimeTeamGoalieStatsByType(team, type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
            // console.log(resp);
            let stats = resp['rows'];
            this.goalies = new MatTableDataSource(stats);
            this.goaliesColumnsToDisplay = ['team_logo', 'player_name', 'games_played', 'wins', 'loss', 'ties', 'calc_goals_against_avg', 'goals_against', 'en_goals',
                'shutouts', 'saves', 'shots_for', 'calc_save_pct', 'minutes_played', 'goals', 'assists', 'points', 'penalty_minutes', 'season_type'];
            this.goaliesTeamColumnsToDisplay = ['player_name', 'games_played', 'wins', 'loss', 'ties', 'calc_goals_against_avg', 'goals_against', 'en_goals',
                'shutouts', 'saves', 'shots_for', 'calc_save_pct', 'minutes_played', 'goals', 'assists', 'points', 'penalty_minutes', 'season_type'];
            this.pageSize = 25;
            this.length = stats.length;
            this.isLoading = false;
            setTimeout(() => {
                this.goalies.paginator = this.paginator;
                this.goalies.sort = this.sort;
            }, 350);
        });
    }
    getKillerBeesStats(team, type, group) {
        this._teamsService.getAlltimeTeamGoalieStatsByType(team, type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
            let stats = resp;
            this._teamsService.getAlltimeTeamGoalieStatsByType("MIS", type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
                let oldTeamStats = resp;
                oldTeamStats.forEach(element => {
                    stats.push(element);
                });
                this.goalies = new MatTableDataSource(stats);
                this.goaliesColumnsToDisplay = [
                    'team_logo', 'player_name', 'games_played', 'wins', 'loss', 'ties', 'goals_against_avg', 'goals_against', 'en_goals',
                    'shutouts', 'saves', 'shots_for', 'save_pct', 'minutes_played', 'goals', 'assists', 'points', 'penalty_minutes', 'pass_pct',
                    'playing_year', 'season_type', 'player_status'
                ];
                this.pageSize = 25;
                this.length = stats.length;
                this.isLoading = false;
                setTimeout(() => {
                    this.goalies.paginator = this.paginator;
                    this.goalies.sort = this.sort;
                }, 350);
            });
        });
    }
    getKillerBeesRawStats(team, type, group) {
        this._teamsService.getAlltimeTeamGoalieStatsByType(team, type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
            let stats = resp['rows'];
            this._teamsService.getAlltimeTeamGoalieStatsByType("MIS", type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
                let oldTeamStats = resp['rows'];
                oldTeamStats.forEach(element => {
                    stats.push(element);
                });
                this.goalies = new MatTableDataSource(stats);
                this.goaliesColumnsToDisplay = ['team_logo', 'player_name', 'games_played', 'wins', 'loss', 'ties', 'calc_goals_against_avg', 'goals_against', 'en_goals',
                    'shutouts', 'saves', 'shots_for', 'calc_save_pct', 'minutes_played', 'goals', 'assists', 'points', 'penalty_minutes', 'season_type',
                ];
                this.pageSize = 25;
                this.length = stats.length;
                this.isLoading = false;
                setTimeout(() => {
                    this.goalies.paginator = this.paginator;
                    this.goalies.sort = this.sort;
                }, 350);
            });
        });
    }
    getFlashersStats(team, type, group) {
        this._teamsService.getAlltimeTeamGoalieStatsByType(team, type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
            let stats = resp;
            this._teamsService.getAlltimeTeamGoalieStatsByType("CHA", type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
                let oldTeamStats = resp;
                oldTeamStats.forEach(element => {
                    stats.push(element);
                });
                this.goalies = new MatTableDataSource(stats);
                this.goaliesColumnsToDisplay = [
                    'team_logo', 'player_name', 'games_played', 'wins', 'loss', 'ties', 'goals_against_avg', 'goals_against', 'en_goals',
                    'shutouts', 'saves', 'shots_for', 'save_pct', 'minutes_played', 'goals', 'assists', 'points', 'penalty_minutes', 'pass_pct',
                    'playing_year', 'season_type', 'player_status'
                ];
                this.pageSize = 25;
                this.length = stats.length;
                this.isLoading = false;
                setTimeout(() => {
                    this.goalies.paginator = this.paginator;
                    this.goalies.sort = this.sort;
                }, 350);
            });
        });
    }
    getFlashersRawStats(team, type, group) {
        this._teamsService.getAlltimeTeamGoalieStatsByType(team, type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
            let stats = resp['rows'];
            this._teamsService.getAlltimeTeamGoalieStatsByType("CHA", type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
                let oldTeamStats = resp['rows'];
                oldTeamStats.forEach(element => {
                    stats.push(element);
                });
                this.goalies = new MatTableDataSource(stats);
                this.goaliesColumnsToDisplay = ['team_logo', 'player_name', 'games_played', 'wins', 'loss', 'ties', 'calc_goals_against_avg', 'goals_against', 'en_goals',
                    'shutouts', 'saves', 'shots_for', 'calc_save_pct', 'minutes_played', 'goals', 'assists', 'points', 'penalty_minutes', 'season_type',
                ];
                this.pageSize = 25;
                this.length = stats.length;
                this.isLoading = false;
                setTimeout(() => {
                    this.goalies.paginator = this.paginator;
                    this.goalies.sort = this.sort;
                }, 350);
            });
        });
    }
    getDesperadosStats(team, type, group) {
        this._teamsService.getAlltimeTeamGoalieStatsByType(team, type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
            let teamStats = resp;
            this._teamsService.getAlltimeTeamGoalieStatsByType("LVD", type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
                let oldTeamStats = resp;
                oldTeamStats.forEach(element => {
                    teamStats.push(element);
                });
                this._teamsService.getAlltimeTeamGoalieStatsByType("SDC", type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
                    let oldTeamStats = resp;
                    oldTeamStats.forEach(element => {
                        teamStats.push(element);
                    });
                    this.goalies = new MatTableDataSource(teamStats);
                    this.goaliesColumnsToDisplay = [
                        'team_logo', 'player_name', 'games_played', 'wins', 'loss', 'ties', 'goals_against_avg', 'goals_against', 'en_goals',
                        'shutouts', 'saves', 'shots_for', 'save_pct', 'minutes_played', 'goals', 'assists', 'points', 'penalty_minutes', 'pass_pct',
                        'playing_year', 'season_type', 'player_status'
                    ];
                    this.pageSize = 25;
                    this.length = teamStats.length;
                    this.isLoading = false;
                    setTimeout(() => {
                        this.goalies.paginator = this.paginator;
                        this.goalies.sort = this.sort;
                    }, 350);
                });
            });
        });
    }
    getDesperadosRawStats(team, type, group) {
        this._teamsService.getAlltimeTeamGoalieStatsByType(team, type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
            let teamStats = resp['rows'];
            this._teamsService.getAlltimeTeamGoalieStatsByType("LVD", type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
                let oldTeamStats = resp['rows'];
                oldTeamStats.forEach(element => {
                    teamStats.push(element);
                });
                this._teamsService.getAlltimeTeamGoalieStatsByType("SDC", type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
                    let oldTeamStats = resp['rows'];
                    oldTeamStats.forEach(element => {
                        teamStats.push(element);
                    });
                    this.goalies = new MatTableDataSource(teamStats);
                    this.goaliesColumnsToDisplay = ['team_logo', 'player_name', 'games_played', 'wins', 'loss', 'ties', 'calc_goals_against_avg', 'goals_against', 'en_goals',
                        'shutouts', 'saves', 'shots_for', 'calc_save_pct', 'minutes_played', 'goals', 'assists', 'points', 'penalty_minutes', 'season_type',
                    ];
                    this.pageSize = 25;
                    this.length = teamStats.length;
                    this.isLoading = false;
                    setTimeout(() => {
                        this.goalies.paginator = this.paginator;
                        this.goalies.sort = this.sort;
                    }, 350);
                });
            });
        });
    }
    getStringraysStats(team, type, group) {
        this._teamsService.getAlltimeTeamGoalieStatsByType(team, type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
            let stats = resp;
            this._teamsService.getAlltimeTeamGoalieStatsByType("SAO", type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
                let oldTeamStats = resp;
                oldTeamStats.forEach(element => {
                    stats.push(element);
                });
                this.goalies = new MatTableDataSource(stats);
                this.goaliesColumnsToDisplay = [
                    'team_logo', 'player_name', 'games_played', 'wins', 'loss', 'ties', 'goals_against_avg', 'goals_against', 'en_goals',
                    'shutouts', 'saves', 'shots_for', 'save_pct', 'minutes_played', 'goals', 'assists', 'points', 'penalty_minutes', 'pass_pct',
                    'playing_year', 'season_type', 'player_status'
                ];
                this.pageSize = 25;
                this.length = stats.length;
                this.isLoading = false;
                setTimeout(() => {
                    this.goalies.paginator = this.paginator;
                    this.goalies.sort = this.sort;
                }, 350);
            });
        });
    }
    getStringraysRawStats(team, type, group) {
        this._teamsService.getAlltimeTeamGoalieStatsByType(team, type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
            let stats = resp['rows'];
            this._teamsService.getAlltimeTeamGoalieStatsByType("SAO", type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
                let oldTeamStats = resp['rows'];
                oldTeamStats.forEach(element => {
                    stats.push(element);
                });
                this.goalies = new MatTableDataSource(stats);
                this.goaliesColumnsToDisplay = ['team_logo', 'player_name', 'games_played', 'wins', 'loss', 'ties', 'calc_goals_against_avg', 'goals_against', 'en_goals',
                    'shutouts', 'saves', 'shots_for', 'calc_save_pct', 'minutes_played', 'goals', 'assists', 'points', 'penalty_minutes', 'season_type',
                ];
                this.pageSize = 25;
                this.length = stats.length;
                this.isLoading = false;
                setTimeout(() => {
                    this.goalies.paginator = this.paginator;
                    this.goalies.sort = this.sort;
                }, 350);
            });
        });
    }
    getAssassinsStats(team, type, group) {
        this._teamsService.getAlltimeTeamGoalieStatsByType(team, type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
            let stats = resp;
            this._teamsService.getAlltimeTeamGoalieStatsByType("OAO", type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
                let oldTeamStats = resp;
                oldTeamStats.forEach(element => {
                    stats.push(element);
                });
                this.goalies = new MatTableDataSource(stats);
                this.goaliesColumnsToDisplay = [
                    'team_logo', 'player_name', 'games_played', 'wins', 'loss', 'ties', 'goals_against_avg', 'goals_against', 'en_goals',
                    'shutouts', 'saves', 'shots_for', 'save_pct', 'minutes_played', 'goals', 'assists', 'points', 'penalty_minutes', 'pass_pct',
                    'playing_year', 'season_type', 'player_status'
                ];
                this.pageSize = 25;
                this.length = stats.length;
                this.isLoading = false;
                setTimeout(() => {
                    this.goalies.paginator = this.paginator;
                    this.goalies.sort = this.sort;
                }, 350);
            });
        });
    }
    getAssassinsRawStats(team, type, group) {
        this._teamsService.getAlltimeTeamGoalieStatsByType(team, type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
            let stats = resp['rows'];
            this._teamsService.getAlltimeTeamGoalieStatsByType("OAO", type, group).pipe(takeWhile(() => this._alive)).subscribe(resp => {
                let oldTeamStats = resp['rows'];
                oldTeamStats.forEach(element => {
                    stats.push(element);
                });
                this.goalies = new MatTableDataSource(stats);
                this.goaliesColumnsToDisplay = ['team_logo', 'player_name', 'games_played', 'wins', 'loss', 'ties', 'calc_goals_against_avg', 'goals_against', 'en_goals',
                    'shutouts', 'saves', 'shots_for', 'calc_save_pct', 'minutes_played', 'goals', 'assists', 'points', 'penalty_minutes', 'season_type',
                ];
                this.pageSize = 25;
                this.length = stats.length;
                this.isLoading = false;
                setTimeout(() => {
                    this.goalies.paginator = this.paginator;
                    this.goalies.sort = this.sort;
                }, 350);
            });
        });
    }
    changeSeason(value) {
        if (this._route.snapshot.routeConfig.path === "history") {
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
        else if (this._route.snapshot.routeConfig.path === "main") {
            if (value === 'Playoffs') {
                this.isLoading = true;
                this.seasonType = value;
                this.checkString(this.teamString, value, this.showType);
            }
            else {
                this.isLoading = true;
                this.seasonType = value;
                this.checkString(this.teamString, value, this.showType);
            }
        }
        else if (this._route.snapshot.routeConfig.path === "teams/:params") {
            if (value === 'Playoffs') {
                this.isLoading = true;
                this.seasonType = value;
                this.checkString(this.teamString, value, this.showType);
            }
            else {
                this.isLoading = true;
                this.seasonType = value;
                this.checkString(this.teamString, value, this.showType);
            }
        }
    }
    changeShow(value) {
        if (this._route.snapshot.routeConfig.path === "history") {
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
        else if (this._route.snapshot.routeConfig.path === "main") {
            if (value === 'Alltime') {
                this.isLoading = true;
                this.showType = value;
                this.checkString(this.teamString, this.seasonType, value);
            }
            else {
                this.isLoading = true;
                this.showType = value;
                this.checkString(this.teamString, this.seasonType, value);
            }
        }
        else if (this._route.snapshot.routeConfig.path === "teams/:params") {
            if (value === 'Alltime') {
                this.isLoading = true;
                this.showType = value;
                this.checkString(this.teamString, this.seasonType, value);
            }
            else {
                this.isLoading = true;
                this.showType = value;
                this.checkString(this.teamString, this.seasonType, value);
            }
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
        this.goalies.filter = filterValue.trim().toLowerCase();
        if (this.goalies.paginator) {
            this.goalies.paginator.firstPage();
        }
    }
    ngOnDestroy() {
        this._alive = false;
    }
};
tslib_1.__decorate([
    ViewChild(MatSort, { static: false }),
    tslib_1.__metadata("design:type", MatSort)
], GoalieArchivesComponent.prototype, "sort", void 0);
tslib_1.__decorate([
    ViewChild(MatPaginator, { static: false }),
    tslib_1.__metadata("design:type", MatPaginator)
], GoalieArchivesComponent.prototype, "paginator", void 0);
GoalieArchivesComponent = tslib_1.__decorate([
    Component({
        selector: 'app-goalie-archives',
        templateUrl: './goalie-archives.component.html',
        styleUrls: ['./goalie-archives.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [TeamsService,
        ActivatedRoute,
        Router])
], GoalieArchivesComponent);
export { GoalieArchivesComponent };
//# sourceMappingURL=goalie-archives.component.js.map