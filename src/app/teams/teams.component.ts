import { Component, OnInit, ViewChild } from '@angular/core';
import { TeamService } from '../_services/team.service';
import { Team } from '../_models/team';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router, ActivatedRoute } from '@angular/router';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  private _alive: boolean = true;
  isLoading: boolean = false;

  teams: Team[];

  teamsData: MatTableDataSource<any[]>;
  columns = [ 'id', 'team_logo', 'city', 'nickname', 'division', 'isactive', 'users_id', 'owner'];

  page: number = 1;
  pageSize: number = 25;
  length: number = 0;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(
    private _teamsService: TeamService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.isLoading = true;

    this.getTeams();
  }

  getTeams() {
    this._teamsService.getTeams().pipe(
      takeWhile(() => this._alive)
    ).subscribe((teams: Team[]) => {
      this.isLoading = false;
      this.teams = teams;
      this.teamsData = new MatTableDataSource<any[]>(this.teams as any[]);
      setTimeout(() => {
        this.teamsData.paginator = this.paginator;
        this.teamsData.sort = this.sort;
      }, 350);
    })
  }

  applyFilter(filterValue: string) {
    this.teamsData.filter = filterValue.trim().toLowerCase();
    if (this.teamsData.paginator) {
      this.teamsData.paginator.firstPage();
    }
  }

  onEdit(teamId: number) {
    this._router.navigate([`edit/${teamId}`], { relativeTo: this._route });
    window.scrollTo(0,0);
  }

  onAddTeam() {
    this._router.navigate([`add`], { relativeTo: this._route });
    window.scrollTo(0,0);
  }

  ngOnDestroy(): void {
    this._alive = false;
  }

}
