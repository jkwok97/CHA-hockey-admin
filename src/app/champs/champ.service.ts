import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChampService {

  editType: string;
  champion: any;

  private _subjectShowEditChampPlayer = new Subject<any>();
  private _subjectShowAddChampPlayer = new Subject<any>();

  constructor(
    private _http: HttpClient
  ) { }

  getChampions(type) {
    let options = {params: new HttpParams()
      .set('type', type)}
    return this._http.get(`${environment.back_end_url}/champions/`, options);
  }

  addChampion(champ) {
    console.log(champ);
    let body = champ;
    return this._http.post(`${environment.back_end_url}/champions/`, body);
  }

  showEditChampPlayerTrigger(bool) {
    console.log(bool);
    this._subjectShowEditChampPlayer.next(bool);
  }

  showEditChampPlayerListener(): Observable<any> {
    return this._subjectShowEditChampPlayer.asObservable();
  }

  showAddChampPlayerTrigger(type) {
    console.log(type);
    this.editType = type;
    this._subjectShowAddChampPlayer.next(type);
  }

  showAddChampPlayerListener(): Observable<any> {
    return this._subjectShowAddChampPlayer.asObservable();
  }

  deleteChamp(id) {
    return this._http.delete(`${environment.back_end_url}/champions/${id}`);
  }

  updateChamp(champ) {
    console.log(champ);
    let body = champ;
    return this._http.put(`${environment.back_end_url}/champions/${champ.id}`, body);
  }

  setChampion(champ) {
    console.log(champ);
    this.champion = champ;
  }
  
}
