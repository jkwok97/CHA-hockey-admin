import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MainService } from 'src/app/main/main.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DraftService } from '../draft.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-add-new-player',
  templateUrl: './add-new-player.component.html',
  styleUrls: ['./add-new-player.component.css']
})
export class AddNewPlayerComponent implements OnInit {

  private _alive:boolean = true;
  isLoading: boolean = false;
  isSaving: boolean = false;
  isGoalie: boolean = false;
  hasError: boolean = false;
  isMobile: boolean = false;

  position: string;
  hits: string;
  seasonType: string;
  playerId: string;
  teamSelected: string;
  positionSelected: string;

  player: any;
  playerSalary: any;
  team: any;
  teams: any[];

  playerName = new FormControl('', [Validators.required]);
  draftId = new FormControl('', [Validators.required]);
  teamName = new FormControl('', [Validators.required]);
  year = new FormControl('', [Validators.required]);
  round = new FormControl('', [Validators.required]);
  overall = new FormControl('', [Validators.required]);

  positions = ["Center", "Winger", "Defense", "Goaltender"];

  constructor(
    private _mainService: MainService,
    private _draftsService: DraftService,
    private _router: Router
  ) { 
    this.teams = this._mainService.currentLeague.teams;
    this.teams.sort((a,b) => (a.shortName > b.shortName) ? 1 : ((b.shortName > a.shortName) ? -1 : 0));
  }

  ngOnInit() {
    this.checkMobile();
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

  findLogo(shortName) {
    if (shortName) {
      let team = this._mainService.getTeamInfo(shortName);
      return { image: team.image, name: team.name }
    } else {
      return { image: "../../assets/team_logos/Free_Agent_logo_square.jpg", name: "Free Agent"}
    }
  }

  onSave() {
    this.isSaving = true;
    let player = {
      team: this.findLogo(this.teamSelected).name,
      draft_year: this.year.value,
      player_name: this.playerName.value,
      round_num: this.round.value,
      number_num: this.overall.value,
      player_pos: this.positionSelected,
      teamshort: this.teamSelected
    }
    console.log(player);
    this._draftsService.addPlayer(player).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      console.log(resp);
      this._mainService.popupTrigger(resp);
      this._draftsService.showEditDraftPlayerTrigger(false);
      this.resetValues();
      this.isSaving = false;
    }, error => {
      console.log(error);
      this._mainService.popupTrigger(error);
      this.isSaving = false;
    });
  }

  resetValues() {
    this.playerName.reset();
    this.round.reset();
    this.year.reset();
    this.overall.reset();
    this.positionSelected = null;
    this.teamSelected = null;
  }

  onCancel() {
    this.resetValues();
  }

  ngOnDestroy() {
    this._alive = false;
  }

}
