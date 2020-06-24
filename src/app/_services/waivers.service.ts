import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WaiversService {

  constructor(
    private _http: HttpClient,
  ) { }

  getWaiverTeams() {
    return this._http.get(`${environment.back_end_url}/v2/waivers/`);
  }

  updateWaiverTeam(id, number) {
    let body = {
      'number': number,
    };
    return this._http.patch(`${environment.back_end_url}/v2/waivers/${id}`, body)
  }

}
