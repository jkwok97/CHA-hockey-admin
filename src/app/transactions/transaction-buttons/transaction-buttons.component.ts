import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { takeWhile, take, map } from 'rxjs/operators';
import { DisplayService } from 'src/app/_services/display.service';
import { CurrentSeasonService } from 'src/app/_services/current-season.service';
import { TransactionsService } from 'src/app/_services/transactions.service';
import { Observable, of } from 'rxjs';
import { Team } from 'src/app/_models/team';
import { TeamService } from 'src/app/_services/team.service';
import { createOfflineCompileUrlResolver } from '@angular/compiler';

@Component({
  selector: 'app-transaction-buttons',
  templateUrl: './transaction-buttons.component.html',
  styleUrls: ['./transaction-buttons.component.css']
})
export class TransactionButtonsComponent implements OnInit, OnDestroy {

  private _alive:boolean = true;

  teams$: Observable<Team[]>;
  teams: Team[];

  @Input() teamOneTransaction: Object;
  @Input() teamTwoTransaction: Object;
  @Input() selectedTeamOne: string;
  @Input() selectedTeamTwo: string;

  @Output() transactionSuccess = new EventEmitter<boolean>();

  currentSeason: string;
  currentSeasonType: string;

  constructor(
    private _transactionService: TransactionsService,
    private _displayService: DisplayService,
    private _currentSeasonService: CurrentSeasonService,
    private _teamService: TeamService
    ) {
    this.currentSeason = this._currentSeasonService.currentSeason;
    this.currentSeasonType = this._currentSeasonService.currentSeasonType;
    this.teams$ = this._teamService.getTeams();
   }

  ngOnInit() {
    this.teams$.pipe(
      takeWhile(() => this._alive)
    ).subscribe((teams: Team[]) => {
      this.teams = teams;
    })
  }

  ngOnChanges() {
  }

  onTrade() {
    this._transactionService.makeTrade(this.teamOneTransaction, this.teamTwoTransaction, this.selectedTeamOne, this.selectedTeamTwo)
      .pipe(takeWhile(() => this._alive)).subscribe( (resp: any[]) => {
        this._displayService.popupTrigger('Success');
        this.transactionSuccess.emit(true);
      }, error => {
        this._displayService.popupTrigger(error);
      });

    this.inputTrade();
    this.reset();
  }

  onAcquire() {
    this._transactionService.acquirePlayers(this.teamTwoTransaction, this.selectedTeamOne)
      .pipe(takeWhile(() => this._alive)).subscribe( (resp: any[]) => {
        this._displayService.popupTrigger('Success');
        this.transactionSuccess.emit(true);
      }, error => {
        this._displayService.popupTrigger(error);
      });
    this.reset();
  }

  onRelease() {
    this._transactionService.releasePlayers(this.teamOneTransaction, this.selectedTeamTwo, this.selectedTeamOne)
      .pipe(takeWhile(() => this._alive)).subscribe( (resp: any[]) => {
        this._displayService.popupTrigger('Success');
        this.transactionSuccess.emit(true);
      }, error => {
        this._displayService.popupTrigger(error);
      });
    this.reset();
  }

  inputTrade() {

    const team_one_id = this.getTeamId(this.selectedTeamOne);
    const team_two_id = this.getTeamId(this.selectedTeamTwo);

    const team_one_players = this.getPlayerIds(this.teamTwoTransaction);
    const team_two_players = this.getPlayerIds(this.teamOneTransaction);

    const team_one_picks = this.getPicksString(this.teamTwoTransaction['picks']);
    const team_two_picks = this.getPicksString(this.teamOneTransaction['picks']);

    const transaction_date = this.getDate();

    const body = {
      transaction_date,
      team_one_id,
      team_two_id,
      team_one_players,
      team_two_players,
      team_one_picks,
      team_two_picks
    }

    this._transactionService.addTransaction(body).pipe(
      takeWhile(() => this._alive)
    ).subscribe(resp => {
      console.log(resp);
    })

  }

  getDate() {

    // 2020-002-02
    const today = new Date();
    let dd: string | number = today.getDate();
    let mm: string | number = today.getMonth()+1;
    const yyyy = today.getFullYear();

    if (dd < 10) {
      dd = `0${dd}`;
    }
    if(mm < 10) {
      mm = `0${mm}`;
    }
    return `${yyyy}-${mm}-${dd}`;
  }

  getPicksString(picks: any[]) {
   return picks ? picks.map(pick => `${pick.team} ${pick.pick_value} ${pick.draft_year}`) : [];
  }

  getPlayerIds(transaction: any) {
    let players = [];
    let goalies = [];

    if (transaction['players'] && transaction['players'].length > 0) {
      players = transaction['players'].map((player) => +player.player_id);
    }

    if (transaction['goalies'] && transaction['goalies'].length > 0) {
      goalies = transaction['goalies'].map((player) => +player.player_id);
    }

    return players.concat(goalies);
  }

  getTeamId(name: string) {
    return +this.teams.find((team: Team) => team.shortname === name).id;
  }

  reset() {
    this.transactionSuccess.emit(false);
  }

  ngOnDestroy() {
    this._alive = false;
  }

}
