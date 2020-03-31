import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TradesService {

  constructor(private _http: HttpClient) { }


  releasePlayers(season: string, seasonType: string, transaction: Object) {
    console.log(season);
    console.log(seasonType);
    console.log(transaction);
  }

  acquirePlayers(season: string, seasonType: string, transaction: Object, selectedTeam: string) {
    let newTransaction = this.setFaPlayersToNewTeam(transaction, selectedTeam);
    console.log(newTransaction);
    return this._http.put(`${environment.back_end_url}/transactions/acquire`, newTransaction);
  }

  makeTrade(season: string, seasonType: string, teamOneAction: Object, teamTwoAction: Object) {
    console.log(season);
    console.log(seasonType);
    console.log(teamOneAction);
    console.log(teamTwoAction);
  }

  setFaPlayersToNewTeam(transaction: Object, selectedTeam: string) {
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
    transaction['team'] = selectedTeam;
    console.log(transaction);

    return transaction;
  }

}
