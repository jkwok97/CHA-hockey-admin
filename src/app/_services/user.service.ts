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

  getUserById(id: number): Observable<User> {
    return this._http.get(`${environment.back_end_url}/v2/users/edit/${id}`).pipe(
      map(result => result['result'][0])
    )
  }

  addUser(userInfo: User) {

    const body = {
      email: userInfo.email,
      firstname: userInfo.firstname,
      isactive: userInfo.isactive,
      isadmin: userInfo.isadmin,
      lastname: userInfo.lastname
    };

    return this._http.post(`${environment.back_end_url}/v2/users/add/`, body).pipe(
      map(result => result['message'])
    )
  }

  updateUser(user: User) {
    return this._http.put(`${environment.back_end_url}/v2/users/edit/${user.id}`, user).pipe(
      map(result => result['message'])
    )
  }

  deleteUser(id: number) {
    return this._http.delete(`${environment.back_end_url}/v2/users/delete/${id}`).pipe(
      map(result => result['message'])
    )
  }

}
