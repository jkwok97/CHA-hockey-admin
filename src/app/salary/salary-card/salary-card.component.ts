import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MainService } from 'src/app/main/main.service';
import { ActivatedRoute, Router } from '@angular/router';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-salary-card',
  templateUrl: './salary-card.component.html',
  styleUrls: ['./salary-card.component.css']
})
export class SalaryCardComponent implements OnInit, OnDestroy {
  
  private _alive:boolean = true;
  isLoading: boolean = false;
  isSaving: boolean = false;
  isGoalie: boolean = false;
  hasError: boolean = false;
  isMobile: boolean = false;

  seasonType: string;
  selected: string;
  type: string;
  prevTeam: string;
  playerId: string;

  player: any;
  playerSalary: any;
  team: any;
  teams: any[];

  playerName = new FormControl('', [Validators.required])
  playerNumber = new FormControl('', [Validators.required])
  currentSalary = new FormControl('', [Validators.required])
  year_two = new FormControl('', [Validators.required])
  year_three = new FormControl('', [Validators.required])
  year_four = new FormControl('', [Validators.required])
  year_five = new FormControl('', [Validators.required])

  constructor(
    private _mainService: MainService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.playerId = this._route.paramMap['destination']['value']['id'];
    this.seasonType = this._mainService.currentSeasonType;
    this.teams = this._mainService.currentLeague.teams;
    this.teams.sort((a,b) => (a.shortName > b.shortName) ? 1 : ((b.shortName > a.shortName) ? -1 : 0));
  }

  ngOnInit() {
    this.checkMobile();
    this.isLoading = true;
    this.setPlayerCard(this.playerId);
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

  setPlayerCard(id) {
    if (this._route.snapshot.params.type === 'goalie') {
      this.isGoalie = true;
      this._mainService.getSalary(id, "goalie").pipe(takeWhile(() => this._alive)).subscribe(resp => {
        this.playerSalary = resp[0] as any;
        this.setValues(this.playerSalary);
        this.type = "goalie";
        this.isLoading = false;
      });
    } else if (this._route.snapshot.params.type === 'defense') {
      this._mainService.getSalary(id, "defense").pipe(takeWhile(() => this._alive)).subscribe(resp => {
        this.playerSalary = resp[0] as any;
        this.setValues(this.playerSalary);
        this.type = "defense";
        this.isLoading = false;
      });
    } else {
      this._mainService.getSalary(id, "forward").pipe(takeWhile(() => this._alive)).subscribe(resp => {
        this.playerSalary = resp[0] as any;
        this.setValues(this.playerSalary);
        this.type = "forward";
        this.isLoading = false;
      });
    }
  }

  setValues(player) {
    this.playerName.setValue(player.player_name);
    this.currentSalary.setValue(player.current_season_salary);
    this.year_two.setValue(player.year_two);
    this.year_three.setValue(player.year_three);
    this.year_four.setValue(player.year_four);
    this.year_five.setValue(player.year_five);
  }

  findLogo(shortName) {
    if (shortName) {
      let team = this._mainService.getTeamInfo(shortName);
      return { image: team.image, name: team.name, short: team.shortName }
    } else {
      return { image: "../../assets/team_logos/Free_Agent_logo_square.jpg", name: "Free Agent", short: "FA"}
    }
  }

  onSave(id) {
    this.isSaving = true;
    this.saveSalary(id, this.type);
    this.type = '';
  }

  saveSalary(id, type) {
    this._mainService.saveSalary(id, type, this.playerName.value, this.currentSalary.value, this.year_two.value, this.year_three.value, this.year_four.value, this.year_five.value).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      this.isSaving = false;
      this._mainService.popupTrigger(resp);
      this._router.navigate(['/main']);
    });
  }

  onCancel() {
    this._router.navigate(['/main']);
  }

  onDelete(id) {
    this.isSaving = true;
    this._mainService.deleteSalary(id, this.type).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      this.isSaving = false;
      this._mainService.popupTrigger(resp);
      this._router.navigate(['/main']);
    });
  }

  ngOnDestroy() {
    this._alive = false;
  }

}
