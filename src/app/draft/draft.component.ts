import { Component, OnInit, OnDestroy } from '@angular/core';
import { MainService } from '../main/main.service';
import { takeWhile } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-draft',
  templateUrl: './draft.component.html',
  styleUrls: ['./draft.component.css']
})
export class DraftComponent implements OnInit, OnDestroy {

  private _alive:boolean = true;
  isLoading: boolean = false;
  isMobile: boolean = false;

  teams = [];
  teamNames = [];
  drafts: any;
  
  originalTeamRound: string;
  prevTeam: string;
  originalTeamPickId: number;

  draft: MatTableDataSource<any[]>;
  draftColumnsToDisplay = ['team_logo', 'team_name', 'round_one', 'round_two', 'round_three', 'round_four', 'round_five'];
  draftMobileColumnsToDisplay = ['team_logo', 'round_one', 'round_two', 'round_three', 'round_four', 'round_five'];

  constructor(
    private _mainService: MainService,
  ) { }

  ngOnInit() {
    this.checkMobile();
    this.isLoading = true;
    this.setTable();
  }

  findLogo(shortName) {
    if (shortName) {
      let team = this._mainService.getTeamInfo(shortName);
      return { image: team.image, name: team.name }
    } else {
      return { image: "../../assets/team_logos/Free_Agent_logo_square.jpg", name: "Free Agent"}
    }
  }

  setPrevTeam(id, round, team) {
    this.originalTeamPickId = id;
    this.originalTeamRound = round;
    this.prevTeam = team;
  }

  updateDraft(teamName) {
    this._mainService.tradePick(teamName, this.originalTeamPickId, this.originalTeamRound, this.prevTeam).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      this._mainService.popupTrigger(resp);
      this.setTable();
    });
  }

  setTable() {
    this.teams = [];
    this._mainService.getDraftTable().pipe(takeWhile(() => this._alive)).subscribe(resp => {
      let response = resp as any;
      response.forEach(element => {
        this.teams.push(element)
      });
      this.teams.sort((a,b) => a.id - b.id);
      response.sort((a,b) => a.id - b.id);
      this.draft = new MatTableDataSource<any[]>(response);
      this.isLoading = false;
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

  ngOnDestroy() {
    this._alive = false;
  }

}
