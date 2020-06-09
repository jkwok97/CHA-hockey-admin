import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { DraftTable } from '../_models/draft-table';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DraftService {

  constructor(
    private _http: HttpClient
  ) { }

  getDraftTableByYear(currentSeason: string): Observable<DraftTable[]> {

    const options = {params: new HttpParams()
      .set('draft_year', currentSeason)
    }

    return this._http.get(`${environment.back_end_url}/v2/draft-table/`, options).pipe(
      map(result => result['result'])
    )
  }

  getDraftTableById(id: number): Observable<DraftTable> {
    return this._http.get(`${environment.back_end_url}/v2/draft-table/${id}`).pipe(
      map(result => result['result'])
    )
  }

  updateDraftTableByYearById(row: DraftTable) {
    return this._http.patch(`${environment.back_end_url}/v2/draft-table/${row.id}`, row).pipe(
      map(result => result['message'])
    )
  }

}
