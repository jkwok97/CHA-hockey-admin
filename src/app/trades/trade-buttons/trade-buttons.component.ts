import { Component, OnInit, Input, OnChanges, OnDestroy, EventEmitter, Output } from '@angular/core';
import { TradesService } from '../trades.service';
import { MainService } from 'src/app/main/main.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-trade-buttons',
  templateUrl: './trade-buttons.component.html',
  styleUrls: ['./trade-buttons.component.css']
})
export class TradeButtonsComponent implements OnInit, OnChanges, OnDestroy {

  private _alive:boolean = true;

  @Input() teamOneTransaction: Object;
  @Input() teamTwoTransaction: Object;
  @Input() selectedTeamOne: string;
  @Input() selectedTeamTwo: string;

  @Output() transactionSuccess = new EventEmitter<boolean>();

  currentSeason: string;
  currentSeasonType: string;

  constructor(
    private _tradeService: TradesService,
    private _mainService: MainService
    ) {
    this.currentSeason = this._mainService.currentSeason;
    this.currentSeasonType = this._mainService.currentSeasonType;
   }

  ngOnInit() {
  }

  ngOnChanges() {
    console.log(this.teamOneTransaction);
    console.log(this.teamTwoTransaction);
    console.log(this.selectedTeamOne);
    console.log(this.selectedTeamTwo);
  }

  onTrade() {
    console.log(this.teamOneTransaction);
    console.log(this.teamTwoTransaction);
  }

  onAcquire() {
    this._tradeService.acquirePlayers(this.currentSeason, this.currentSeasonType, this.teamTwoTransaction, this.selectedTeamOne)
      .pipe(takeWhile(() => this._alive)).subscribe( (resp: any[]) => {
        console.log(resp);
        this._mainService.popupTrigger('Success');
        this.transactionSuccess.emit(true);
      }, error => {
        this._mainService.popupTrigger(error);
      });
  }

  onRelease() {
    console.log(this.teamOneTransaction);
    console.log(this.teamTwoTransaction);
  }

  ngOnDestroy() {
    this._alive = false;
  }

}
