import { Component, OnInit, OnDestroy, } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { User } from '../_models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  private _alive:boolean = true;
  isLoading: boolean = false;
  isMobile: boolean;

  selected: number = 0;

  currentUser: User;

  constructor(
    private _authService: AuthService,
    private _router: Router,
  ) {
    this._authService.currentUser.subscribe(x => this.currentUser = x[0]);
    if (!this.currentUser) {
      this._router.navigate(['/login']);
    }
   }

  ngOnInit() {
    this.checkMobile();
  }

  checkMobile() {
    if ( navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i) ) {
          this.isMobile = true;
        } else {
          this.isMobile = false;
        }
  }

  ngOnDestroy() {
    this._alive = false;
  }

}
