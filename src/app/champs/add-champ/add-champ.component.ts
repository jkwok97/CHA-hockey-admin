import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { takeWhile, map, take, startWith } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ChampionsService } from 'src/app/_services/champions.service';
import { DisplayService } from 'src/app/_services/display.service';
import { CurrentSeasonService } from 'src/app/_services/current-season.service';
import { Observable } from 'rxjs';
import { Team } from 'src/app/_models/team';
import { TeamService } from 'src/app/_services/team.service';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-add-champ',
  templateUrl: './add-champ.component.html',
  styleUrls: ['./add-champ.component.css']
})
export class AddChampComponent implements OnInit {

  private _alive:boolean = true;
  isLoading: boolean = false;
  isSaving: boolean = false;
  isMobile: boolean = false;
  inEditMode: boolean = false;

  showPlayerField: boolean = false;

  awardForm: FormGroup;
  
  currentSeason: string;

  awardTypes$: Observable<string[]>;
  teams$: Observable<Team[]>;
  owners$: Observable<User[]>;
  players: [];
  teams: Team[];
  winner: any;

  constructor(
    private _route: ActivatedRoute,
    private _championsService: ChampionsService,
    private _displayService: DisplayService,
    private _currentSeasonService: CurrentSeasonService,
    private _router: Router,
    private _teamsService: TeamService,
    private _userService: UserService
  ) { 
    this.currentSeason = this._currentSeasonService.currentSeason;

    if (this._route.snapshot.params.id) {
      this.inEditMode = true;
      this.isLoading = true;
      this.getAwardWinner(this._route.snapshot.params.id);
    } 

    this.awardTypes$ = this._championsService.getAwardTypes();
    this.teams$ = this._teamsService.getTeamsByActive('true');
    this.owners$ = this._userService.getAllUsers();
  }

  ngOnInit() {

    this.isMobile = this._displayService.isMobile;

    this.teams$.pipe(
      takeWhile(() => this._alive)
    ).subscribe((teams: Team[]) => {
      this.teams = teams;
    })

    this.createForm();

    this.awardType.valueChanges.pipe(
      takeWhile(() => this._alive)
    ).subscribe((id) => {
      this.showPlayerField = this.allowPlayerField(id);
      this.showPlayerField ? this.wonByPlayer.setValidators([Validators.required]) : this.updatePlayerField();
    });

    this.teamForm.valueChanges.pipe(
      startWith(this._route.snapshot.params.id),
      takeWhile(() => this._alive)
    ).subscribe((id: number) => {
      if (id && this.teams) {
        const teamName = this.getTeamName(id);
        this.getPlayers(teamName);
        this.getTeamOwner(teamName);
      }
    });

  }

  createForm() {
    this.awardForm = new FormGroup({
      'cha_season': new FormControl(this.currentSeason, [Validators.required]),
      'display_season': new FormControl('2021', [Validators.required]),
      'award_type': new FormControl('', [Validators.required]),
      'users_id': new FormControl('', [Validators.required]),
      'player_id': new FormControl(''),
      'team_id': new FormControl('', [Validators.required])
    })
  }

  patchForm(winner) {
    this.awardForm.patchValue({
      'cha_season': winner.cha_season,
      'display_season': winner.display_season,
      'award_type': winner.awardtypeid,
      'users_id': winner.ownerid,
      'player_id': winner.playerid,
      'team_id': winner.teamid
    });

    setTimeout(() => {
      this.isLoading = false;
    }, 1000)
  }

  getAwardWinner(id: number) {
    this._championsService.getAwardWinnerById(id).pipe(
      takeWhile(() => this._alive)
    ).subscribe((winner) => {
      this.winner = winner;
      this.patchForm(this.winner);
    })
  }

  updatePlayerField() {
    this.wonByPlayer.setValidators(null);
    this.wonByPlayer.setValue(null);
  }

  getTeamName(id) {
    return this.teams.find((team) => team.id === id).shortname;
  }

  getPlayers(name: string) {
    this._teamsService.getPlayersByTeamName(name, this.currentSeason, 'Regular').pipe(
      take(1)
    ).subscribe((players) => {
      this.players = players['players'].concat(players['goalies']);
    })
  }

  getTeamOwner(name: string) {
    this._teamsService.getUserByTeamName(name).pipe(
      take(1)
    ).subscribe((id) => {
      this.ownerForm.setValue(id['users_id']);
    })
  }

  allowPlayerField(id) {
    switch (id) {
      case 2:
      case 3:
      case 4:
        return false;
      default:
        return true;
    }
  }

  onSave() {
    this.isSaving = true;

    const awardWinner = {
      ...this.awardForm.value
    }

    this._championsService.addAwardWinner(awardWinner).pipe(
      takeWhile(() => this._alive)
    ).subscribe(resp => {
      this._displayService.popupTrigger(resp['message']);
      this.awardForm.reset();
      this.isSaving = false;
      this._router.navigate(['champs']);
    }, error => {
      this._displayService.popupTrigger(error);
      this.isSaving = false;
    })
  }

  onEditSave(id) {

    this.isSaving = true;

    const awardWinner = {
      ...this.awardForm.value
    }

    this._championsService.updateAwardWinner(id, awardWinner).pipe(
      takeWhile(() => this._alive)
    ).subscribe(resp => {
      this._displayService.popupTrigger(resp['message']);
      this.awardForm.reset();
      this.isSaving = false;
      this._router.navigate(['champs']);
    }, error => {
      this._displayService.popupTrigger(error);
      this.isSaving = false;
    })
  }

  onCancel() {
    this.awardForm.reset();
    this._router.navigate(['champs']);
  }

  onDelete(id: number) {
    this.isSaving = true;

    this._championsService.deleteAwardWinner(id).pipe(
      takeWhile(() => this._alive)
    ).subscribe(resp => {
      this._displayService.popupTrigger(resp['message']);
      this.isSaving = false;
      this._router.navigate(['champs']);
    }, error => {
      this._displayService.popupTrigger(error);
      this.isSaving = false;
    })
  }

  ngOnDestroy() {
    this._alive = false;
  }

  get awardType() {
    return this.awardForm.get('award_type');
  }

  get wonByPlayer() {
    return this.awardForm.get('player_id');
  }

  get teamForm() {
    return this.awardForm.get('team_id');
  }

  get ownerForm() {
    return this.awardForm.get('users_id');
  }

}
