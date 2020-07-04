import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Team } from '../_models/team';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  teams: Team[]

  private _subjectTeamOne = new Subject<string>();
  private _subjectTeamTwo = new Subject<string>();
  private _subjectTeamSelected = new Subject<string>();

  constructor(
    private _http: HttpClient,
  ) { }

  setTeams(teams: Team[]) {
    this.teams = teams;
  }

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

  releasePlayers(transaction: Object, selectedTeam: string, originalTeam: string) {
    const newTransaction = this.setPlayersToNewTeam(transaction, selectedTeam);
    newTransaction['originalTeam'] = originalTeam;
    return this._http.put(`${environment.back_end_url}/v2/transactions/release`, newTransaction);
  }

  acquirePlayers(transaction: Object, selectedTeam: string) {
    const newTransaction = this.setPlayersToNewTeam(transaction, selectedTeam);
    return this._http.put(`${environment.back_end_url}/v2/transactions/acquire`, newTransaction);
  }

  makeTrade(teamOneAction: Object, teamTwoAction: Object, selectedTeamOne: string, selectedTeamTwo: string) {
    const teamOneTransaction = this.setPlayersToNewTeam(teamOneAction, selectedTeamTwo);
    const teamTwoTransaction = this.setPlayersToNewTeam(teamTwoAction, selectedTeamOne);
    const newTransaction = {
      teamOne: teamOneTransaction,
      teamTwo: teamTwoTransaction
    }
    return this._http.put(`${environment.back_end_url}/v2/transactions/trade`, newTransaction);
  }

  addTransaction(body: any) {
    return this._http.post(`${environment.back_end_url}/v2/transactions/add`, body).pipe(
      map(result => result['result'])
    );
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
    transaction['newTeamId'] = this.getIdForNewTeam(selectedTeam);
    return transaction;
  }

  getIdForNewTeam(shortname: string) {
    return this.teams.find((team: Team) => team.shortname === shortname).id
  }

  getAllTransactions() {
    return this._http.get(`${environment.back_end_url}/v2/transactions`).pipe(
      map(result => result['result'])
    );
  }

  getTransactionById(id: number) {
    return this._http.get(`${environment.back_end_url}/v2/transactions/edit/${id}`).pipe(
      map(result => result['result'])
    );
  }

  updateTransaction(id: number, body) {
    return this._http.put(`${environment.back_end_url}/v2/transactions/edit/${id}`, body).pipe(
      map(result => result['result'])
    );
  }

  deleteTransaction(id: number) {
    return this._http.delete(`${environment.back_end_url}/v2/transactions/edit/${id}`).pipe(
      map(result => result['result'])
    );
  }

}
