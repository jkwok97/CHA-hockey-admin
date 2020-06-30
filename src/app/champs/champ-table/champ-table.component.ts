import { Component, OnInit, AfterViewInit, Input, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-champ-table',
  templateUrl: './champ-table.component.html',
  styleUrls: ['./champ-table.component.css']
})
export class ChampTableComponent implements OnInit, AfterViewInit {

  @Input() champs;
  @Input() columns;

  page: number = 1;
  pageSize: number = 25;
  length: number = 0;

  @ViewChild(MatSort, {static: false}) playerSort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(
    private _router: Router
  ) { }

  ngOnInit() {
    this.length = this.champs.length;
  }

  ngAfterViewInit() {
    this.champs.sort = this.playerSort;
    this.champs.paginator = this.paginator;
  }

  editChamp(champ) {
     this._router.navigate([`champs/edit/${champ.id}`])
   }

}
