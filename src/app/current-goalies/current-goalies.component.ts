import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { CurrentPlayer } from '../_models/player';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router, ActivatedRoute } from '@angular/router';
import { takeWhile } from 'rxjs/operators';
import { StatsService } from '../_services/stats.service';
import { CurrentSeasonService } from '../_services/current-season.service';

@Component({
  selector: 'app-current-goalies',
  templateUrl: './current-goalies.component.html',
  styleUrls: ['./current-goalies.component.css']
})
export class CurrentGoaliesComponent implements OnInit {

  private _alive: boolean = true;
  isLoading: boolean = false;

  currentPlayers$: Observable<CurrentPlayer[]>;
  currentPlayers: CurrentPlayer[];

  currentPlayerData: MatTableDataSource<any[]>;

  columns = [ 'id', 'player_id', 'player_status', 'firstname', 'lastname', 'team_name', 'playing_year', 'season_type'];

  page: number = 1;
  pageSize: number = 25;
  length: number = 0;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(
    private _statsService: StatsService,
    private _currentSeasonService: CurrentSeasonService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.currentPlayers$ = 
      this._statsService.getGoalieStats(this._currentSeasonService.currentSeason, this._currentSeasonService.currentSeasonType);
   }

  ngOnInit() {
    this.isLoading = true;

    this.currentPlayers$.pipe(
      takeWhile(() => this._alive)
    ).subscribe((currentPlayers: CurrentPlayer[]) => {
      this.isLoading = false;
      this.currentPlayers = currentPlayers;
      this.currentPlayerData = new MatTableDataSource<any[]>(this.currentPlayers as any[]);
      setTimeout(() => {
        this.currentPlayerData.paginator = this.paginator;
        this.currentPlayerData.sort = this.sort;
      }, 350);
    })
  }

  applyFilter(filterValue: string) {
    this.currentPlayerData.filter = filterValue.trim().toLowerCase();
    if (this.currentPlayerData.paginator) {
      this.currentPlayerData.paginator.firstPage();
    }
  }

  onEdit(statId: number) {
    this._router.navigate([`edit/${statId}`], { relativeTo: this._route });
    window.scrollTo(0,0);
  }

  ngOnDestroy(): void {
    this._alive = false;
  }

}
