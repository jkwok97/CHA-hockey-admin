import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { takeWhile } from 'rxjs/operators';
import { DisplayService } from '../_services/display.service';
import { GamesService } from '../_services/games.service';
import { CurrentSeasonService } from '../_services/current-season.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit, OnDestroy {

  private _alive:boolean = true;
  isMobile: boolean = false;
  isLoading: boolean = false;

  currentSeason: string;

  games: MatTableDataSource<any[]>;
  mobileColumns = [ 'game_day', 'vis_team', 'versus', 'home_team', 'result' ];
  columns = [ 
    'game_day', 'vis_team', 'vis_team_name', 'vis_team_score', 'versus', 'home_team', 
    'home_team_name', 'home_team_score' 
  ];

  page: number = 1;
  pageSize: number = 25;
  length: number = 0;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(
    private _displayService: DisplayService,
    private _gamesService: GamesService,
    private _currentSeasonService: CurrentSeasonService
  ) { 
    this.currentSeason = '2019-20';
    // this.currentSeason = this._currentSeasonService.currentSeason;
  }

  ngOnInit() {
    this.isLoading = true;
    this.isMobile = this._displayService.isMobile;
    this.getGames(this.currentSeason);
  }

  getGames(season: string) {
    this._gamesService.getGamesForSeason(season).pipe(
      takeWhile(() => this._alive)
    ).subscribe((games) => {
      this.games = new MatTableDataSource<any[]>(games as []);
      this.isLoading = false;
    })
  }

  applyFilter(filterValue: string) {
    this.games.filter = filterValue.trim().toLowerCase();
    if (this.games.paginator) {
      this.games.paginator.firstPage();
    }
  }

  ngOnDestroy() {
    this._alive = false;
  }

}
