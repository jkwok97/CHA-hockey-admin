import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from 'src/app/_models/player';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DisplayService } from 'src/app/_services/display.service';
import { ActivatedRoute, Router } from '@angular/router';
import { take, takeWhile } from 'rxjs/operators';
import { PlayersService } from 'src/app/_services/players.service';

@Component({
  selector: 'app-player-info-form',
  templateUrl: './player-info-form.component.html',
  styleUrls: ['./player-info-form.component.css']
})
export class PlayerInfoFormComponent implements OnInit {

  isMobile: boolean;
  isSaving: boolean;
  isLoading: boolean = true;
  inEditMode: boolean;
  private _alive: boolean = true;

  player$: Observable<Player>;
  player: Player;

  playerForm: FormGroup;

  constructor(
    private _displayService: DisplayService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _playersService: PlayersService
  ) { 
    if (this._route.snapshot.url.find(url => url.path.includes('edit'))) {
      this.inEditMode = true;
      const playerId = this._route.snapshot.params.id;
      this.player$ = this._playersService.getPlayer(playerId);
    }
  }

  ngOnInit() {
    this.isMobile = this._displayService.checkMobile();

    this.createForm();

    if (this.inEditMode) {
      this.player$.pipe(
        take(1)
      ).subscribe((player: Player) => {
        this.isLoading = false;
        this.player = player;
        this.patchform(player);
      })
    } else {
      this.isLoading = false;
    }
  }

  createForm() {
    this.playerForm = new FormGroup({
      'firstname': new FormControl('', [Validators.required]),
      'lastname': new FormControl('', [Validators.required]),
      'nhl_id': new FormControl(''),
      'position': new FormControl(''),
      'isactive': new FormControl('')
    })
  }

  patchform(player: Player) {
    this.playerForm.patchValue({
      'firstname': player.firstname,
      'lastname': player.lastname,
      'nhl_id': player.nhl_id,
      'position': this.getPosition(player),
      'isactive': player.isactive
    })

  }

  getPosition(player: Player) {
    if (player.isgoalie) {
      return 'isgoalie';
    } else if (player.isdefense) {
      return 'isdefense';
    } else if (player.isforward) {
      return 'isforward'
    }
  }

  onSave() {
    this.isSaving = true;
    this.inEditMode ? this.handleEditSave() : this.handleAddSave();
  }

  handleAddSave() {

    const playerData = {
      ...this.playerForm.value,
      isgoalie: this.playerForm.controls.position.value === 'isgoalie' ? true : false,
      isdefense: this.playerForm.controls.position.value === 'isdefense' ? true : false,
      isforward: this.playerForm.controls.position.value === 'isforward' ? true : false,
    };

    this._playersService.addPlayer(playerData).pipe(
      takeWhile(() => this._alive)
    ).subscribe(resp => {
      this.isSaving = false;
      this._displayService.popupTrigger(resp);
      this._router.navigate(['../'], {relativeTo: this._route});
    }, error => {
      this._displayService.popupTrigger(error);
    })
  }

  handleEditSave() {

    const playerData = {
      ...this.playerForm.value,
      id: this.player.id,
      isgoalie: this.playerForm.controls.position.value === 'isgoalie' ? true : false,
      isdefense: this.playerForm.controls.position.value === 'isdefense' ? true : false,
      isforward: this.playerForm.controls.position.value === 'isforward' ? true : false,
    }

    this._playersService.updatePlayer(playerData).pipe(
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
      this._router.navigate(['../'], {relativeTo: this._route});
    }
  }

  onDelete() {
    this._playersService.deletePlayer(this.player.id).pipe(
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

}
