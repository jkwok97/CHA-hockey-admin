import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MainService } from 'src/app/main/main.service';
import { Router } from '@angular/router';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-goalie-salary',
  templateUrl: './goalie-salary.component.html',
  styleUrls: ['./goalie-salary.component.css']
})
export class GoalieSalaryComponent implements OnInit, OnDestroy {
  
  private _alive:boolean = true;
  isLoading: boolean = false;

  salaries: any[];
  playerSalaries = [];

  type: string;
  currentSeason: string;
  seasonType: string;

  page: number = 1;
  pageSize: number = 25;
  length: number = 0;

  allSalaries: MatTableDataSource<any[]>;
  allSalariesColumnsToDisplay = ['player_name', 'cha_id', 'current_season_salary', 'year_two', 'year_three', 'year_four', 'year_five' ];

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  
  constructor(
    private _mainService: MainService,
    private _router: Router
  ) {
    this.currentSeason = this._mainService.currentSeason;
    this.seasonType = this._mainService.currentSeasonType;
   }

  ngOnInit() {
    this.getSalaries("goalie");
  }

  getSalaries(position) {
    this.isLoading = true;
    this._mainService.getAllSalaries(position).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      this.salaries = resp as [];
      this.allSalaries = new MatTableDataSource<any[]>(this.salaries);
      this.length = this.salaries.length;
      this.isLoading = false;
      setTimeout(() => {
        this.allSalaries.paginator = this.paginator;
        this.allSalaries.sort = this.sort;
      }, 350);
    });
  }

  applyFilter(filterValue: string) {
    this.allSalaries.filter = filterValue.trim().toLowerCase();
    if (this.allSalaries.paginator) {
      this.allSalaries.paginator.firstPage();
    }
  }

  addPlayer() {
    this._router.navigate([`/salary/add/goalie`]);
    window.scrollTo(0,0);
  }

  openPlayer(player, type) {
    this._router.navigate([`/salary/edit/${type}/${player.player_id}/${player.player_name}`]);
    window.scrollTo(0,0);
  }

  findLogo(shortName) {
    if (shortName) {
      let team = this._mainService.getTeamInfo(shortName);
      return { image: team.image, name: team.name }
    } else {
      return { image: "../../assets/team_logos/Free_Agent_logo_square.jpg", name: "Free Agent"}
    }
  }

  ngOnDestroy() {
    this._alive = false;
  }

}
