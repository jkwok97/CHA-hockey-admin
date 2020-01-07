import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MainService } from '../main/main.service';
import { takeWhile } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-goalies',
  templateUrl: './goalies.component.html',
  styleUrls: ['./goalies.component.css']
})
export class GoaliesComponent implements OnInit, OnDestroy {

  private _alive:boolean = true;
  isLoading: boolean = false;
  inAllPlayersStats: boolean = false;
  isMobile: boolean = false;

  stats = [];

  short_team_name: string = '';
  currentSeason: string;
  currentSeasonType: string;

  players: MatTableDataSource<any[]>;
  playersColumnsToDisplay = ['team_logo', 'team_name', 'player_name'];
  playersMobileColumnsToDisplay = ['team_logo', 'player_name'];

  page: number = 1;
  pageSize: number = 10;
  length: number = 0;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(
    private _mainService: MainService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.checkMobile();
    this.isLoading = true;
    this.currentSeason = this._mainService.currentSeason;
    this.currentSeasonType = this._mainService.currentSeasonType;
    this.inAllPlayersStats = true;
    this._mainService.getGoalieStatsByYearByType(this.currentSeason,this.currentSeasonType).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      // console.log(resp);
      let stats = resp as any;
      stats.forEach(player => { this.stats.push(player); });
      this.players = new MatTableDataSource<any[]>(this.stats);
      this.pageSize = 25;
      this.length = this.stats.length;
      this.isLoading = false;
      setTimeout(() => {
        this.players.paginator = this.paginator;
        this.players.sort = this.sort;
      }, 350);
    });
  }

  applyFilter(filterValue: string) {
    this.players.filter = filterValue.trim().toLowerCase();
    if (this.players.paginator) {
      this.players.paginator.firstPage();
    }
  }

  checkMobile() {
    if ( navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i) ) {
          this.isMobile = true;
        } else {
          this.isMobile = false;
        }
  }

  findLogo(shortName) {
    if (shortName) {
      let team = this._mainService.getTeamInfo(shortName);
      return { image: team.image, name: team.name }
    } else {
      return { image: "../../assets/team_logos/Free_Agent_logo_square.jpg", name: "Free Agent"}
    }
  }

  openPlayer(name, team, position, hits) {
    this._router.navigate([`/player/${name}/edit`]);
    this._mainService.setPlayerPosition(position);
    this._mainService.setPlayerHits(hits);
    window.scrollTo(0,0);
  }

  ngOnDestroy() {
    this._alive = false;
  }

}