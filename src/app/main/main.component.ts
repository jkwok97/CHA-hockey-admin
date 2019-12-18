import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, Renderer2, ElementRef } from '@angular/core';
import { AuthService } from './auth.service';
import { User } from '../_models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { takeWhile } from 'rxjs/operators';
import { Chart } from 'chart.js';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MainService } from './main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  private _alive:boolean = true;
  isLoading: boolean = false;
  isMobile: boolean;

  currentUser: User;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _mainService: MainService,
    private _route: ActivatedRoute,
  ) {
    this._authService.currentUser.subscribe(x => this.currentUser = x);
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

  onTabChange(event) {
    console.log(event);
  }

  logout() {
    this._authService.logout();
    this._router.navigate(['/login']);
  }

  ngOnDestroy() {
    this._alive = false;
  }

}
