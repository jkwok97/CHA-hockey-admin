import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Division } from '../_models/division';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {

  currentSeason: '2020-21';
  currentSeasonType: 'Regular';

  constructor(private _http: HttpClient) { 
    console.log(this.currentSeasonType);
    console.log(this.currentSeason);
    console.log('2020-21')
  }

  getDivisions(): Observable<Division[]> {
    return this._http.get(`${environment.back_end_url}/v2/league/divisions`).pipe(
      map(result => result['result'])
    )
  }
  
}
