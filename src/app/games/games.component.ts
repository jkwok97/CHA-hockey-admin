import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MainService } from '../main/main.service';
import { takeWhile } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

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
  team: string;

  days = [];

  allSchedule: MatTableDataSource<any[]>;
  mobileAllScheduleColumnsToDisplay = [ 'game_day', 'vis_team', 'versus', 'home_team', 'result' ];
  allScheduleColumnsToDisplay = [ 'game_day', 'vis_team', 'vis_team_name', 'vis_team_score', 'versus', 'home_team', 'home_team_name', 'home_team_score' ];

  page: number = 1;
  pageSize: number = 25;
  length: number = 0;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  visTeamScore = new FormControl('');
  homeTeamScore = new FormControl('');

  constructor(
    private _mainService: MainService
  ) { 
    this.currentSeason = this._mainService.currentSeason;
  }

  ngOnInit() {
    this.isLoading = true;
    this.checkMobile();
    this.getAllSchedule();
  }

  getAllSchedule() {
    this._mainService.getAllSchedule().pipe(takeWhile(() => this._alive)).subscribe(resp => {
      // console.log(resp);
      this.days = resp as [];
      this.days.forEach(day => {
        this.visTeamScore.setValue(day.vis_team_score);
      })
      this.allSchedule = new MatTableDataSource<any[]>(this.days);
      this.length = this.days.length;
      this.isLoading = false;
      setTimeout(() => {
        this.allSchedule.paginator = this.paginator;
        this.allSchedule.sort = this.sort;
      }, 350);
    });
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

  applyFilter(filterValue: string) {
    this.allSchedule.filter = filterValue.trim().toLowerCase();
    if (this.allSchedule.paginator) {
      this.allSchedule.paginator.firstPage();
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

  updateVisTeamScore(id, value) {
    this.team = "visitor";
    this._mainService.updateGameScore(id, value, this.team).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      // console.log(resp);
      this._mainService.popupTrigger(resp);
    });
  }

  updateHomeTeamScore(id, value) {
    this.team = "home";
    this._mainService.updateGameScore(id, value, this.team).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      // console.log(resp);
      this._mainService.popupTrigger(resp);
    });
  }

  ngOnDestroy() {
    this._alive = false;
  }

}
