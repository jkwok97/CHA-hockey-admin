import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  private _subjectTeamOne = new Subject<string>();
  private _subjectTeamTwo = new Subject<string>();
  private _subjectTeamSelected = new Subject<string>();

  constructor(
    private _http: HttpClient
  ) { }

  teamOneListener(): Observable<string> {
    return this._subjectTeamOne.asObservable();
  }

  teamOneTrigger(shortname: string) {
    this._subjectTeamOne.next(shortname);
  }

  teamTwoListener(): Observable<string> {
    return this._subjectTeamTwo.asObservable();
  }

  teamTwoTrigger(shortname: string) {
    this._subjectTeamTwo.next(shortname);
  }

  teamSelectedTrigger(shortname: string) {
    this._subjectTeamSelected.next(shortname);
  }

  teamSelectedListener(): Observable<string> {
    return this._subjectTeamSelected.asObservable();
  }

  // releasePlayers(transaction: Object, selectedTeam: string, originalTeam: string) {
  //   const newTransaction = this.setPlayersToNewTeam(transaction, selectedTeam);
  //   newTransaction['originalTeam'] = originalTeam;
  //   return this._http.put(`${environment.back_end_url}/transactions/release`, newTransaction);
  // }

  // acquirePlayers(transaction: Object, selectedTeam: string) {
  //   const newTransaction = this.setPlayersToNewTeam(transaction, selectedTeam);
  //   return this._http.put(`${environment.back_end_url}/transactions/acquire`, newTransaction);
  // }

  // makeTrade(teamOneAction: Object, teamTwoAction: Object, selectedTeamOne: string, selectedTeamTwo: string) {
  //   const teamOneTransaction = this.setPlayersToNewTeam(teamOneAction, selectedTeamTwo);
  //   const teamTwoTransaction = this.setPlayersToNewTeam(teamTwoAction, selectedTeamOne);
  //   const newTransaction = {
  //     teamOne: teamOneTransaction,
  //     teamTwo: teamTwoTransaction
  //   }
  //   console.log(newTransaction);
  //   return this._http.put(`${environment.back_end_url}/transactions/trade`, newTransaction);
  // }

  setPlayersToNewTeam(transaction: Object, selectedTeam: string) {
    if (transaction['players'] && transaction['players'].length > 0) {
      transaction['players'].forEach(player => {
        player.team_name = selectedTeam;
      });
    }
    if (transaction['goalies'] && transaction['goalies'].length > 0) {
      transaction['goalies'].forEach(player => {
        player.team_name = selectedTeam;
      });
    }
    transaction['newTeam'] = selectedTeam;
    return transaction;
  }

}
