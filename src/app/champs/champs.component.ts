import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ChampService } from './champ.service';
import { takeWhile } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-champs',
  templateUrl: './champs.component.html',
  styleUrls: ['./champs.component.css']
})
export class ChampsComponent implements OnInit, OnDestroy {

  private _alive:boolean = true;
  isLoading: boolean = false;
  isMobile: boolean = false;
  editMode: boolean = false;

  championsList: any[] = [];

  champs: MatTableDataSource<any[]>;
  champColumnsToDisplay = ['year_won', 'team_name', 'owner_name', 'player_name', 'award_type'];
  champMobileColumnsToDisplay = ['year_won', 'owner_name', 'player_name', 'award_type'];

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(
    private _champService: ChampService
  ) { }

  ngOnInit() {
    this.checkMobile();
    
    this.isLoading = true;
    this.getData();
    this._champService.showEditChampPlayerListener().pipe(takeWhile(() => this._alive)).subscribe(resp => {
      resp == true ? this.editMode = resp : this.editMode = resp;
      if (this.editMode == false) {
        this.isLoading = true;
        this.getData();
      }
    });
    
  }

  getData() {
    this.championsList = [];
    this.getChampions();
    this.getLeadingScorers();
    this.getAwardDefense();
    this.getAwardRookie();
    this.getAwardGoalie();
    this.getAwardSeason();
    this.getAwardGm();
    setTimeout(() => {
      // console.log(this.championsList);
      this.champs = new MatTableDataSource<any[]>(this.championsList);
      this.isLoading = false;
      setTimeout(() => {
        this.champs.paginator = this.paginator;
        this.champs.sort = this.sort;
      }, 350);
    }, 2000)
  }

  getChampions() {
    this._champService.getChampions("champ").pipe(takeWhile(() => this._alive)).subscribe(resp => {
      // console.log(resp);
      let result = resp as [];
      result.forEach(element => { this.championsList.push(element); });
    });
  }

  getLeadingScorers() {
    this._champService.getChampions("scorer").pipe(takeWhile(() => this._alive)).subscribe(resp => {
      // console.log(resp);
      let result = resp as [];
      result.forEach(element => { this.championsList.push(element); });
    });
  }

  getAwardDefense() {
   this._champService.getChampions("defense").pipe(takeWhile(() => this._alive)).subscribe(resp => {
    //  console.log(resp);
     let result = resp as [];
      result.forEach(element => { this.championsList.push(element); });
   });
  }

  getAwardRookie() {
    this._champService.getChampions("rookie").pipe(takeWhile(() => this._alive)).subscribe(resp => {
      // console.log(resp);
      let result = resp as [];
      result.forEach(element => { this.championsList.push(element); });
    });
   }

   getAwardGoalie() {
    this._champService.getChampions("goalie").pipe(takeWhile(() => this._alive)).subscribe(resp => {
      // console.log(resp);
      let result = resp as [];
      result.forEach(element => { this.championsList.push(element); });
    });
   }

   getAwardGm() {
    this._champService.getChampions("gm").pipe(takeWhile(() => this._alive)).subscribe(resp => {
      // console.log(resp);
      let result = resp as [];
      result.forEach(element => { this.championsList.push(element); });
    });
   }

   getAwardSeason() {
    this._champService.getChampions("season").pipe(takeWhile(() => this._alive)).subscribe(resp => {
      // console.log(resp);
      let result = resp as [];
      result.forEach(element => { this.championsList.push(element); });
    });
   }

   editChamp(champ) {
    //  console.log(champ);
     this._champService.setChampion(champ);
     this.editMode = true;
     this._champService.showAddChampPlayerTrigger("Edit");
   }

   addPlayer() {
     this.editMode = true;
     this._champService.setChampion(null);
     this._champService.showAddChampPlayerTrigger("Add");
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

  ngOnDestroy() {
    this._alive = false;
  }

}
