import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { TeamsService } from '../teams/teams.service';
import { takeWhile } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
let StatsComponent = class StatsComponent {
    constructor(_teamsService, _route) {
        this._teamsService = _teamsService;
        this._route = _route;
        this._alive = true;
        this.isLeadersLoading = false;
        this.isGoaliesLoading = false;
        this.isLeagueLoading = false;
        this.pointLeaders = [];
        this.dmenLeaders = [];
        this.rookieLeaders = [];
        this.goalLeaders = [];
        this.shGoalLeaders = [];
        this.assistLeaders = [];
        this.plusMinusLeader = [];
        this.penaltyLeader = [];
        this.hitLeader = [];
        this.shotLeaders = [];
        this.blockedLeader = [];
        this.currPointStreakLeaders = [];
        this.longPointStreakLeaders = [];
        this.goalieLeaders = [];
        this.goaliesGAALeaders = [];
        this.goaliesSvPctLeaders = [];
        this.goaliesShutOutsLeaders = [];
        this.goaliesShotsFacedLeaders = [];
        this.leagueLeaders = [];
        this.goalDiffLeagueLeaders = [];
        this.shotDiffLeagueLeaders = [];
        this.ppLeagueLeaders = [];
        this.pkLeagueLeaders = [];
        this.pimLeagueLeaders = [];
        this.pointsPerSixtyLeaders = [];
        this.teamsColumnsToDisplay = ['team_logo', 'team_name', 'games_played', 'wins', 'loss', 'ties', 'points', 'win_pct'];
        this.teamsGoalDiffColumnsToDisplay = ['team_logo', 'team_name', 'goals_for', 'goals_against', 'goals_diff'];
        this.teamsShotDiffColumnsToDisplay = ['team_logo', 'team_name', 'shots_for', 'shots_against', 'shots_diff'];
        this.teamsPPColumnsToDisplay = ['team_logo', 'team_name', 'pp_attempts', 'pp_goals', 'pp_pct'];
        this.teamsPKColumnsToDisplay = ['team_logo', 'team_name', 'pk_attempts', 'pk_goals', 'pk_pct'];
        this.teamsPIMColumnsToDisplay = ['team_logo', 'team_name', 'penalty_minutes', 'pim_game'];
        this.playersColumnsToDisplay = ['team_logo', 'player_name', 'games_played', 'goals', 'assists', 'points'];
        this.dmenColumnsToDisplay = ['team_logo', 'player_name', 'games_played', 'goals', 'assists', 'points'];
        this.rookieColumnsToDisplay = ['team_logo', 'player_name', 'games_played', 'goals', 'assists', 'points'];
        this.goaliesColumnsToDisplay = ['team_logo', 'player_name', 'games_played', 'wins', 'loss', 'ties', 'save_pct'];
        this.goaliesGAAColumnsToDisplay = ['team_logo', 'player_name', 'goals_against_avg'];
        this.goaliesSvPctColumnsToDisplay = ['team_logo', 'player_name', 'save_pct'];
        this.goaliesShotsFacedColumnsToDisplay = ['team_logo', 'player_name', 'shots_for'];
        this.goaliesShutOutsColumnsToDisplay = ['team_logo', 'player_name', 'shutouts'];
        this.currPointLeadersColumnsToDisplay = ['team_logo', 'player_name', 'current_points_streak'];
        this.longPointLeadersColumnsToDisplay = ['team_logo', 'player_name', 'longest_points_streak'];
        this.playersGoalsColumnsToDisplay = ['team_logo', 'player_name', 'goals'];
        this.playersShGoalsColumnsToDisplay = ['team_logo', 'player_name', 'sh_goals'];
        this.playersAssistsColumnsToDisplay = ['team_logo', 'player_name', 'assists'];
        this.playersPlusMinusColumnsToDisplay = ['team_logo', 'player_name', 'plus_minus'];
        this.playersPenaltiesColumnsToDisplay = ['team_logo', 'player_name', 'penalty_minutes'];
        this.playersHitsColumnsToDisplay = ['team_logo', 'player_name', 'hits'];
        this.playersBlockedColumnsToDisplay = ['team_logo', 'player_name', 'blocked_shots'];
        this.playersShotsColumnsToDisplay = ['team_logo', 'player_name', 'shots'];
        this.playersPointsSixtyColumnsToDisplay = ['team_logo', 'player_name', 'minutes_played', 'points_per_sixty'];
    }
    ngOnInit() {
        this.isLeadersLoading = true;
        this.isGoaliesLoading = true;
        this.isLeagueLoading = true;
        this.currentSeason = this._teamsService.currentSeason;
        this.currentSeasonType = this._teamsService.currentSeasonType;
        this._teamsService.getPlayerStatsByYearByType(this.currentSeason, this.currentSeasonType).pipe(takeWhile(() => this._alive)).subscribe(resp => {
            this.stats = resp;
            // console.log(resp);
            this.getPointLeaders(resp);
            this.getDmanPointLeaders(resp);
            this.getRookiePointLeaders(resp);
            this.getPointStreakLeaders(resp);
            this.getLongPointStreakLeaders(resp);
            this.getGoalsLeaders(resp);
            this.getAssistsLeaders(resp);
            this.getPlusMinusLeaders(resp);
            this.getPenaltiesLeaders(resp);
            this.getHitsLeaders(resp);
            this.getBlockedLeaders(resp);
            this.getShotsLeaders(resp);
            this.getPointsPerSixtyLeaders(resp);
            this.getShGoalsLeaders(resp);
            this.isLeadersLoading = false;
        });
        this._teamsService.getGoalieStatsByYearByType(this.currentSeason, this.currentSeasonType).pipe(takeWhile(() => this._alive)).subscribe(resp => {
            this.goalieStats = resp;
            this.getGoalieLeaders(resp);
            this.getGAALeaders(resp);
            this.getSvPctLeaders(resp);
            this.getShotsFacedLeaders(resp);
            this.getShutOutsLeaders(resp);
            this.isGoaliesLoading = false;
        });
        this._teamsService.getLeagueTeamsStats(this.currentSeason).pipe(takeWhile(() => this._alive)).subscribe(resp => {
            this.getLeagueLeaders(resp);
            this.getGoalDiffLeagueLeaders(resp);
            this.getShotDiffLeagueLeaders(resp);
            this.getPPLeagueLeaders(resp);
            this.getPKLeagueLeaders(resp);
            this.getPimLeagueLeaders(resp);
            this.isLeagueLoading = false;
        });
    }
    getShutOutsLeaders(resp) {
        let tempLeaders = resp;
        tempLeaders.forEach(element => {
            if (element.games_played > 0) {
                this.goaliesShutOutsLeaders.push(element);
            }
        });
        this.goaliesShutOutsLeaders.sort((a, b) => b.shutouts - a.shutouts);
        let leaders = this.goaliesShutOutsLeaders.splice(0, 10);
        this.goaliesShutOuts = new MatTableDataSource(leaders);
    }
    getShotsFacedLeaders(resp) {
        let tempLeaders = resp;
        tempLeaders.forEach(element => {
            if (element.games_played > 0) {
                this.goaliesShotsFacedLeaders.push(element);
            }
        });
        this.goaliesShotsFacedLeaders.sort((a, b) => b.shots_for - a.shots_for);
        let leaders = this.goaliesShotsFacedLeaders.splice(0, 10);
        this.goaliesShotsFaced = new MatTableDataSource(leaders);
    }
    getSvPctLeaders(resp) {
        let tempLeaders = resp;
        tempLeaders.forEach(element => {
            if (element.games_played > 0) {
                this.goaliesSvPctLeaders.push(element);
            }
        });
        this.goaliesSvPctLeaders.sort((a, b) => b.save_pct - a.save_pct);
        let leaders = this.goaliesSvPctLeaders.splice(0, 10);
        this.goaliesSvPct = new MatTableDataSource(leaders);
    }
    getGAALeaders(resp) {
        let tempLeaders = resp;
        tempLeaders.forEach(element => {
            if (element.games_played > 0) {
                this.goaliesGAALeaders.push(element);
            }
        });
        this.goaliesGAALeaders.sort((a, b) => a.goals_against_avg - b.goals_against_avg);
        let leaders = this.goaliesGAALeaders.splice(0, 10);
        this.goaliesGAA = new MatTableDataSource(leaders);
    }
    getBlockedLeaders(resp) {
        let tempLeaders = resp;
        tempLeaders.forEach(element => { this.blockedLeader.push(element); });
        this.blockedLeader.sort((a, b) => b.blocked_shots - a.blocked_shots);
        let leaders = this.blockedLeader.splice(0, 10);
        this.blockedLeaders = new MatTableDataSource(leaders);
    }
    getHitsLeaders(resp) {
        let tempLeaders = resp;
        tempLeaders.forEach(element => { this.hitLeader.push(element); });
        this.hitLeader.sort((a, b) => b.hits - a.hits);
        let leaders = this.hitLeader.splice(0, 10);
        this.hitsLeaders = new MatTableDataSource(leaders);
    }
    getPenaltiesLeaders(resp) {
        let tempLeaders = resp;
        tempLeaders.forEach(element => { this.penaltyLeader.push(element); });
        this.penaltyLeader.sort((a, b) => b.penalty_minutes - a.penalty_minutes);
        let leaders = this.penaltyLeader.splice(0, 10);
        this.penaltiesLeaders = new MatTableDataSource(leaders);
    }
    getPlusMinusLeaders(resp) {
        let tempLeaders = resp;
        tempLeaders.forEach(element => { this.plusMinusLeader.push(element); });
        this.plusMinusLeader.sort((a, b) => b.plus_minus - a.plus_minus);
        let leaders = this.plusMinusLeader.splice(0, 10);
        this.plusMinusLeaders = new MatTableDataSource(leaders);
    }
    getAssistsLeaders(resp) {
        let tempLeaders = resp;
        tempLeaders.forEach(element => { this.assistLeaders.push(element); });
        this.assistLeaders.sort((a, b) => b.assists - a.assists);
        let leaders = this.assistLeaders.splice(0, 10);
        this.assistsLeaders = new MatTableDataSource(leaders);
    }
    getRookiePointLeaders(resp) {
        let tempLeaders = resp;
        tempLeaders.forEach(element => {
            if (element.player_status === "Rookie") {
                this.rookieLeaders.push(element);
            }
        });
        this.rookieLeaders.sort((a, b) => b.points - a.points);
        let leaders = this.rookieLeaders.splice(0, 10);
        this.rookies = new MatTableDataSource(leaders);
    }
    getDmanPointLeaders(resp) {
        let tempLeaders = resp;
        tempLeaders.forEach(element => {
            if (element.position === "RD" || element.position === "LD") {
                this.dmenLeaders.push(element);
            }
        });
        this.dmenLeaders.sort((a, b) => b.points - a.points);
        let leaders = this.dmenLeaders.splice(0, 10);
        this.dmen = new MatTableDataSource(leaders);
    }
    getShotsLeaders(resp) {
        let tempLeaders = resp;
        tempLeaders.forEach(element => { this.shotLeaders.push(element); });
        this.shotLeaders.sort((a, b) => b.shots - a.shots);
        let leaders = this.shotLeaders.splice(0, 10);
        this.shotsLeaders = new MatTableDataSource(leaders);
    }
    getGoalsLeaders(resp) {
        let tempLeaders = resp;
        tempLeaders.forEach(element => { this.goalLeaders.push(element); });
        this.goalLeaders.sort((a, b) => b.goals - a.goals);
        let leaders = this.goalLeaders.splice(0, 10);
        this.goalsLeaders = new MatTableDataSource(leaders);
    }
    getShGoalsLeaders(resp) {
        let tempLeaders = resp;
        tempLeaders.forEach(element => { this.shGoalLeaders.push(element); });
        this.shGoalLeaders.sort((a, b) => b.sh_goals - a.sh_goals);
        let leaders = this.shGoalLeaders.splice(0, 10);
        this.shGoalsLeaders = new MatTableDataSource(leaders);
    }
    getPointLeaders(resp) {
        let tempLeaders = resp;
        tempLeaders.forEach(element => { this.pointLeaders.push(element); });
        this.pointLeaders.sort((a, b) => b.points - a.points);
        let leaders = this.pointLeaders.splice(0, 10);
        this.players = new MatTableDataSource(leaders);
    }
    getPointStreakLeaders(resp) {
        let tempLeaders = resp;
        tempLeaders.forEach(element => { this.currPointStreakLeaders.push(element); });
        this.currPointStreakLeaders.sort((a, b) => b.current_points_streak - a.current_points_streak);
        let leaders = this.currPointStreakLeaders.splice(0, 10);
        this.currPointLeaders = new MatTableDataSource(leaders);
    }
    getLongPointStreakLeaders(resp) {
        let tempLeaders = resp;
        tempLeaders.forEach(element => { this.longPointStreakLeaders.push(element); });
        this.longPointStreakLeaders.sort((a, b) => b.longest_points_streak - a.longest_points_streak);
        let leaders = this.longPointStreakLeaders.splice(0, 10);
        this.longPointLeaders = new MatTableDataSource(leaders);
    }
    getGoalieLeaders(resp) {
        let tempLeaders = resp;
        tempLeaders.forEach(element => { this.goalieLeaders.push(element); });
        this.goalieLeaders.sort((a, b) => b.wins - a.wins);
        let leaders = this.goalieLeaders.splice(0, 10);
        this.goalies = new MatTableDataSource(leaders);
    }
    getLeagueLeaders(resp) {
        let tempLeaders = resp;
        tempLeaders.forEach(element => {
            if (element.playing_year === this.currentSeason && element.season_type === this.currentSeasonType) {
                this.leagueLeaders.push(element);
            }
        });
        this.leagueLeaders.sort((a, b) => b.points - a.points);
        this.teamsLeaders = new MatTableDataSource(this.leagueLeaders);
    }
    getGoalDiffLeagueLeaders(resp) {
        let tempLeaders = resp;
        tempLeaders.forEach(element => {
            if (element.playing_year === this.currentSeason && element.season_type === this.currentSeasonType) {
                element.goal_diff = element.goals_for - element.goals_against;
                this.goalDiffLeagueLeaders.push(element);
            }
        });
        this.goalDiffLeagueLeaders.sort((a, b) => b.goal_diff - a.goal_diff);
        this.teamsGoalDiffLeaders = new MatTableDataSource(this.goalDiffLeagueLeaders);
    }
    getShotDiffLeagueLeaders(resp) {
        let tempLeaders = resp;
        tempLeaders.forEach(element => {
            if (element.playing_year === this.currentSeason && element.season_type === this.currentSeasonType) {
                element.shot_diff = element.shots_for - element.shots_against;
                this.shotDiffLeagueLeaders.push(element);
            }
        });
        this.shotDiffLeagueLeaders.sort((a, b) => b.shot_diff - a.shot_diff);
        this.teamsShotDiffLeaders = new MatTableDataSource(this.shotDiffLeagueLeaders);
    }
    getPPLeagueLeaders(resp) {
        let tempLeaders = resp;
        tempLeaders.forEach(element => {
            if (element.playing_year === this.currentSeason && element.season_type === this.currentSeasonType) {
                element.pp_pct = ((element.pp_goals / element.pp_attempts) * 100).toFixed(1);
                this.ppLeagueLeaders.push(element);
            }
        });
        this.ppLeagueLeaders.sort((a, b) => b.pp_pct - a.pp_pct);
        this.teamsPPLeaders = new MatTableDataSource(this.ppLeagueLeaders);
    }
    getPKLeagueLeaders(resp) {
        let tempLeaders = resp;
        tempLeaders.forEach(element => {
            if (element.playing_year === this.currentSeason && element.season_type === this.currentSeasonType) {
                element.pk_pct = (((element.pk_attempts - element.pk_goals) / element.pk_attempts) * 100).toFixed(1);
                this.pkLeagueLeaders.push(element);
            }
        });
        this.pkLeagueLeaders.sort((a, b) => b.pk_pct - a.pk_pct);
        this.teamsPKLeaders = new MatTableDataSource(this.pkLeagueLeaders);
    }
    getPimLeagueLeaders(resp) {
        let tempLeaders = resp;
        tempLeaders.forEach(element => {
            if (element.playing_year === this.currentSeason && element.season_type === this.currentSeasonType) {
                element.pim_game = (element.penalty_minutes / element.games_played).toFixed(1);
                this.pimLeagueLeaders.push(element);
            }
        });
        this.pimLeagueLeaders.sort((a, b) => b.pim_game - a.pim_game);
        this.teamsPIMLeaders = new MatTableDataSource(this.pimLeagueLeaders);
    }
    getPointsPerSixtyLeaders(resp) {
        let tempLeaders = resp;
        tempLeaders.forEach(element => {
            if (element.playing_year === this.currentSeason && element.season_type === this.currentSeasonType) {
                if (element.minutes_played > 0) {
                    element.points_per_sixty = ((element.points / element.minutes_played) * 60).toFixed(2);
                    this.pointsPerSixtyLeaders.push(element);
                }
            }
        });
        this.pointsPerSixtyLeaders.sort((a, b) => b.points_per_sixty - a.points_per_sixty);
        let leaders = this.pointsPerSixtyLeaders.splice(0, 10);
        this.pointsSixtyLeaders = new MatTableDataSource(leaders);
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
    openTeam(shortName) {
        this._route.navigate([`teams/${shortName}`]);
        window.scrollTo(0, 0);
    }
    openPlayer(name, team, position, hits) {
        this._route.navigate([`/stats/players/${name}`]);
        this._teamsService.setPlayerPosition(position);
        this._teamsService.setPlayerHits(hits);
        window.scrollTo(0, 0);
    }
    openGoaliePlayer(name, team, position, hits) {
        this._route.navigate([`/stats/players/${name}`]);
        this._teamsService.setPlayerPosition(position);
        this._teamsService.setPlayerHits(hits);
        window.scrollTo(0, 0);
    }
    ngOnDestroy() {
        this._alive = false;
    }
};
tslib_1.__decorate([
    ViewChild("overallSort", { static: false }),
    tslib_1.__metadata("design:type", MatSort)
], StatsComponent.prototype, "overallSort", void 0);
tslib_1.__decorate([
    ViewChild("diffSort", { static: false }),
    tslib_1.__metadata("design:type", MatSort)
], StatsComponent.prototype, "diffSort", void 0);
StatsComponent = tslib_1.__decorate([
    Component({
        selector: 'app-stats',
        templateUrl: './stats.component.html',
        styleUrls: ['./stats.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [TeamsService,
        Router])
], StatsComponent);
export { StatsComponent };
//# sourceMappingURL=stats.component.js.map