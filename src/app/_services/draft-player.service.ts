import { Injectable } from '@angular/core';
import { DraftPlayer } from '../_models/draft-table';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DraftPlayerService {

  constructor(private _http: HttpClient) { }

  getAllDrafted(): Observable<DraftPlayer[]> {
    return this._http.get(`${environment.back_end_url}/v2/draft/`).pipe(
      map(result => result['result'])
    )
  }

  getDrafterPlayerById(id: number): Observable<DraftPlayer> {
    return this._http.get(`${environment.back_end_url}/v2/draft/${id}`).pipe(
      map(result => result['result'])
    )
  }

  addDraftedPlayer(player: DraftPlayer) {
    return this._http.post(`${environment.back_end_url}/v2/draft/add`, player).pipe(
      map(result => result['result'])
    )
  }

  updateDraftedPlayer(player: DraftPlayer) {
    return this._http.put(`${environment.back_end_url}/v2/draft/edit/${player.id}`, player).pipe(
      map(result => result['message'])
    )
  }

  deletedDraftedPlayer(id: number) {
    return this._http.delete(`${environment.back_end_url}/v2/draft/edit/${id}`).pipe(
      map(result => result['message'])
    )
  }
}
