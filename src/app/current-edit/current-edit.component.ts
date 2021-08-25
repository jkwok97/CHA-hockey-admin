import { Component, OnInit } from '@angular/core';
import { CurrentPlayer } from '../_models/player';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DisplayService } from '../_services/display.service';
import { ActivatedRoute, Router } from '@angular/router';
import { take, takeWhile } from 'rxjs/operators';
import { TeamService } from '../_services/team.service';
import { StatsService } from '../_services/stats.service';
import { Team } from '../_models/team';

@Component({
  selector: 'app-current-edit',
  templateUrl: './current-edit.component.html',
  styleUrls: ['./current-edit.component.css']
})
export class CurrentEditComponent implements OnInit {

  isSaving: boolean;
  isLoading: boolean = true;
  inEditPlayer: boolean;
  private _alive: boolean = true;

  player$: Observable<CurrentPlayer>;
  teams$: Observable<Team[]>
  player: CurrentPlayer;

  playerForm: FormGroup;

  constructor(
    private _displayService: DisplayService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _statsService: StatsService,
    private _teamsService: TeamService
  ) { 

    if (this._route.snapshot.url.find(url => url.path.includes('players'))) {
      this.inEditPlayer = true;
      const playerId = this._route.snapshot.params.id;
      this.player$ = this._statsService.getPlayerStatById(playerId);

    } else if (this._route.snapshot.url.find(url => url.path.includes('goalies'))) {

      const playerId = this._route.snapshot.params.id;
      this.player$ = this._statsService.getGoalieStatById(playerId);

    }
    
    this.teams$ = this._teamsService.getTeamsByActive('true');
  }

  ngOnInit() {

    this.createForm();

    this.player$.pipe(
      take(1)
    ).subscribe((player: CurrentPlayer) => {
      this.isLoading = false;
      this.player = player;
      this.patchform(player);
    })
    
  }

  createForm() {
    this.playerForm = new FormGroup({
      'team_name': new FormControl('', [Validators.required]),
      'position': new FormControl('', [Validators.required])
    })
  }

  patchform(player: CurrentPlayer) {
    console.log(player);
    this.playerForm.patchValue({
      'team_name': player.team_name,
      'position': player.position
    })

  }

  onSave() {

    this.isSaving = true

    const playerData = {
      ...this.playerForm.value,
      id: this.player.id
    }

    if (this.inEditPlayer) {
      this.updatePlayer(playerData);
    } else {
      this.updateGoalie(playerData);
    }

  }

  updatePlayer(playerData: any) {
    this._statsService.updatePlayerStats(playerData).pipe(
      takeWhile(() => this._alive)
    ).subscribe(resp => {
      this.isSaving = false;
      this._displayService.popupTrigger(resp);
      this._router.navigate(['../../'], {relativeTo: this._route});
    }, error => {
      this._displayService.popupTrigger(error);
    });
  }

  updateGoalie(playerData: any) {
    this._statsService.updateGoalieStats(playerData).pipe(
      takeWhile(() => this._alive)
    ).subscribe(resp => {
      this.isSaving = false;
      this._displayService.popupTrigger(resp);
      this._router.navigate(['../../'], {relativeTo: this._route});
    }, error => {
      this._displayService.popupTrigger(error);
    });
  }

  onCancel() {
    this._router.navigate(['../../'], {relativeTo: this._route});
  }

  ngOnDestroy(): void {
    this._alive = false;
  }

}
