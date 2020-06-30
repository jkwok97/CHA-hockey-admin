import { Component, OnInit, AfterViewInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { take } from 'rxjs/operators';
import { DisplayService } from 'src/app/_services/display.service';
import { GamesService } from 'src/app/_services/games.service';

@Component({
  selector: 'app-all-games-table',
  templateUrl: './all-games-table.component.html',
  styleUrls: ['./all-games-table.component.css']
})
export class AllGamesTableComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() games;
  @Input() columns;

  private _alive: boolean = true;

  page: number = 1;
  pageSize: number = 25;
  length: number = 0;

  visTeamScore = new FormControl('');
  homeTeamScore = new FormControl('');

  @ViewChild(MatSort, {static: false}) playerSort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(
    private _displayService: DisplayService,
    private _gamesService: GamesService
  ) { }

  ngOnInit() {
    this.length = this.games.length;
  }

  ngAfterViewInit() {
    this.games.sort = this.playerSort;
    this.games.paginator = this.paginator;
  }

  updateVisTeamScore(id, value) {
    this._gamesService.updateVisTeamScore(id, value).pipe(
      take(1)
    ).subscribe(resp => {
      this._displayService.popupTrigger(resp);
    });
  }

  updateHomeTeamScore(id, value) {
    this._gamesService.updateHomeTeamScore(id, value).pipe(
      take(1)
    ).subscribe(resp => {
      this._displayService.popupTrigger(resp);
    });
  }

  ngOnDestroy(): void {
    this._alive = false;
  }

}
