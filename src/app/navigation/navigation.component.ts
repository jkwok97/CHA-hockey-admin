import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { takeWhile, filter } from 'rxjs/operators';
import { AuthService } from '../main/auth.service';
import { User } from '../_models/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MainService } from '../main/main.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy {

  loggedIn: boolean = false;
  private _alive:boolean = true;

  currentUser: User;

  duration = 5;

  route: string;

  constructor(
    private _router: Router, 
    private _authService: AuthService,
    private _mainService: MainService,
    private _popper: MatSnackBar
  ) { 

    // redirect to home if already logged in
    if (this._authService.currentUserValue) { 
      // console.log(this._authService.currentUserValue)
      this.loggedIn = true;
      // console.log(this.loggedIn);
      this._router.navigate(['main']);
    } else {
      // console.log(this.loggedIn);

      this._router.navigate(['login']);
    }
    this._authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this._router.navigate(['login']);
    this._mainService.popupListener().pipe(takeWhile(() => this._alive)).subscribe(resp => {
      let message = resp as string;
      this.openPopup(message, "Update");
    });
  }

  openPopup(message, action) {
    this._popper.open(message, action, {
      duration: this.duration * 1000,
    });
  }

  ngOnDestroy() {
    this._alive = false;
  }

}
