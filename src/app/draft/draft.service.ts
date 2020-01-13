import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DraftService {

  playerId: number;

  private _subjectShowEditDraftPlayer = new Subject<any>();

  constructor(
    private _http: HttpClient
  ) { }

  getDrafts() {
    return this._http.get(`${environment.back_end_url}/drafts/`);
  }

  setPlayer(id) {
    this.playerId = id;
  }

  getDraftPlayer(id) {
    return this._http.get(`${environment.back_end_url}/drafts/${id}`);
  }

  updateDraftPlayer(player) {
    // console.log(player);
    let body = player;
    return this._http.put(`${environment.back_end_url}/drafts/${player.id}`, body);
  }

  showEditDraftPlayerTrigger(bool) {
    console.log(bool);
    this._subjectShowEditDraftPlayer.next(bool);
  }

  deletePlayer(id) {
    return this._http.delete(`${environment.back_end_url}/drafts/${id}`);
  }

  addPlayer(player) {
    // console.log(player);
    let body = player;
    return this._http.post(`${environment.back_end_url}/drafts/`, body);
  }

  showEditDraftPlayerListener(): Observable<any> {
    return this._subjectShowEditDraftPlayer.asObservable();
  }
}
