import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { takeWhile } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';
import { User } from '../_models/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DisplayService } from '../_services/display.service';

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

  activeLinkIndex = -1;

  routes = [
    {name: 'Users', url: 'users', current: false},
    {name: 'Teams', url: 'teams', current: false},
    {name: 'Player Info', url: 'player-info', current: false},
    {name: 'Salaries', url: 'salaries', current: false},
    {name: 'Current Players', url: 'current-players', current: false},
    {name: 'Current Goalies', url: 'current-goalies', current: false},
    {name: 'Draft Table', url: 'draft-table', current: false},
    {name: 'Draft', url: 'draft', current: false},
    {name: 'Transactions', url: 'transactions', current: false},
    {name: 'Waivers', url: 'waivers', current: false},
    {name: 'Games', url: 'games', current: true},

    
    {name: 'Trades (OLD)', url: 'trades', current: false},
    {name: 'Champ Upload (OLD)', url: 'champs', current: false},
  ];

  constructor(
    private _router: Router, 
    private _authService: AuthService,
    private _displayService: DisplayService,
    private _popper: MatSnackBar
  ) { 

    if (this._authService.currentUserValue) { 
      this.loggedIn = true;
      this._router.navigate(['users']);
    } else {
      this._router.navigate(['login']);
    }
    this._authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this._router.navigate(['login']);
    this._displayService.popupListener().pipe(takeWhile(() => this._alive)).subscribe(resp => {
      let message = resp as string;
      this.openPopup(message, "Update");
    });
  }

  openPopup(message, action) {
    this._popper.open(message, action, {
      duration: this.duration * 1000,
    });
  }

  logout() {
    this._authService.logout();
    this._router.navigate(['/login']);
  }

  ngOnDestroy() {
    this._alive = false;
  }

}
