import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trades',
  templateUrl: './trades.component.html',
  styleUrls: ['./trades.component.css']
})
export class TradesComponent implements OnInit {

  selectedTeamOne: string;
  selectedTeamTwo: string;

  teamOneTransaction: Object;
  teamTwoTransaction: Object;

  transactionSuccess: boolean;

  constructor() { }

  ngOnInit() {
  }

  selectTeamOneChange(event) {
    this.selectedTeamOne = event;
  }

  selectTeamTwoChange(event) {
    this.selectedTeamTwo = event;
  }

  transactionTeamOneChange(event) {
    this.teamOneTransaction = event;
  }

  transactionTeamTwoChange(event) {
    this.teamTwoTransaction = event;
  }

  transactionSuccessChange(event) {
    console.log(event);
    this.transactionSuccess = event;
  }



}
