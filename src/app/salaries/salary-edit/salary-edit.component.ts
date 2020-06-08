import { Component, OnInit } from '@angular/core';
import { SalaryService } from 'src/app/_services/salary.service';
import { Observable } from 'rxjs';
import { Salary } from 'src/app/_models/salary';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DisplayService } from 'src/app/_services/display.service';
import { take, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-salary-edit',
  templateUrl: './salary-edit.component.html',
  styleUrls: ['./salary-edit.component.css']
})
export class SalaryEditComponent implements OnInit {

  isSaving: boolean;
  isLoading: boolean = true;
  private _alive: boolean = true;

  salary$: Observable<Salary>;
  salary: Salary;

  salaryForm: FormGroup;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _salaryService: SalaryService,
    private _displayService: DisplayService
  ) {
    const salaryId = this._route.snapshot.params.id;
    this.salary$ = this._salaryService.getSalary(salaryId);
   }

  ngOnInit() {
    this.createForm();

    this.salary$.pipe(
      take(1)
    ).subscribe((salary: Salary) => {
      console.log(salary);
      this.isLoading = false;
      this.salary = salary;
      this.patchform(salary);
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

  patchform(salary: Salary) {
    this.salaryForm.patchValue({
      'player_id': salary.player_id,
      'season_2020': salary.season_2020,
      'season_2021': salary.season_2021,
      'season_2022': salary.season_2022,
      'season_2023': salary.season_2023,
      'season_2024': salary.season_2024,
      'season_2025': salary.season_2025,
      'season_2026': salary.season_2026,
      'season_2027': salary.season_2027,
      'season_2028': salary.season_2028,
      'season_2029': salary.season_2029,
      'season_2030': salary.season_2030,
      'season_2031': salary.season_2031,
      'season_2032': salary.season_2032,
      'season_2033': salary.season_2033,
      'season_2034': salary.season_2034,
      'season_2035': salary.season_2035,
      'season_2036': salary.season_2036,
      'season_2037': salary.season_2037,
      'season_2038': salary.season_2038,
      'season_2039': salary.season_2039,
      'season_2040': salary.season_2040,
    })
    
  }

  onSave() {

    const salaryData = {
      ...this.salaryForm.value,
      id: this.salary.id
    }

    this._salaryService.updateSalary(salaryData).pipe(
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
