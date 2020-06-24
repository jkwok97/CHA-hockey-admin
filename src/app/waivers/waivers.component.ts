import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { WaiversService } from '../_services/waivers.service';

@Component({
  selector: 'app-waivers',
  templateUrl: './waivers.component.html',
  styleUrls: ['./waivers.component.css']
})
export class WaiversComponent implements OnInit, OnDestroy {

  private _alive:boolean = true;
  isLoading: boolean = false;

  teams = [];

  constructor(
    private _waiversService: WaiversService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this._waiversService.getWaiverTeams().pipe(
      takeWhile(() => this._alive)
    ).subscribe(resp => {
      this.teams = resp as [];
      // this.teams.sort((a, b) => a['priority_number'] - b['priority_number']);
      this.isLoading = false;
    })
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.teams, event.previousIndex, event.currentIndex);
    this.teams.forEach(team => {
      let index = this.teams.findIndex(squad => squad.team_name === team.team_name) + 1;
      this._waiversService.updateWaiverTeam(team.id, index).pipe(takeWhile(() => this._alive)).subscribe(resp => {
        console.log(resp);
      });
    });
  }

  ngOnDestroy() {
    this._alive = false;
  }

}
