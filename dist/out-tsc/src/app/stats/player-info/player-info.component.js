import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { TeamsService } from 'src/app/teams/teams.service';
import { ActivatedRoute } from '@angular/router';
import { takeWhile } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
let PlayerInfoComponent = class PlayerInfoComponent {
    constructor(_teamsService, _route) {
        this._teamsService = _teamsService;
        this._route = _route;
        this._alive = true;
        this.isPlayerGoalie = false;
        this.isLoading = false;
        this.isCurrentPlayer = false;
        this.hasRatings = false;
        this.ratings = [];
        this.totalGamesPlayed = 0;
        this.totalGoals = 0;
        this.totalAssists = 0;
        this.totalPoints = 0;
        this.totalPlusMinus = 0;
        this.totalPIM = 0;
        this.totalPPG = 0;
        this.totalSHG = 0;
        this.totalGWG = 0;
        this.totalGTG = 0;
        this.totalShots = 0;
        this.totalMin = 0;
        this.totalWins = 0;
        this.totalLoss = 0;
        this.totalTies = 0;
        this.totalGA = 0;
        this.totalSA = 0;
        this.totalSO = 0;
        this.totalSaves = 0;
        this.seasonType = 'Regular';
        this.playersColumnsToDisplay = [
            'team_logo', 'season_type', 'playing_year', 'games_played', 'goals', 'assists', 'points', 'plus_minus', 'penalty_minutes', 'pp_goals', 'sh_goals',
            'gw_goals', 'gt_goals', 'shooting_pct', 'minutes_per_game'
        ];
        this.goalieColumnsToDisplay = [
            'team_logo', 'season_type', 'playing_year', 'games_played', 'wins', 'loss', 'ties', 'goals_against', 'goals_against_avg', 'shots_for', 'save_pct',
            'shutouts', 'penalty_minutes', 'minutes_played'
        ];
        this.playersRealColumnsToDisplay = [
            'games', 'goals', 'assists', 'points', 'powerPlayGoals', 'powerPlayPoints', 'shortHandedGoals', 'shortHandedPoints', 'gameWinningGoals',
            'plusMinus', 'penaltyMinutes', 'shots', 'shotPct', 'faceOffPct', 'hits', 'blocked', 'powerPlayTimeOnIcePerGame', 'shortHandedTimeOnIcePerGame',
            'timeOnIcePerGame'
        ];
        this.goalieRealColumnsToDisplay = [
            'games', 'wins', 'losses', 'ties', 'goalsAgainst', 'goalAgainstAverage', 'shutouts', 'shotsAgainst', 'saves', 'savePercentage',
            'powerPlaySavePercentage', 'evenStrengthSavePercentage'
        ];
        this.playersOnPaceRealColumnsToDisplay = [
            'games', 'goals', 'assists', 'points', 'powerPlayGoals', 'powerPlayPoints', 'shortHandedGoals', 'shortHandedPoints', 'gameWinningGoals',
            'plusMinus', 'penaltyMinutes', 'shots', 'shotPct', 'faceOffPct', 'hits', 'blocked'
        ];
        this.goalieOnPaceRealColumnsToDisplay = [
            'games', 'wins', 'losses', 'ties', 'goalsAgainst', 'goalAgainstAverage', 'shutouts', 'shotsAgainst', 'saves', 'savePercentage',
            'powerPlaySavePercentage', 'evenStrengthSavePercentage'
        ];
        this.playersRatingsStatsColumnsToDisplay = [
            'games_played', 'goals', 'assists', 'points', 'plus_minus', 'penalty_minutes', 'pp_goals', 'sh_goals', 'gw_goals', 'shots', 'shooting_pct'
        ];
        this.goalieRatingsStatsColumnsToDisplay = [
            'games_played', 'wins', 'loss', 'ties', 'goals_against', 'goals_against_avg', 'shots_for', 'saves', 'save_pct',
            'shutouts', 'penalty_minutes', 'minutes_played'
        ];
        this._teamsService.getPlayerInfo().pipe(takeWhile(() => this._alive)).subscribe(resp => {
            this.allPlayersInfo = resp;
            console.log(this.allPlayersInfo);
        });
        this.position = this._teamsService.playerPosition;
        this.hits = this._teamsService.playerHits;
        console.log(this.position);
        console.log(this.hits);
        if ((!this.position && !this.hits) || this.position === "G") {
            this.isPlayerGoalie = true;
            this._teamsService.getAllIndividualGoalieStatsByType(this._route.snapshot.params.params, this.seasonType).pipe(takeWhile(() => this._alive)).subscribe(resp => {
                console.log(resp);
                this.playerStatsFetched = resp;
                this.playerInfo = resp;
                if (this.allPlayersInfo) {
                    this.playerInfo.picture = this.allPlayersInfo.find(player => (player.playerName.toLowerCase().includes(this.player[0].toLowerCase())) && (player.playerName.toLowerCase().includes(this.player[1].toLowerCase())));
                }
                this.playerInfo.team = this.findLogo(this.playerInfo[0].team_name);
                this.getGoalieTotals(this.playerStatsFetched);
                this.playerStats = new MatTableDataSource(this.playerStatsFetched);
                setTimeout(() => {
                    this.playerStats.sort = this.sort;
                });
            });
        }
        else {
            this._teamsService.getAllIndividualPlayerStatsByType(this._route.snapshot.params.params, this.seasonType).pipe(takeWhile(() => this._alive)).subscribe(resp => {
                console.log(resp);
                this.playerInfo = resp;
                this.playerStatsFetched = resp;
                if (this.allPlayersInfo) {
                    this.playerInfo.picture = this.allPlayersInfo.find(player => (player.playerName.toLowerCase().includes(this.player[0].toLowerCase())) && (player.playerName.toLowerCase().includes(this.player[1].toLowerCase())));
                }
                this.playerInfo.team = this.findLogo(this.playerInfo[0].team_name);
                this.getPlayerTotals(this.playerStatsFetched);
                this.playerStats = new MatTableDataSource(this.playerStatsFetched);
                setTimeout(() => {
                    this.playerStats.sort = this.sort;
                });
            });
        }
    }
    ngOnInit() {
        this.player = this.splitName(this._route.snapshot.params.params);
    }
    getGoalieTotals(allStats) {
        allStats.forEach(year => {
            this.totalGamesPlayed += Number(year.games_played);
            this.totalWins += Number(year.wins);
            this.totalLoss += Number(year.loss);
            this.totalTies += Number(year.ties);
            this.totalGA += Number(year.goals_against);
            this.totalSA += Number(year.shots_for);
            this.totalSO += Number(year.shutouts);
            this.totalPIM += Number(year.penalty_minutes);
            this.totalMin += Number(year.minutes_played);
            this.totalSaves += Number(year.saves);
        });
        this.GAA = ((this.totalGA * 60) / this.totalMin).toFixed(2);
        this.savePCT = (this.totalSaves / this.totalSA).toFixed(3);
    }
    getPlayerTotals(allStats) {
        allStats.forEach(year => {
            this.totalGamesPlayed += Number(year.games_played);
            this.totalGoals += Number(year.goals);
            this.totalAssists += Number(year.assists);
            this.totalPoints += Number(year.points);
            this.totalPlusMinus += Number(year.plus_minus);
            this.totalPIM += Number(year.penalty_minutes);
            this.totalPPG += Number(year.pp_goals);
            this.totalSHG += Number(year.sh_goals);
            this.totalGWG += Number(year.gw_goals);
            this.totalGTG += Number(year.gt_goals);
            this.totalShots += Number(year.shots);
            this.totalMin += Number(year.minutes_played);
        });
        this.shootingPct = ((this.totalGoals / this.totalShots) * 100).toFixed(1);
        this.minPerGame = (this.totalMin / this.totalGamesPlayed).toFixed(1);
    }
    changeSeason(value) {
        if (this.isPlayerGoalie) {
            if (value === 'Playoffs') {
                this.isLoading = true;
                this.seasonType = value;
                this.resetValues();
                this.getGoalieStats(value);
            }
            else {
                this.isLoading = true;
                this.seasonType = value;
                this.resetValues();
                this.getGoalieStats(value);
            }
        }
        else {
            if (value === 'Playoffs') {
                this.isLoading = true;
                this.seasonType = value;
                this.resetValues();
                this.getPlayerStats(value);
            }
            else {
                this.isLoading = true;
                this.seasonType = value;
                this.resetValues();
                this.getPlayerStats(value);
            }
        }
    }
    getGoalieStats(type) {
        this._teamsService.getAllIndividualGoalieStatsByType(this._route.snapshot.params.params, type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
            // console.log(resp);
            this.playerStatsFetched = resp;
            this.getGoalieTotals(this.playerStatsFetched);
            this.playerStats = new MatTableDataSource(this.playerStatsFetched);
        });
    }
    getPlayerStats(type) {
        this._teamsService.getAllIndividualPlayerStatsByType(this._route.snapshot.params.params, type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
            // console.log(resp);
            this.playerStatsFetched = resp;
            this.getPlayerTotals(this.playerStatsFetched);
            this.playerStats = new MatTableDataSource(this.playerStatsFetched);
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
    splitName(name) {
        return name.split(", ");
    }
    onTabChange(event) {
        console.log(event);
        if (event.tab.textLabel === "NHL") {
            console.log(this.position);
            console.log(this.hits);
            this.resetValues();
            if ((!this.position && !this.hits) || this.position === "G") {
                this.isPlayerGoalie = true;
                this._teamsService.getAllIndividualGoalieStatsByTypeReal(this._route.snapshot.params.params, this.seasonType, "NHL").pipe(takeWhile(() => this._alive)).subscribe(resp => {
                    console.log(resp);
                    this.isLoading = true;
                    if (resp[0]['player_nhl_id']) {
                        let playerId = resp[0]['player_nhl_id'];
                        this.getRealNHLStats(playerId);
                        this.getOnPaceNHLStats(playerId, "Pace");
                    }
                    else {
                        this.isLoading = false;
                    }
                });
            }
            else {
                this._teamsService.getAllIndividualPlayerStatsByTypeReal(this._route.snapshot.params.params, this.seasonType, "NHL").pipe(takeWhile(() => this._alive)).subscribe(resp => {
                    console.log(resp[0]['player_nhl_id']);
                    this.isLoading = true;
                    if (resp[0]['player_nhl_id']) {
                        let playerId = resp[0]['player_nhl_id'];
                        this.getRealNHLStats(playerId);
                        this.getOnPaceNHLStats(playerId, "Pace");
                    }
                    else {
                        this.isLoading = false;
                    }
                });
            }
        }
        else if (event.tab.textLabel === "Ratings") {
            console.log(this.position);
            console.log(this.hits);
            this.resetValues();
            if ((!this.position && !this.hits) || this.position === "G") {
                this.isPlayerGoalie = true;
                this.isLoading = true;
                this._teamsService.getGoalieRatings(this._route.snapshot.params.params).pipe(takeWhile(() => this._alive)).subscribe(resp => {
                    this.playerRatingsFetched = resp[0];
                    this.hasRatings = true;
                    this.populateRatings(this.playerRatingsFetched);
                    // console.log(this.playerRatingsFetched)
                    this.playerRatingsStats = new MatTableDataSource([this.playerRatingsFetched]);
                    this.isLoading = false;
                });
            }
            else {
                this._teamsService.getPlayerRatings(this._route.snapshot.params.params).pipe(takeWhile(() => this._alive)).subscribe(resp => {
                    this.playerRatingsFetched = resp[0];
                    this.hasRatings = true;
                    this.populateRatings(this.playerRatingsFetched);
                    // console.log(this.playerRatingsFetched)
                    this.playerRatingsStats = new MatTableDataSource([this.playerRatingsFetched]);
                    this.isLoading = false;
                });
            }
        }
    }
    populateRatings(player) {
        this.ratings.push({ name: "Center", value: player.c_rate });
        this.ratings.push({ name: "LW", value: player.l_rate });
        this.ratings.push({ name: "RW", value: player.r_rate });
        this.ratings.push({ name: "LD", value: player.ld_rate });
        this.ratings.push({ name: "RD", value: player.rd_rate });
        this.ratings.push({ name: "Shooting", value: player.shooting });
        this.ratings.push({ name: "Skating", value: player.skating });
        this.ratings.push({ name: "Speed", value: player.speed });
        this.ratings.push({ name: "Passing", value: player.passing });
        this.ratings.push({ name: "Forecheck", value: player.forecheck });
        this.ratings.push({ name: "Physical", value: player.physical });
        this.ratings.push({ name: "Intimidation", value: player.intimidation });
        this.ratings.push({ name: "Clear Crease", value: player.clear_crease });
        this.ratings.push({ name: "Rock", value: player.rock });
        this.ratings.push({ name: "PK", value: player.pk });
        this.ratings.push({ name: "Shot Block", value: player.shot_block });
        this.ratings.push({ name: "Face Off", value: player.face_off });
        this.ratings.push({ name: "Assist Rating", value: player.assist_rating });
        this.ratings.push({ name: "Game Fatigue", value: player.game_fatigue });
        this.ratings.push({ name: "Shift Fatigue", value: player.shift_fatigue });
    }
    getRealNHLStats(id) {
        this._teamsService.getIndividualNHLRealStats(id).pipe(takeWhile(() => this._alive)).subscribe(resp => {
            this.isCurrentPlayer = true;
            this.realPlayerStatsFetched = resp['stats'][0]['splits'][0]['stat'];
            console.log([this.realPlayerStatsFetched]);
            this.isLoading = false;
            this.realPlayerStats = new MatTableDataSource([this.realPlayerStatsFetched]);
            setTimeout(() => {
                this.realPlayerStats.sort = this.sort;
            });
        }, error => {
        });
    }
    getOnPaceNHLStats(id, pace) {
        this._teamsService.getIndividualOnPaceNHLRealStats(id, pace).pipe(takeWhile(() => this._alive)).subscribe(resp => {
            this.isCurrentPlayer = true;
            this.realPlayerStatsOnPaceFetched = resp['stats'][0]['splits'][0]['stat'];
            console.log([this.realPlayerStatsOnPaceFetched]);
            this.isLoading = false;
            this.realPlayerStatsOnPace = new MatTableDataSource([this.realPlayerStatsOnPaceFetched]);
            setTimeout(() => {
                this.realPlayerStats.sort = this.sort;
            });
        }, error => {
        });
    }
    resetValues() {
        this.totalGamesPlayed = 0;
        this.totalGoals = 0;
        this.totalAssists = 0;
        this.totalPoints = 0;
        this.totalPlusMinus = 0;
        this.totalPIM = 0;
        this.totalPPG = 0;
        this.totalSHG = 0;
        this.totalGWG = 0;
        this.totalGTG = 0;
        this.totalShots = 0;
        this.totalMin = 0;
        this.totalWins = 0;
        this.totalLoss = 0;
        this.totalTies = 0;
        this.totalGA = 0;
        this.totalSA = 0;
        this.totalSO = 0;
        this.totalSaves = 0;
        this.ratings = [];
    }
    ngOnDestroy() {
        this._alive = false;
        this.resetValues();
    }
};
tslib_1.__decorate([
    ViewChild(MatSort, { static: false }),
    tslib_1.__metadata("design:type", MatSort)
], PlayerInfoComponent.prototype, "sort", void 0);
PlayerInfoComponent = tslib_1.__decorate([
    Component({
        selector: 'app-player-info',
        templateUrl: './player-info.component.html',
        styleUrls: ['./player-info.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [TeamsService,
        ActivatedRoute])
], PlayerInfoComponent);
export { PlayerInfoComponent };
//# sourceMappingURL=player-info.component.js.map