import { Component, OnInit } from '@angular/core';
import { DraftService } from 'src/app/_services/draft.service';
import { Observable } from 'rxjs';
import { DraftTable } from 'src/app/_models/draft-table';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DisplayService } from 'src/app/_services/display.service';
import { ActivatedRoute, Router } from '@angular/router';
import { take, takeWhile } from 'rxjs/operators';
import { TeamService } from 'src/app/_services/team.service';
import { Team } from 'src/app/_models/team';

@Component({
  selector: 'app-draft-table-edit',
  templateUrl: './draft-table-edit.component.html',
  styleUrls: ['./draft-table-edit.component.css']
})
export class DraftTableEditComponent implements OnInit {

  isSaving: boolean;
  isLoading: boolean = true;
  private _alive: boolean = true;

  table$: Observable<DraftTable>;
  teams$: Observable<Team[]>
  row: DraftTable;

  tableForm: FormGroup;

  constructor(
    private _displayService: DisplayService,
    private _draftService: DraftService,
    private _teamService: TeamService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) { 
    
    const tableId = this._route.snapshot.params.id;
    this.table$ = this._draftService.getDraftTableById(tableId);
    this.teams$ = this._teamService.getTeamsByActive('true');
  }

  ngOnInit() {

    this.createForm();

    this.table$.pipe(
      take(1)
    ).subscribe((row: DraftTable) => {
      console.log(row);
      this.isLoading = false;
      this.row = row;
      this.patchform(row);
    })
   
  }

  createForm() {
    this.tableForm = new FormGroup({
      'round_one': new FormControl('', [Validators.required]),
      'round_two': new FormControl('', [Validators.required]),
      'round_three': new FormControl('', [Validators.required]),
      'round_four': new FormControl('', [Validators.required]),
      'round_five': new FormControl('', [Validators.required])
    })
  }

  patchform(row: DraftTable) {
    this.tableForm.patchValue({
      'round_one': row.round_one,
      'round_two': row.round_two,
      'round_three': row.round_three,
      'round_four': row.round_four,
      'round_five': row.round_five
    })

  }

  onSave() {

    this.isSaving = true;

    const tableData = {
      ...this.tableForm.value,
      id: this.row.id
    }

    this._draftService.updateDraftTableByYearById(tableData).pipe(
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
