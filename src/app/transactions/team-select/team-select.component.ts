import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TeamService } from 'src/app/_services/team.service';
import { Team } from '../../_models/team';

@Component({
  selector: 'app-team-select',
  templateUrl: './team-select.component.html',
  styleUrls: ['./team-select.component.css']
})
export class TeamSelectComponent implements OnInit {

  selectedTeamOne: string;
  selectedTeamTwo: string;

  teams: Team[];

  @Output() teamOneSelected = new EventEmitter<string>();
  @Output() teamTwoSelected = new EventEmitter<string>();

  constructor(
    private _teamService: TeamService
  ) { 
    // this.teams = this._teamService.currentLeague.teams;
  }

  ngOnInit() {
  }

  selectTeamOne(shortName: string) {
    this.teamOneSelected.emit(shortName);
  }

  selectTeamTwo(shortName: string) {
    this.teamTwoSelected.emit(shortName);
  }

}
