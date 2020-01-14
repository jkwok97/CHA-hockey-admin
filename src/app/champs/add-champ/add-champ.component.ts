import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { MainService } from 'src/app/main/main.service';
import { takeWhile } from 'rxjs/operators';
import { ChampService } from '../champ.service';

@Component({
  selector: 'app-add-champ',
  templateUrl: './add-champ.component.html',
  styleUrls: ['./add-champ.component.css']
})
export class AddChampComponent implements OnInit {

  private _alive:boolean = true;
  isLoading: boolean = false;
  isSaving: boolean = false;
  isGoalie: boolean = false;
  hasError: boolean = false;
  isMobile: boolean = false;
  showTeams: boolean = false;
  addMode: boolean = false;

  type: string;
  editType: string;
  playerId: string;
  teamSelected: string;
  ownerSelected: string;
  positionSelected: string;

  champ: any;
  team: any;
  teams: any[];
  owners: any[] = [];

  yearWon = new FormControl('2019-20', [Validators.required]);
  playerName = new FormControl(null, [Validators.required]);
  // ownerName = new FormControl(null, [Validators.required]);
  teamName = new FormControl('', [Validators.required]);
  champId = new FormControl('', [Validators.required]);

  positions = ["Center", "Winger", "Defense", "Goaltender"];
  types = ["champ", "gm", "defense", "goalie", 'scorer', 'rookie', 'season'];

  constructor(
    private _mainService: MainService,
    private _champService: ChampService
  ) { 
    this.teams = this._mainService.currentLeague.teams;
    this.teams.sort((a,b) => (a.shortName > b.shortName) ? 1 : ((b.shortName > a.shortName) ? -1 : 0));
    this.teams.forEach(team => {
      this.owners.push(team.owner);
    });
    this.champ = this._champService.champion;
  }

  ngOnInit() {
    this.checkMobile();
    this.editType = this._champService.editType;
    if (this.editType === "Edit") {
      this.champ = this._champService.champion;
      this.setValues(this.champ);
    }
    // console.log(this.editType);
    this._champService.showAddChampPlayerListener().pipe(takeWhile(() => this._alive)).subscribe(resp => {
      // console.log(resp);
      this.editType = resp;
    });
  }

  setValues(champ) {
    this.yearWon.setValue(champ.year_won);
    this.type = champ.award_type;
    this.ownerSelected = champ.owner_name;
    this.playerName.setValue(champ.player_name);
    this.teamSelected = champ.team_short;
    this.champId.setValue(champ.id);
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

  onTypeChange(event) {
    // console.log(event);
    this.type = event.value;
    if (event.value == 'gm') {
      // this.showTeams = false;
      this.playerName.setValue(null);
    } else if (event.value == 'season') {
      this.playerName.setValue(null);
    } else if (event.value == 'champ') {
      this.playerName.setValue(null);
    } else if (event.value == 'defense') {
      this.ownerSelected = null;
    } else if (event.value == 'scorer') {
      this.ownerSelected = null;
    } else if (event.value == 'goalie') {
      this.ownerSelected = null;
    }
  }

  onOwnerChange(event) {
    this.teamSelected = this.teams.find(team => team.owner === event.value).shortName;
    // console.log(this.teamSelected);
  }

  onSave() {
    this.isSaving = true;
    let champ = {
      year_won: this.yearWon.value,
      team_name: this.findLogo(this.teamSelected).name,
      owner_name: this.ownerSelected,
      player_name: this.playerName.value,
      team_short: this.teamSelected,
      award_type: this.type
    }
    // console.log(champ);
    this._champService.addChampion(champ).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      // console.log(resp);
      this._mainService.popupTrigger(resp);
      this.resetValues();
      this.isSaving = false;
      this._champService.showEditChampPlayerTrigger(false);
      this._champService.showAddChampPlayerTrigger("");
    }, error => {
      console.log(error);
      this._mainService.popupTrigger(error);
      this.isSaving = false;
    });
  }

  onEditSave(id) {
    // console.log(id);
    this.isSaving = true;
    let champ = {
      id: id,
      year_won: this.yearWon.value,
      team_name: this.findLogo(this.teamSelected).name,
      owner_name: this.ownerSelected,
      player_name: this.playerName.value,
      team_short: this.teamSelected,
      award_type: this.type
    }
    // console.log(champ);
    this._champService.updateChamp(champ).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      // console.log(resp);
      this._mainService.popupTrigger(resp);
      this.resetValues();
      this.isSaving = false;
      this._champService.showEditChampPlayerTrigger(false);
      this._champService.showAddChampPlayerTrigger("");
    }, error => {
      console.log(error);
      this._mainService.popupTrigger(error);
      this.isSaving = false;
    });
  }

  resetValues() {
    this.playerName.reset();
    this.yearWon.reset();
    this.teamSelected = null;
    this.ownerSelected = null;
    this.teamSelected = null;
    this.type = null;
  }

  onCancel() {
    this.resetValues();
    this._champService.showEditChampPlayerTrigger(false);
    this._champService.showAddChampPlayerTrigger("");
  }

  onDelete() {
    this.isSaving = false;
    this._champService.deleteChamp(this.champ.id).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      this._mainService.popupTrigger(resp);
      this.isSaving = false;
      this._champService.showEditChampPlayerTrigger(false);
    }, error => {
      console.log(error);
      this._mainService.popupTrigger(error);
      this.isSaving = false;
    });
  }

  ngOnDestroy() {
    this._alive = false;
  }

}
