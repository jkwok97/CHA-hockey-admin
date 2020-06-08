import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Salary } from '../_models/salary';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {

  constructor(
    private _http: HttpClient
    ) { }

  getAllSalaries() {
    return this._http.get(`${environment.back_end_url}/v2/players/salaries`).pipe(
      map(result => result['result'])
    )
  }

  getAllActiveSalaries(isactive: string) {

    const options = {params: new HttpParams()
      .set('isactive', isactive)
    }

    return this._http.get(`${environment.back_end_url}/v2/players/salaries/active`, options).pipe(
      map(result => result['result'])
    )

  }

  getSalary(id: number): Observable<Salary> {
    return this._http.get(`${environment.back_end_url}/v2/players/salaries/edit/${id}`).pipe(
      map(result => result['result'][0])
    )
  }

  addSalary(salaryInfo: Salary) {
    return this._http.post(`${environment.back_end_url}/v2/players/salaries/add`, salaryInfo).pipe(
      map(result => result['result'])
    )
  }

  updateSalary(salary: Salary) {
    return this._http.put(`${environment.back_end_url}/v2/players/salaries/edit/${salary.id}`, salary).pipe(
      map(result => result['message'])
    )
  }

}
