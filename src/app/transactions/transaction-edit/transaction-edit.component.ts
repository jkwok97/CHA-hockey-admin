import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionsService } from 'src/app/_services/transactions.service';
import { takeWhile } from 'rxjs/operators';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { Team } from 'src/app/_models/team';
import { TeamService } from 'src/app/_services/team.service';
import { DisplayService } from 'src/app/_services/display.service';

@Component({
  selector: 'app-transaction-edit',
  templateUrl: './transaction-edit.component.html',
  styleUrls: ['./transaction-edit.component.css']
})
export class TransactionEditComponent implements OnInit, OnDestroy {

  private _alive: boolean = true;
  isLoading: boolean;
  isSaving: boolean = false;

  teams$: Observable<Team[]>;

  transactionId: number;

  form: FormGroup;
  team_one_picks: [];
  team_two_picks: [];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _transactionsService: TransactionsService,
    private _teamService: TeamService,
    private _displayService: DisplayService
  ) {
    this.transactionId = this._route.snapshot.params.id;
    this.getTransactionInfo(this.transactionId);
    this.teams$ = this._teamService.getTeams();
    this.createForm();
   }

  ngOnInit() {
    this.isLoading = true;
  }

  addPicks(teamOnePicks, teamTwoPicks) {
    const onePicks = this.form.controls.team_one_picks as FormArray;

    teamOnePicks.forEach((item) => {
      onePicks.push(this._formBuilder.group({
          pick: item
        }));
    });

    const twoPicks = this.form.controls.team_two_picks as FormArray;

    teamTwoPicks.forEach((item) => {
      twoPicks.push(this._formBuilder.group({
          pick: item
        }));
    });
  }

  getTransactionInfo(id: number) {
    this._transactionsService.getTransactionById(id).pipe(
      takeWhile(() => this._alive)
    ).subscribe(transaction => {

      const t = transaction.map((item, index) => ({
        id: item.id,
        transaction_date: item.transaction_date,
        team_one_id: item.team_one_id,
        team_one_picks: item.team_one_picks,
        team_one_players:this.formatPlayers(item.team_one_players, item.team_one_firstnames, item.team_one_lastnames, item.team_one_nhlids),
        team_two_id: item.team_two_id,
        team_two_picks: item.team_two_picks,
        team_two_players: this.formatPlayers(item.team_two_players, item.team_two_firstnames, item.team_two_lastname, item.team_two_nhlids)
      }));

      this.patchForm(t[0]);

      this.isLoading = false;
    })
  }

  createForm() {
    this.form = this._formBuilder.group({
      'id': new FormControl('', [Validators.required]),
      'team_one_id': new FormControl({value: '', disabled: true}, [Validators.required]),
      'team_two_id': new FormControl({value: '', disabled: true}, [Validators.required]),
      'team_one_picks': this._formBuilder.array([]),
      'team_two_picks': this._formBuilder.array([])
    });
  }

  patchForm(t) {

    this.form.patchValue({
      'id': +t.id,
      'team_one_id': +t.team_one_id,
      'team_two_id': +t.team_two_id
    });

    this.team_one_picks = t.team_one_picks;
    this.team_two_picks = t.team_two_picks;

    this.addPicks(this.team_one_picks, this.team_two_picks);
  }

  formatPlayers(ids, firstnames, lastnames, nhlids) {
    if (ids) {
      return ids.map((player, index) => ({
        id: ids[index],
        firstname: firstnames[index],
        lastname: lastnames[index],
        nhl_id: nhlids[index]
      }));
    }
  }

  onSave() {
    this.isSaving = true;

    const body = {
      team_one_picks: this.form.value.team_one_picks.map((pick) => pick.pick),
      team_two_picks: this.form.value.team_two_picks.map((pick) => pick.pick),
    }

    this._transactionsService.updateTransaction(this.form.value.id, body).pipe(
      takeWhile(() => this._alive)
    ).subscribe(resp => {
      this.isSaving = false;
      this._displayService.popupTrigger('Success');
      this._router.navigate(['transactions']);
    }, error => {
      this.isSaving = false;
      this._displayService.popupTrigger(error['message']);
    })
  }

  onCancel() {
    this._router.navigate(['transactions']);
  }

  onDelete() {
    this._transactionsService.deleteTransaction(this.form.value.id).pipe(
      takeWhile(() => this._alive)
    ).subscribe(resp => {
      this.isSaving = false;
      this._displayService.popupTrigger('Success');
      this._router.navigate(['transactions']);
    }, error => {
      this.isSaving = false;
      this._displayService.popupTrigger(error['message']);
    })
  }

  ngOnDestroy(): void {
    this._alive = false;
  }

}
