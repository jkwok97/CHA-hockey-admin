import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MainService } from 'src/app/main/main.service';

@Component({
  selector: 'app-trade-select',
  templateUrl: './trade-select.component.html',
  styleUrls: ['./trade-select.component.css']
})
export class TradeSelectComponent implements OnInit {

  selectedTeamOne: string;
  selectedTeamTwo: string;

  @Output() teamOneSelected = new EventEmitter<string>();
  @Output() teamTwoSelected = new EventEmitter<string>();

  teams;

  constructor(private _mainService: MainService) { 
    this.teams = this._mainService.currentLeague.teams;
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
