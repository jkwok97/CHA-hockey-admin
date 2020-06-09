import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from '../_models/team';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(
    private _http: HttpClient
    ) { }

  getTeams(): Observable<Team[]> {
    return this._http.get(`${environment.back_end_url}/v2/teams`).pipe(
      map(result => result['result'])
    )
  }

  getTeamsByActive(bool: string): Observable<Team[]> {
  
    const options = {params: new HttpParams()
      .set('isactive', bool)
    }

    return this._http.get(`${environment.back_end_url}/v2/teams/active`, options).pipe(
      map(result => result['result'])
    )
  }

  getTeamsByUser(id: number): Observable<Team[]> {

    return this._http.get(`${environment.back_end_url}/v2/teams/user/${id}`).pipe(
      map(result => result['result'])
    )
  }

  getTeamById(id: number): Observable<Team> {
    return this._http.get(`${environment.back_end_url}/v2/teams/${id}`).pipe(
      map(result => result['result'][0])
    )
  }

  getTeamLogo(id: number): Observable<string> {
    return this._http.get(`${environment.back_end_url}/v2/teams/${id}/logo`).pipe(
      map(result => result['result'][0])
    )
  }

  addTeam(teamInfo: Team) {
    return this._http.post(`${environment.back_end_url}/v2/teams`, teamInfo).pipe(
      map(result => result['message'])
    )
  }

  updateTeam(team: Team) {
    return this._http.put(`${environment.back_end_url}/v2/teams/${team.id}`, team).pipe(
      map(result => result['message'])
    )
  }

  deleteTeam(id: number) {
    return this._http.delete(`${environment.back_end_url}/v2/teams/${id}`).pipe(
      map(result => result['message'])
    )
  }
}
