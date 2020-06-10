import { Component, OnInit } from '@angular/core';
import { DraftPlayerService } from '../_services/draft-player.service';
import { Observable } from 'rxjs';
import { DraftPlayer } from '../_models/draft-table';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DisplayService } from '../_services/display.service';
import { ActivatedRoute, Router } from '@angular/router';
import { take, takeWhile } from 'rxjs/operators';
import { PlayersService } from '../_services/players.service';
import { LeagueService } from '../_services/league.service';
import { TeamService } from '../_services/team.service';
import { StatsService } from '../_services/stats.service';
import { Player } from '../_models/player';
import { Team } from '../_models/team';

@Component({
  selector: 'app-draft-players',
  templateUrl: './draft-players.component.html',
  styleUrls: ['./draft-players.component.css']
})
export class DraftPlayersComponent implements OnInit {

  isSaving: boolean;
  isLoading: boolean = true;
  inEditMode: boolean;
  private _alive: boolean = true;
  currentOffSeason: string;
  currentSeason: string;

  player$: Observable<DraftPlayer>;
  leaguePlayers$: Observable<Player[]>;
  players: any[];
  teams$: Observable<Team[]>;
  teams: Team[];
  player: DraftPlayer;

  playerForm: FormGroup;

  constructor(
    private _displayService: DisplayService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _draftPlayerService: DraftPlayerService,
    private _statsService: StatsService,
    private _playersService: PlayersService,
    private _leagueService: LeagueService,
    private _teamService: TeamService
  ) { 
    if (this._route.snapshot.url.find(url => url.path.includes('edit'))) {
      this.inEditMode = true;
      const playerId = this._route.snapshot.params.id;
      this.player$ = this._draftPlayerService.getDrafterPlayerById(playerId);
      this.leaguePlayers$ = this._playersService.getAllPlayers();
      this.teams$ = this._teamService.getTeams();
    } else {
      this.teams$ = this._teamService.getTeamsByActive('true');
    }
    this.currentOffSeason = this._leagueService.currentOffSeason;
    this.currentSeason = this._leagueService.currentSeason;
  }

  ngOnInit() {

    if (this.inEditMode) {
      this.createForm();

      this.player$.pipe(
        take(1)
      ).subscribe((player: DraftPlayer) => {
        this.isLoading = false;
        this.player = player;
        this.listenForLeaguePlayers();
        this.patchform(player);
      })

    } else {
      this.createAddForm();
      this.isLoading = false;

      this.positionType.valueChanges.pipe(
        takeWhile(() => this._alive)
      ).subscribe((position: string) => {

        if (position === 'isgoalie') {
          this.leaguePlayers$ = this._statsService.getActiveGoaliesByTeam('FA','true', this.currentSeason);
        } else {
          this.leaguePlayers$ = this._statsService.getActivePlayersByTeam('FA','true', this.currentSeason);
        }

        this.listenForLeaguePlayers();

      });

    }

    this.teams$.pipe(
      takeWhile(() => this._alive)
    ).subscribe((teams: Team[]) => {
      this.teams = teams;
    })
    
  }

  listenForLeaguePlayers() {
    this.leaguePlayers$.pipe(
      takeWhile(() => this._alive)
    ).subscribe((players) => {
      this.players = players
    })
  }

  createForm() {
    this.playerForm = new FormGroup({
      'player_id': new FormControl({ value:'', disabled: this.inEditMode}, [Validators.required]),
      'draft_year': new FormControl(this.currentOffSeason, [Validators.required]),
      'draft_round': new FormControl('', [Validators.required]),
      'draft_overall': new FormControl('', [Validators.required]),
      'team_id': new FormControl('', [Validators.required])
    })
  }

  createAddForm() {
    this.playerForm = new FormGroup({
      'position': new FormControl('', [Validators.required]),
      'player_id': new FormControl('', [Validators.required]),
      'draft_year': new FormControl(this.currentOffSeason, [Validators.required]),
      'draft_round': new FormControl('', [Validators.required]),
      'draft_overall': new FormControl('', [Validators.required]),
      'team_id': new FormControl('', [Validators.required])
    })
  }

  patchform(player: DraftPlayer) {
    this.playerForm.patchValue({
      'player_id': player.player_id,
      'draft_year': player.draft_year,
      'draft_round': player.draft_round,
      'draft_overall': player.draft_overall,
      'team_id': player.team_id
    })

  }

  onSave() {
    this.isSaving = true;
    this.inEditMode ? this.handleEditSave() : this.handleAddSave();
  }

  updatePlayerStatWithTeam(playerStatData, position: string) {

    if (position === 'isplayer') {

      this._statsService.updatePlayerStats(playerStatData).pipe(
        takeWhile(() => this._alive)
      ).subscribe(resp => {
        this.isSaving = false;
        this._displayService.popupTrigger(resp);
        this._draftPlayerService.draftPlayerTrigger('added');
      }, error => {
        this._displayService.popupTrigger(error);
      });
    } else {

      this._statsService.updateGoalieStats(playerStatData).pipe(
        takeWhile(() => this._alive)
      ).subscribe(resp => {
        this.isSaving = false;
        this._displayService.popupTrigger(resp);
        this._draftPlayerService.draftPlayerTrigger('added');
      }, error => {
        this._displayService.popupTrigger(error);
      });

    }

  }

  handleAddSave() {

    const playerData = {
      ...this.playerForm.value,
    };

    delete playerData.position;

    const playerStatTeam = this.teams.find((team: Team) => team.id === playerData.team_id).shortname;
    const playerStatsId = this.players.find((player) => player.player_id === this.playerForm.controls.player_id.value).id;

    const playerStatData = {
      id: playerStatsId,
      team_name: playerStatTeam
    };

    if (playerStatTeam) {
      
      this._draftPlayerService.addDraftedPlayer(playerData).pipe(
        takeWhile(() => this._alive)
      ).subscribe(resp => {
        this.isSaving = false;
        this._displayService.popupTrigger('Player Drafted');
        this.updatePlayerStatWithTeam(playerStatData, this.positionType.value);
        this.playerForm.reset();
      }, error => {
        this._displayService.popupTrigger(error);
        this.playerForm.reset();
      })

    }

  }

  handleEditSave() {

    const playerData = {
      ...this.playerForm.value,
      id: this.player.id,
    }

    this._draftPlayerService.updateDraftedPlayer(playerData).pipe(
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
    if (this.inEditMode) {
      this._router.navigate(['../../'], {relativeTo: this._route});
    } else {
      this.playerForm.reset();
    }
  }

  onDelete() {
    this._draftPlayerService.deletedDraftedPlayer(this.player.id).pipe(
      takeWhile(() => this._alive)
    ).subscribe(resp => {
      this.isSaving = false;
      this._displayService.popupTrigger(resp);
      this._router.navigate(['../../'], {relativeTo: this._route});
    }, error => {
      this._displayService.popupTrigger(error);
    });
  }

  ngOnDestroy(): void {
    this._alive = false;
  }

  get positionType() {
    return this.playerForm.get('position');
  }

}
