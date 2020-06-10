import { Component, OnInit, OnDestroy } from '@angular/core';
import { TransactionsService } from '../_services/transactions.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit, OnDestroy {

  private _alive: boolean = true;

  selectedTeamOne: string;
  selectedTeamTwo: string;

  teamOneTransaction: Object;
  teamTwoTransaction: Object;

  transactionSuccess: boolean;

  constructor(
    private _transactionService: TransactionsService
  ) { }

  ngOnInit() {

    this._transactionService.teamOneListener().pipe(
      takeWhile(() => this._alive)
    ).subscribe((name: string) => {
      this.selectedTeamOne = name;
    })

    this._transactionService.teamTwoListener().pipe(
      takeWhile(() => this._alive)
    ).subscribe((name: string) => {
      this.selectedTeamTwo = name;
    })
    
  }

  transactionTeamOneChange(event) {
    this.teamOneTransaction = event;
  }

  transactionTeamTwoChange(event) {
    this.teamTwoTransaction = event;
  }

  transactionSuccessChange(event) {
    this.transactionSuccess = event;
  }

  ngOnDestroy(): void {
    this._alive = false;
  }

}
