import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Salary } from '../_models/salary';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SalaryService } from '../_services/salary.service';
import { Router, ActivatedRoute } from '@angular/router';
import { takeWhile } from 'rxjs/operators';
import { DisplayService } from '../_services/display.service';

@Component({
  selector: 'app-salaries',
  templateUrl: './salaries.component.html',
  styleUrls: ['./salaries.component.css']
})
export class SalariesComponent implements OnInit, OnDestroy {

  private _alive: boolean = true;
  isLoading: boolean = false;

  salaries: Salary[];

  showType: string = 'true';

  salariesData: MatTableDataSource<any[]>;
  columns = [ 'id', 'player_id', 'firstname', 'lastname', 'isactive',
    'season_2020', 'season_2021', 'season_2022', 'season_2023', 'season_2024',
    'season_2025', 'season_2026', 'season_2027', 'season_2028', 'season_2029'
  ];

  page: number = 1;
  pageSize: number = 25;
  length: number = 0;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(
    private _salariesService: SalaryService,
    private _displayService: DisplayService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.isLoading = true;

    this.getSalaries(this.showType);
  }

  changeActive(type: string) {
    this.showType = type;
    this.isLoading = true;
    this.getSalaries(this.showType);
  }

  getSalaries(type: string) {
    this._salariesService.getAllActiveSalaries(type).pipe(
      takeWhile(() => this._alive)
    ).subscribe((salaries: Salary[]) => {
      this.isLoading = false;
      this.salaries = salaries;
      this.salariesData = new MatTableDataSource<any[]>(this.salaries as any[]);
      setTimeout(() => {
        this.salariesData.paginator = this.paginator;
        this.salariesData.sort = this.sort;
      }, 350);
    })
  }

  applyFilter(filterValue: string) {
    this.salariesData.filter = filterValue.trim().toLowerCase();
    if (this.salariesData.paginator) {
      this.salariesData.paginator.firstPage();
    }
  }

  onEdit(salaryId: number) {

    if (salaryId) {
    this._router.navigate([`edit/${salaryId}`], { relativeTo: this._route });
    window.scrollTo(0,0);
    } else {
      this._displayService.popupTrigger('Edit Salary Not Available');
    }
    
  }

  ngOnDestroy(): void {
    this._alive = false;
  }

}
