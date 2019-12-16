import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { takeWhile, filter } from 'rxjs/operators';
import { AuthService } from '../main/auth.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy {

  loggedIn: boolean = false;
  private _alive:boolean = true;

  currentUser: User;

  route: string;

  constructor(
    private _router: Router, 
    private _authService: AuthService
  ) { 

    // redirect to home if already logged in
    if (this._authService.currentUserValue) { 
      // console.log(this._authService.currentUserValue)
      this.loggedIn = true;
      // console.log(this.loggedIn);
      this._router.navigate(['login']);
    } else {
      // console.log(this.loggedIn);

      this._router.navigate(['login']);
    }
    this._authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this._router.navigate(['login']);
  }

  ngOnDestroy() {
    this._alive = false;
  }

}
