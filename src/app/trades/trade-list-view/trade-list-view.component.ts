import { Component, OnInit, Input, OnChanges, OnDestroy, EventEmitter, Output } from '@angular/core';
import { MainService } from 'src/app/main/main.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-trade-list-view',
  templateUrl: './trade-list-view.component.html',
  styleUrls: ['./trade-list-view.component.css']
})
export class TradeListViewComponent implements OnInit, OnChanges, OnDestroy {

  @Input() selectedTeam;
  @Input() transactionSuccess: boolean = false;

  @Output() outputTransaction = new EventEmitter<object>();

  private _alive:boolean = true;

  currentSeason: string;
  currentSeasonType: string;

  players: any[];
  goalies: any[];
  picks: any[];

  transaction = {
    players: null,
    goalies: null,
    picks: null
  }

  constructor(private _mainService: MainService) {
    this.currentSeason = this._mainService.currentSeason;
    this.currentSeasonType = this._mainService.currentSeasonType;
   }

  ngOnInit() {
    if (this.selectedTeam) {
      this.getListOfPlayers(this.selectedTeam);
      this.getListOfGoalies(this.selectedTeam);
      this.getListOfPicks(this.selectedTeam);
    }
  }

  ngOnChanges() {
    this.resetTransaction();

    if (this.transactionSuccess) {
      this.getListOfPlayers(this.selectedTeam);
      this.getListOfGoalies(this.selectedTeam);
      this.getListOfPicks(this.selectedTeam);
      this.transactionSuccess = false;
    }

    if (this.selectedTeam) {
      this.getListOfPlayers(this.selectedTeam);
      this.getListOfGoalies(this.selectedTeam);
      this.getListOfPicks(this.selectedTeam);
    }
  }

  getListOfPlayers(shortName: string) {
    this._mainService.getTeamPlayerStatsByYearByType(shortName, this.currentSeason, this.currentSeasonType)
      .pipe(takeWhile(() => this._alive)).subscribe( (resp: any[]) => {
        resp.sort((a,b) => a.player_name.localeCompare(b.player_name));
        this.players = resp;
      });
  }

  getListOfGoalies(shortName: string) {
    this._mainService.getTeamGoalieStatsByYearByType(shortName, this.currentSeason, this.currentSeasonType)
      .pipe(takeWhile(() => this._alive)).subscribe( (resp: any[]) => {
        resp.sort((a,b) => a.player_name.localeCompare(b.player_name));
        this.goalies = resp;
      });
  }

  getListOfPicks(shortName: string) {
    this._mainService.getDraftTable().pipe(takeWhile(() => this._alive)).subscribe((resp: any[]) => {
      let tempPicks = resp;
      let teamPicks = [];
      tempPicks.forEach((team) => {
        Object.entries(team).forEach(([key, val]) => {
          if (val === shortName) {
            if (key === 'round_one') {
              teamPicks.push({ team: team.team_name, pick_value: '1st', draft_year: team.draft_year})
            } else if (key === 'round_two') {
              teamPicks.push({ team: team.team_name, pick_value: '2nd', draft_year: team.draft_year})
            } else if (key === 'round_three') {
              teamPicks.push({ team: team.team_name, pick_value: '3rd', draft_year: team.draft_year})
            } else if (key === 'round_four') {
              teamPicks.push({ team: team.team_name, pick_value: '4th', draft_year: team.draft_year})
            } else if (key === 'round_five') {
              teamPicks.push({ team: team.team_name, pick_value: '5th', draft_year: team.draft_year})
            }
          }
        });
      });
      this.picks = teamPicks;
    });
  }

  resetTransaction() {
    this.transaction = {
      players: null,
      goalies: null,
      picks: null
    }
    this.emitOutput();
  }

  onSelectPlayer(event) {
    this.transaction.players = this.getAssetsToMove(event.source.selectedOptions.selected);
    this.emitOutput();
  }

  onSelectGoalie(event) {
    this.transaction.goalies = this.getAssetsToMove(event.source.selectedOptions.selected);
    this.emitOutput();
  }

  onSelectPick(event) {
    this.transaction.picks = this.getAssetsToMove(event.source.selectedOptions.selected);
    this.emitOutput();
  }

  emitOutput() {
    setTimeout(() => {
      this.outputTransaction.emit(this.transaction);
    }, 250);  
  }

  getAssetsToMove(group: any[]) {
    let tempGroup = group;
    let assestsToMove = [];
    tempGroup.forEach((pick) => {
      assestsToMove.push(pick.value);
    })
    return assestsToMove;
  }

  ngOnDestroy() {
    this._alive = false;
  }

}
