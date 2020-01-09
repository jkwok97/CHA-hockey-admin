import { Component, OnInit, OnDestroy } from '@angular/core';
import { MainService } from '../main/main.service';
import { takeWhile } from 'rxjs/operators';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-waivers',
  templateUrl: './waivers.component.html',
  styleUrls: ['./waivers.component.css']
})
export class WaiversComponent implements OnInit, OnDestroy {

  private _alive:boolean = true;
  isLoading: boolean = false;
  isMobile: boolean = false;

  teams = [];

  constructor(
    private _mainService: MainService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this._mainService.getWaiverTeams().pipe(takeWhile(() => this._alive)).subscribe(resp => {
      // console.log(resp);
      this.teams = resp as [];
      this.teams.sort((a, b) => a['priority_number'] - b['priority_number']);
      this.isLoading = false;
    });
  }

  findLogo(shortName) {
    if (shortName) {
      let team = this._mainService.getTeamInfo(shortName);
      return { image: team.image, name: team.name }
    } else {
      return { image: "../../assets/team_logos/Free_Agent_logo_square.jpg", name: "Free Agent"}
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.teams, event.previousIndex, event.currentIndex);
    this.teams.forEach(team => {
      let index = this.teams.findIndex(squad => squad.team_name === team.team_name) + 1;
      this._mainService.updateWaiverTeam(team.id, index).pipe(takeWhile(() => this._alive)).subscribe(resp => {
        console.log(resp);
      });
    });
  }

  ngOnDestroy() {
    this._alive = false;
  }

}
