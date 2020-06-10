import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { TeamService } from 'src/app/_services/team.service';
import { Team } from '../../_models/team';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { takeWhile } from 'rxjs/operators';
import { TransactionsService } from 'src/app/_services/transactions.service';

@Component({
  selector: 'app-team-select',
  templateUrl: './team-select.component.html',
  styleUrls: ['./team-select.component.css']
})
export class TeamSelectComponent implements OnInit, OnDestroy {

  private _alive: boolean = true;

  teams$: Observable<Team[]>;

  teamSelectForm: FormGroup;

  constructor(
    private _teamService: TeamService,
    private _transactionService: TransactionsService
  ) { 
    this.teams$ = this._teamService.getTeamsByActive('true');
  }

  ngOnInit() {
    this.createForm();

    this.teamOne.valueChanges.pipe(
      takeWhile(() => this._alive)
    ).subscribe((value: string) => {
      this._transactionService.teamOneTrigger(value);
    })

    this.teamTwo.valueChanges.pipe(
      takeWhile(() => this._alive)
    ).subscribe((value: string) => {
      this._transactionService.teamTwoTrigger(value);
    })
  }

  createForm() {
    this.teamSelectForm = new FormGroup({
      'selectedTeamOne': new FormControl('', [Validators.required]),
      'selectedTeamTwo': new FormControl('', [Validators.required]),
    })
  }

  ngOnDestroy(): void {
    this._alive = false;
  }

  get teamOne() {
    return this.teamSelectForm.get('selectedTeamOne');
  }

  get teamTwo() {
    return this.teamSelectForm.get('selectedTeamTwo');
  }

}
