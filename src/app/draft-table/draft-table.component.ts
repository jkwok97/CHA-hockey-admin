import { Component, OnInit, ViewChild } from '@angular/core';
import { DraftTable } from '../_models/draft-table';
import { DraftService } from '../_services/draft.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router, ActivatedRoute } from '@angular/router';
import { takeWhile, take, map, exhaustMap } from 'rxjs/operators';
import { TeamService } from '../_services/team.service';
import { Observable } from 'rxjs';
import { Team } from '../_models/team';

@Component({
  selector: 'app-draft-table',
  templateUrl: './draft-table.component.html',
  styleUrls: ['./draft-table.component.css']
})
export class DraftTableComponent implements OnInit {

  private _alive: boolean = true;
  isLoading: boolean = false;

  table: DraftTable[];
  teams$: Observable<Team[]>;
  teams: Team[];

  currentSeason: string = '2020';

  draftTableData: MatTableDataSource<any[]>;
  columns = [ 'id', 'draft_year', 'logo', 'team', 'round_one', 'round_two', 'round_three', 'round_four', 'round_five'];

  page: number = 1;
  pageSize: number = 20;
  length: number = 0;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(
    private _draftService: DraftService,
    private _teamsService: TeamService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { 
    this.teams$ = this._teamsService.getTeamsByActive('true');
  }

  ngOnInit() {
    this.isLoading = true;

    this.getDraftTableByYear(this.currentSeason);

    this.teams$.pipe(
      takeWhile(() => this._alive),
    ).subscribe((teams: Team[]) => {
      this.teams = teams;
    })
  }

  changeActive(type: string) {
    this.currentSeason = type;
    this.isLoading = true;
    this.getDraftTableByYear(this.currentSeason);
  }

  getDraftTableByYear(type: string) {
    this._draftService.getDraftTableByYear(type).pipe(
      takeWhile(() => this._alive)
    ).subscribe((table: DraftTable[]) => {
      this.isLoading = false;
      this.table = table;
      this.draftTableData = new MatTableDataSource<any[]>(this.table as any[]);
      setTimeout(() => {
        this.draftTableData.paginator = this.paginator;
        this.draftTableData.sort = this.sort;
      }, 350);
    })
  }

  getTeamLogo(id: number) {
    if (this.teams) {
      return this.teams.find((team: Team) => team.id === id).teamlogo;
    }
  }

  onEdit(draftId: number) {
    this._router.navigate([`edit/${draftId}`], { relativeTo: this._route });
    window.scrollTo(0,0);
  }

  onAddPlayer() {
    this._router.navigate([`add`], { relativeTo: this._route });
    window.scrollTo(0,0);
  }

  ngOnDestroy(): void {
    this._alive = false;
  }

}
