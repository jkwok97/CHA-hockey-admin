import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.css']
})
export class SalaryComponent implements OnInit, OnDestroy {

  private _alive:boolean = true;

  constructor() { }

  ngOnInit() {}

  ngOnDestroy() {
    this._alive = false;
  }

}
