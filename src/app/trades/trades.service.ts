import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TradesService {

  constructor(private _http: HttpClient) { }


  releasePlayers(transaction: Object, selectedTeam: string, originalTeam: string) {
    let newTransaction = this.setPlayersToNewTeam(transaction, selectedTeam);
    newTransaction['originalTeam'] = originalTeam;
    return this._http.put(`${environment.back_end_url}/transactions/release`, newTransaction);
  }

  acquirePlayers(transaction: Object, selectedTeam: string) {
    let newTransaction = this.setPlayersToNewTeam(transaction, selectedTeam);
    return this._http.put(`${environment.back_end_url}/transactions/acquire`, newTransaction);
  }

  makeTrade(teamOneAction: Object, teamTwoAction: Object, selectedTeamOne: string, selectedTeamTwo: string) {
    let teamOneTransaction = this.setPlayersToNewTeam(teamOneAction, selectedTeamTwo);
    let teamTwoTransaction = this.setPlayersToNewTeam(teamTwoAction, selectedTeamOne);
    let newTransaction = {
      teamOne: teamOneTransaction,
      teamTwo: teamTwoTransaction
    }
    return this._http.put(`${environment.back_end_url}/transactions/trade`, newTransaction);
  }

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
