import { Component, OnInit, OnDestroy } from '@angular/core';
import { MainService } from 'src/app/main/main.service';
import { ActivatedRoute, Router } from '@angular/router';
import { takeWhile } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.css']
})
export class PlayerCardComponent implements OnInit, OnDestroy {

  private _alive:boolean = true;
  isLoading: boolean = false;
  isSaving: boolean = false;
  isGoalie: boolean = false;
  hasError: boolean = false;
  isMobile: boolean = false;

  position: string;
  hits: string;
  seasonType: string;
  selected: string;
  type: string;
  prevTeam: string;

  player: any;
  team: any;
  teams: any[];

  playerName = new FormControl('', [Validators.required])
  teamName = new FormControl('', [Validators.required])

  constructor(
    private _mainService: MainService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.position = this._mainService.playerPosition;
    this.hits = this._mainService.playerHits;
    this.seasonType = this._mainService.currentSeasonType;
    this.teams = this._mainService.currentLeague.teams;
    this.teams.sort((a,b) => (a.shortName > b.shortName) ? 1 : ((b.shortName > a.shortName) ? -1 : 0));
   }

  ngOnInit() {
    this.checkMobile();
    this.isLoading = true;
    this.setPlayerCard();
  }

  checkMobile() {
    if ( navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i) ) {
          this.isMobile = true;
        } else {
          this.isMobile = false;
        }
  }

  setPlayerCard() {
    if ((!this.position && !this.hits) || this.position === "G") {
      this.isGoalie = true;
      this._mainService.getAllIndividualGoalieStatsByType(this._route.snapshot.params.params, this.seasonType).pipe(takeWhile(() => this._alive)).subscribe(resp => {
        // console.log(resp);
        this.player = resp[0];
        this.prevTeam = this.player.team_name;
        // console.log(this.prevTeam);
        this.team = this.findLogo(this.player.team_name);
        this.selected = this.team.short;
        this.isLoading = false;
      });
    } else {
      this._mainService.getAllIndividualPlayerStatsByType(this._route.snapshot.params.params, this.seasonType).pipe(takeWhile(() => this._alive)).subscribe(resp => {
        // console.log(resp);
        this.player = resp[0];
        this.prevTeam = this.player.team_name;
        this.team = this.findLogo(this.player.team_name);
        this.selected = this.team.short;
        this.isLoading = false;
      });
    }
  }

  findLogo(shortName) {
    if (shortName) {
      let team = this._mainService.getTeamInfo(shortName);
      return { image: team.image, name: team.name, short: team.shortName }
    } else {
      return { image: "../../assets/team_logos/Free_Agent_logo_square.jpg", name: "Free Agent", short: "FA"}
    }
  }

  onSelectChange(event) {
    this.team = this._mainService.getTeamInfo(event.value);
    this.player.team_name = event.value;
  }

  onSave() {
    this.isSaving = true;
    if (this.prevTeam === "FA") {
      this.type = "Waiver Pick Up"
    } else if (this.player.team_name === "FA") {
      this.type = "Waiver Drop"
    } else {
      this.type = "Trade"
    }
    if (this.isGoalie) {
      this._mainService.tradeGoalie(this.selected, this.player.id, this.player, this.type, this.prevTeam).pipe(takeWhile(() => this._alive)).subscribe(resp => {
        this.setPlayerCard();
        this._mainService.popupTrigger(resp);
        this.isSaving = false;
      }, error => {
        console.log(error);
        this._mainService.popupTrigger(error.error);
        this.hasError = true;
        this.isSaving = false;
      });
    } else {
      this._mainService.tradePlayer(this.selected, this.player.id, this.player, this.type, this.prevTeam).pipe(takeWhile(() => this._alive)).subscribe(resp => {
        this.setPlayerCard();
        this._mainService.popupTrigger(resp);
        this.isSaving = false;
      }, error => {
        console.log(error);
        this._mainService.popupTrigger(error.error);
        this.hasError = true;
        this.isSaving = false;
      });
    }
  }

  onCancel() {
    this._router.navigate(['/main']);
  }

  ngOnDestroy() {
    this._alive = false;
  }

}