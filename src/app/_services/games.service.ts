import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../_models/game';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(
    private _http: HttpClient
  ) { }

  getGamesForSeason(currentSeason: string): Observable<Game[]> {

    const options = {params: new HttpParams()
      .set('playing_year', currentSeason)
    };

    return this._http.get(`${environment.back_end_url}/v2/schedule/`, options).pipe(
      map(result => result['result'])
    )
  }

  updateVisTeamScore(id: number, score: number) {
    const body = {
      'vis_team_score': score
    }
    return this._http.patch(`${environment.back_end_url}/v2/schedule/visitor/${id}`, body).pipe(
      map(result => result['result'])
    );
  }

  updateHomeTeamScore(id: number, score: number) {
    const body = {
      'home_team_score': score
    }
    return this._http.patch(`${environment.back_end_url}/v2/schedule/home/${id}`, body).pipe(
      map(result => result['result'])
    );
  }

}
