import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from 'src/app/_models/player';
import { PlayersService } from 'src/app/_services/players.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take, takeWhile } from 'rxjs/operators';
import { DisplayService } from 'src/app/_services/display.service';

@Component({
  selector: 'app-player-add-form',
  templateUrl: './player-add-form.component.html',
  styleUrls: ['./player-add-form.component.css']
})
export class PlayerAddFormComponent implements OnInit, OnDestroy {

  isSaving: boolean;
  isLoading: boolean = true;
  private _alive: boolean = true;

  player$: Observable<Player>;
  player: Player;

  salaryForm: FormGroup;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _playersService: PlayersService,
    private _displayService: DisplayService
  ) { 
    const playerId = this._route.snapshot.params.id;
    this.player$ = this._playersService.getPlayer(playerId);
  }

  ngOnInit() {
    this.createForm();

    this.player$.pipe(
      take(1)
    ).subscribe((player: Player) => {
      this.isLoading = false;
      this.player = player;
      this.patchform(player);
    })

  }

  createForm() {
    this.salaryForm = new FormGroup({
      'player_id': new FormControl('', [Validators.required]),
      'season_2020': new FormControl(''),
      'season_2021': new FormControl(''),
      'season_2022': new FormControl(''),
      'season_2023': new FormControl(''),
      'season_2024': new FormControl(''),
      'season_2025': new FormControl(''),
      'season_2026': new FormControl(''),
      'season_2027': new FormControl(''),
      'season_2028': new FormControl(''),
      'season_2029': new FormControl(''),
      'season_2030': new FormControl(''),
      'season_2031': new FormControl(''),
      'season_2032': new FormControl(''),
      'season_2033': new FormControl(''),
      'season_2034': new FormControl(''),
      'season_2035': new FormControl(''),
      'season_2036': new FormControl(''),
      'season_2037': new FormControl(''),
      'season_2038': new FormControl(''),
      'season_2039': new FormControl(''),
      'season_2040': new FormControl(''),
    })
  }

  patchform(player: Player) {
    this.salaryForm.patchValue({'player_id': player.id})
  }

  handleAddSave() {

    const salaryData = {
      ...this.salaryForm.value
    }

    console.log(salaryData);
  }

  ngOnDestroy(): void {
    this._alive = false;
  }

}
