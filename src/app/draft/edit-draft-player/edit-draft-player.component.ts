import { Component, OnInit, OnDestroy } from '@angular/core';
import { DraftService } from '../draft.service';
import { takeWhile } from 'rxjs/operators';
import { MainService } from 'src/app/main/main.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-draft-player',
  templateUrl: './edit-draft-player.component.html',
  styleUrls: ['./edit-draft-player.component.css']
})
export class EditDraftPlayerComponent implements OnInit, OnDestroy {

  private _alive:boolean = true;
  isLoading: boolean = false;
  isSaving: boolean = false;
  isMobile: boolean = false;
  hasError: boolean = false;

  playerId: number;

  teamSelected: string;
  positionSelected: string;

  player: any;
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
    private _draftsService: DraftService,
    private _mainService: MainService
  ) { 
    this.playerId = this._draftsService.playerId;
    this.teams = this._mainService.currentLeague.teams;
    this.teams.sort((a,b) => (a.shortName > b.shortName) ? 1 : ((b.shortName > a.shortName) ? -1 : 0));
  }

  ngOnInit() {
    this.checkMobile();
    this.isLoading = true;
    this.loadPlayer(this.playerId);
    this.isLoading = false;
  }

  findLogo(shortName) {
    if (shortName) {
      let team = this._mainService.getTeamInfo(shortName);
      return { image: team.image, name: team.name }
    } else {
      return { image: "../../assets/team_logos/Free_Agent_logo_square.jpg", name: "Free Agent"}
    }
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

  loadPlayer(id) {
    this._draftsService.getDraftPlayer(id).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      console.log(resp);
      this.player = resp;
      this.setValues(this.player);
    });
  }

  setValues(player) {
    this.playerName.setValue(player[0].player_name);
    this.draftId.setValue(player[0].id);
    this.teamName.setValue(player[0].team);
    this.year.setValue(player[0].draft_year);
    this.round.setValue(player[0].round_num);
    this.overall.setValue(player[0].number_num);
    this.team = this.findLogo(player[0].teamshort);
    this.teamSelected = player[0].teamshort;
    this.positionSelected = player[0].player_pos;
  }

  onSave() {
    this.isSaving = true;
    let player = {
      id: this.draftId.value,
      team: this.findLogo(this.teamSelected).name,
      draft_year: this.year.value,
      player_name: this.playerName.value,
      round_num: this.round.value,
      number_num: this.overall.value,
      player_pos: this.positionSelected,
      teamshort: this.teamSelected
    }
    this._draftsService.updateDraftPlayer(player).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      // console.log(resp);
      this._mainService.popupTrigger(resp);
      this._draftsService.showEditDraftPlayerTrigger(false);
      this.isSaving = false;
    }, error => {
      console.log(error);
      this._mainService.popupTrigger(error.error);
      this.hasError = true;
      this.isSaving = false;
    })
  }

  onDelete(id) {
    this.isSaving = true;
    this._draftsService.deletePlayer(id).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      console.log(resp);
      this._mainService.popupTrigger(resp);
      this._draftsService.showEditDraftPlayerTrigger(false);
      this.isSaving = false;
    });
  }

  onCancel() {
    this._draftsService.showEditDraftPlayerTrigger(false);
  }

  ngOnDestroy() {
    this._alive = false;
  }

}
