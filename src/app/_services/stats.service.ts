import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CurrentPlayer } from '../_models/player';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(
    private _http: HttpClient
  ) { }

  getPlayerStats(season: string, seasonType: string): Observable<CurrentPlayer[]> {

    const options = {params: new HttpParams()
      .set('playing_year', season)
      .set('season_type', seasonType)
    }

    return this._http.get(`${environment.back_end_url}/v2/players-stats/`, options).pipe(
      map(result => result['result'])
    )
  }

  getPlayerStatById(id: number) {
    return this._http.get(`${environment.back_end_url}/v2/players-stats/${id}`).pipe(
      map(result => result['result'])
    )
  }

  updatePlayerStats(requestBody: any) {
    return this._http.put(`${environment.back_end_url}/v2/players-stats/${requestBody.id}`, requestBody).pipe(
      map(result => result['message'])
    )
  }

  getGoalieStats(season: string, seasonType: string): Observable<CurrentPlayer[]> {

    const options = {params: new HttpParams()
      .set('playing_year', season)
      .set('season_type', seasonType)
    }

    return this._http.get(`${environment.back_end_url}/v2/goalies-stats/`, options).pipe(
      map(result => result['result'])
    )
  }

  getGoalieStatById(id: number) {
    return this._http.get(`${environment.back_end_url}/v2/goalies-stats/${id}`).pipe(
      map(result => result['result'])
    )
  }

  updateGoalieStats(requestBody: any) {
    return this._http.put(`${environment.back_end_url}/v2/goalies-stats/${requestBody.id}`, requestBody).pipe(
      map(result => result['message'])
    )
  }

}
