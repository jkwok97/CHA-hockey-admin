import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisplayService {

  private _subjectPopup = new Subject<any>();

  constructor() { }

  checkMobile() {
    if ( navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i) ) {
          return true;
        } else {
          return false;
        }
  }

  popupListener(): Observable<any> {
    return this._subjectPopup.asObservable();
  }

  popupTrigger(text) {
    this._subjectPopup.next(text);
  }
  
}
