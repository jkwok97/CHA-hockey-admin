import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private _http: HttpClient
  ) { }

  getAllUsers(): Observable<User[]> {
    return this._http.get(`${environment.back_end_url}/v2/users/`).pipe(
      map(result => result['result'])
    )
  }

  getUser(email): Observable<User> {
    return this._http.get(`${environment.back_end_url}/v2/users/${email}`).pipe(
      map(result => result['result'])
    )
  }

  addUser(userInfo: User) {
    
  }

  updateUser(id: number) {

  }

  deletUser(id: number) {

  }


}
