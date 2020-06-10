import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { TradesService } from 'src/app/trades/trades.service';
import { MainService } from 'src/app/main/main.service';
import { takeWhile } from 'rxjs/operators';
import { DisplayService } from 'src/app/_services/display.service';
import { CurrentSeasonService } from 'src/app/_services/current-season.service';
import { TransactionsService } from 'src/app/_services/transactions.service';

@Component({
  selector: 'app-transaction-buttons',
  templateUrl: './transaction-buttons.component.html',
  styleUrls: ['./transaction-buttons.component.css']
})
export class TransactionButtonsComponent implements OnInit, OnDestroy {

  private _alive:boolean = true;

  @Input() teamOneTransaction: Object;
  @Input() teamTwoTransaction: Object;
  @Input() selectedTeamOne: string;
  @Input() selectedTeamTwo: string;

  @Output() transactionSuccess = new EventEmitter<boolean>();

  currentSeason: string;
  currentSeasonType: string;

  constructor(
    private _transactionService: TransactionsService,
    private _displayService: DisplayService,
    private _currentSeasonService: CurrentSeasonService,
    ) {
    this.currentSeason = this._currentSeasonService.currentSeason;
    this.currentSeasonType = this._currentSeasonService.currentSeasonType;
   }

  ngOnInit() {
  }

  ngOnChanges() {
  }

  onTrade() {
    this._transactionService.makeTrade(this.teamOneTransaction, this.teamTwoTransaction, this.selectedTeamOne, this.selectedTeamTwo)
      .pipe(takeWhile(() => this._alive)).subscribe( (resp: any[]) => {
        this._displayService.popupTrigger('Success');
        this.transactionSuccess.emit(true);
      }, error => {
        this._displayService.popupTrigger(error);
      });
    this.reset();
  }

  onAcquire() {
    this._transactionService.acquirePlayers(this.teamTwoTransaction, this.selectedTeamOne)
      .pipe(takeWhile(() => this._alive)).subscribe( (resp: any[]) => {
        this._displayService.popupTrigger('Success');
        this.transactionSuccess.emit(true);
      }, error => {
        this._displayService.popupTrigger(error);
      });
    this.reset();
  }

  onRelease() {
    this._transactionService.releasePlayers(this.teamOneTransaction, this.selectedTeamTwo, this.selectedTeamOne)
      .pipe(takeWhile(() => this._alive)).subscribe( (resp: any[]) => {
        this._displayService.popupTrigger('Success');
        this.transactionSuccess.emit(true);
      }, error => {
        this._displayService.popupTrigger(error);
      });
    this.reset();
  }

  reset() {
    this.transactionSuccess.emit(false);
  }

  ngOnDestroy() {
    this._alive = false;
  }

}
