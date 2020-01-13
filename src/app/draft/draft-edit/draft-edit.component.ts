import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { takeWhile } from 'rxjs/operators';
import { DraftService } from '../draft.service';
import { MainService } from 'src/app/main/main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-draft-edit',
  templateUrl: './draft-edit.component.html',
  styleUrls: ['./draft-edit.component.css']
})
export class DraftEditComponent implements OnInit, OnDestroy {

  private _alive:boolean = true;
  isLoading: boolean = false;
  isMobile: boolean = false;
  showEditBox: boolean = false;

  drafts: any[];

  short_team_name: string = '';

  players: MatTableDataSource<any[]>;
  playersColumnsToDisplay = ['draft_year', 'round_num','number_num', 'player_name', 'player_pos', 'team'];
  playersMobileColumnsToDisplay = ['draft_year','number_num', 'player_name', 'team_logo'];

  page: number = 1;
  pageSize: number = 20;
  length: number = 0;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(
    private _draftsService: DraftService,
    private _mainService: MainService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.checkMobile();
    this.isLoading = true;
    this.populateDraft();
    this._draftsService.showEditDraftPlayerListener().pipe(takeWhile(() => this._alive)).subscribe(resp => {
      this.showEditBox = resp;
      if (resp == false) {
        this.isLoading = true;
        this.populateDraft();
      }
    });
  }

  populateDraft() {
    this._draftsService.getDrafts().pipe(takeWhile(() => this._alive)).subscribe(resp => {
      // console.log(resp);
      this.drafts = resp as [];
      this.drafts.sort((a, b) => a['number_num'] - b['number_num']);
      this.players = new MatTableDataSource<any[]>(this.drafts);
      this.length = this.drafts.length;
      this.isLoading = false;
      setTimeout(() => {
        this.players.paginator = this.paginator;
        this.players.sort = this.sort;
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

  findLogo(shortName) {
    if (shortName) {
      let team = this._mainService.getTeamInfo(shortName);
      return { image: team.image, name: team.name }
    } else {
      return { image: "../../assets/team_logos/Free_Agent_logo_square.jpg", name: "Free Agent"}
    }
  }

  applyFilter(filterValue: string) {
    this.players.filter = filterValue.trim().toLowerCase();
    if (this.players.paginator) {
      this.players.paginator.firstPage();
    }
  }

  editDraftPlayer(id) {
    this._draftsService.showEditDraftPlayerTrigger(true);
    this._draftsService.setPlayer(id);
  }

  ngOnDestroy() {
    this._alive = false;
  }

}
