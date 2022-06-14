import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  OnChanges,
} from "@angular/core";
import { takeWhile, map } from "rxjs/operators";
import { StatsService } from "src/app/_services/stats.service";
import { CurrentSeasonService } from "src/app/_services/current-season.service";
import { DraftService } from "src/app/_services/draft.service";
import { TeamService } from "src/app/_services/team.service";
import { Team } from "src/app/_models/team";
import { DraftTable } from "src/app/_models/draft-table";
import { TransactionsService } from "src/app/_services/transactions.service";

@Component({
  selector: "app-asset-list",
  templateUrl: "./asset-list.component.html",
  styleUrls: ["./asset-list.component.css"],
})
export class AssetListComponent implements OnInit, OnDestroy, OnChanges {
  @Input() transactionSuccess: boolean = false;
  @Input() selectedTeam: string;

  @Output() outputTransaction = new EventEmitter<object>();

  private _alive: boolean = true;

  currentSeason: string;
  currentSeasonType: string;
  currentDraftSeason: string;
  nextDraftSeason: string;

  players: any[];
  goalies: any[];
  picks: any[];
  teams: Team[];

  transaction = {
    players: null,
    goalies: null,
    picks: null,
  };

  constructor(
    private _currentSeasonService: CurrentSeasonService,
    private _transactionService: TransactionsService,
    private _teamsService: TeamService,
    private _draftService: DraftService,
    private _statsService: StatsService
  ) {
    this.currentSeason = this._currentSeasonService.currentSeason;
    this.currentSeasonType = this._currentSeasonService.currentSeasonType;
    this.currentDraftSeason = this._currentSeasonService.currentOffSeason;
    this.nextDraftSeason = this._currentSeasonService.currentNextOffSeason;
    console.log(this.currentSeason);
    console.log(this.currentSeasonType);
    console.log(this.currentDraftSeason);
    console.log(this.nextDraftSeason);
  }

  ngOnInit() {
    this._teamsService
      .getTeamsByActive("true")
      .pipe(takeWhile(() => this._alive))
      .subscribe((teams: Team[]) => {
        this.teams = teams;
        this._transactionService.setTeams(teams);
      });
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
      if (this.selectedTeam !== "FA") {
        this.getListOfPicks(this.selectedTeam);
      }
    }
  }

  getListOfPlayers(name: string) {
    this._statsService
      .getActivePlayersByTeam(
        name,
        "true",
        this.currentSeason,
        this.currentSeasonType
      )
      .pipe(
        takeWhile(() => this._alive),
        map((players) => (this.players = players))
      )
      .subscribe();
  }

  getListOfGoalies(name: string) {
    this._statsService
      .getActiveGoaliesByTeam(
        name,
        "true",
        this.currentSeason,
        this.currentSeasonType
      )
      .pipe(
        takeWhile(() => this._alive),
        map((goalies) => (this.goalies = goalies))
      )
      .subscribe();
  }

  getListOfPicks(name: string) {
    const teamId = this.getTeamId(name);

    if (teamId) {
      this._draftService
        .getDraftTableByTeam(
          teamId,
          this.currentDraftSeason,
          this.nextDraftSeason
        )
        .pipe(takeWhile(() => this._alive))
        .subscribe((rows: DraftTable[]) => {
          let teamPicks = [];

          rows.forEach((team) => {
            Object.entries(team).forEach(([key, val]) => {
              if (val === teamId) {
                if (key === "round_one") {
                  teamPicks.push({
                    id: team.id,
                    team: team["shortname"],
                    pick_value: "1st",
                    draft_year: team.draft_year,
                  });
                } else if (key === "round_two") {
                  teamPicks.push({
                    id: team.id,
                    team: team["shortname"],
                    pick_value: "2nd",
                    draft_year: team.draft_year,
                  });
                } else if (key === "round_three") {
                  teamPicks.push({
                    id: team.id,
                    team: team["shortname"],
                    pick_value: "3rd",
                    draft_year: team.draft_year,
                  });
                } else if (key === "round_four") {
                  teamPicks.push({
                    id: team.id,
                    team: team["shortname"],
                    pick_value: "4th",
                    draft_year: team.draft_year,
                  });
                } else if (key === "round_five") {
                  teamPicks.push({
                    id: team.id,
                    team: team["shortname"],
                    pick_value: "5th",
                    draft_year: team.draft_year,
                  });
                }
              }
            });
          });

          this.picks = teamPicks;
        });
    }
  }

  getTeamId(name: string) {
    return this.teams.find((team: Team) => team.shortname === name).id;
  }

  resetTransaction() {
    this.transaction = {
      players: null,
      goalies: null,
      picks: null,
    };
    this.emitOutput();
  }

  onSelectPlayer(event) {
    this.transaction.players = this.getAssetsToMove(
      event.source.selectedOptions.selected
    );
    this.emitOutput();
  }

  onSelectGoalie(event) {
    this.transaction.goalies = this.getAssetsToMove(
      event.source.selectedOptions.selected
    );
    this.emitOutput();
  }

  onSelectPick(event) {
    this.transaction.picks = this.getAssetsToMove(
      event.source.selectedOptions.selected
    );
    this.emitOutput();
  }

  emitOutput() {
    setTimeout(() => {
      this.outputTransaction.emit(this.transaction);
    }, 250);
  }

  getAssetsToMove(group: any[]) {
    const assestsToMove = group.map((pick) => pick.value);
    return assestsToMove;
  }

  ngOnDestroy() {
    this._alive = false;
  }
}
