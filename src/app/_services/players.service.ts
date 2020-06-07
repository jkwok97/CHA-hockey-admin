import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Player } from '../_models/player';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor(
    private _http: HttpClient
  ) { }

  getAllPlayers(): Observable<Player[]> {
    return this._http.get(`${environment.back_end_url}/v2/players/`).pipe(
      map(result => result['result'])
    )
  }

  getAllPlayersByActive(bool: string): Observable<Player[]> {
  
    const options = {params: new HttpParams()
      .set('isactive', bool)
    }

    return this._http.get(`${environment.back_end_url}/v2/players/active`, options).pipe(
      map(result => result['result'])
    )
  }

  getPlayer(id: number): Observable<Player> {
    return this._http.get(`${environment.back_end_url}/v2/players/edit/${id}`).pipe(
      map(result => result['result'][0])
    )
  }

  addPlayer(playerInfo: Player) {
    return this._http.post(`${environment.back_end_url}/v2/players/add/`, playerInfo).pipe(
      map(result => result['message'])
    )
  }

  updatePlayer(player: Player) {
    return this._http.put(`${environment.back_end_url}/v2/players/edit/${player.id}`, player).pipe(
      map(result => result['message'])
    )
  }

  deletePlayer(id: number) {
    return this._http.delete(`${environment.back_end_url}/v2/players/delete/${id}`).pipe(
      map(result => result['message'])
    )
  }
}
