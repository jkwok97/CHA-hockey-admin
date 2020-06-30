import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChampionsService {

  constructor(
    private _http: HttpClient
  ) { }

  getAllAwardWinners(): Observable<any[]> {

    return this._http.get(`${environment.back_end_url}/v2/awards`).pipe(
      map(result => result['result'])
    )
  }

  getAwardTypes() {
    return this._http.get(`${environment.back_end_url}/v2/awards/award-types`).pipe(
      map(result => result['result'])
    )
  }

  getAwardWinnerById(id: number) {
    return this._http.get(`${environment.back_end_url}/v2/awards/winners/${id}`).pipe(
      map(result => result['result'])
    )
  }

  addAwardWinner(winner) {
    let body = winner;

    return this._http.post(`${environment.back_end_url}/v2/awards/add`, body)
  }

  updateAwardWinner(id, winner) {
    let body = winner;

    return this._http.put(`${environment.back_end_url}/v2/awards/winners/${id}`, body)
  }

  deleteAwardWinner(id) {
    return this._http.delete(`${environment.back_end_url}/v2/awards/winners/${id}`)
  }

}
