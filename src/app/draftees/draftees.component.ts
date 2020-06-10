import { Component, OnInit, ViewChild } from '@angular/core';
import { DraftPlayerService } from '../_services/draft-player.service';
import { DraftPlayer } from '../_models/draft-table';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router, ActivatedRoute } from '@angular/router';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-draftees',
  templateUrl: './draftees.component.html',
  styleUrls: ['./draftees.component.css']
})
export class DrafteesComponent implements OnInit {

  private _alive: boolean = true;
  isLoading: boolean = false;

  players: DraftPlayer[];

  draftedData: MatTableDataSource<any[]>;
  columns = [ 'id', 'player', 'draft_year', 'draft_round', 'draft_overall', 'logo', 'team'];

  page: number = 1;
  pageSize: number = 5;
  length: number = 0;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(
    private _draftPlayerService: DraftPlayerService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.getDraftedPlayers();
   }

  ngOnInit() {
    this.isLoading = true;

    this._draftPlayerService.draftPlayerListener().pipe(
      takeWhile(() => this._alive)
    ).subscribe(() => {
      this.isLoading = true;
      this.getDraftedPlayers();
    })

  }

  getDraftedPlayers() {
    this._draftPlayerService.getAllDrafted().pipe(
      takeWhile(() => this._alive)
    ).subscribe((players: DraftPlayer[]) => {
      this.isLoading = false;
      this.players = players;
      this.draftedData = new MatTableDataSource<any[]>(this.players as any[]);
      setTimeout(() => {
        this.draftedData.paginator = this.paginator;
        this.draftedData.sort = this.sort;
      }, 350);
    })
  }

  applyFilter(filterValue: string) {
    this.draftedData.filter = filterValue.trim().toLowerCase();
    if (this.draftedData.paginator) {
      this.draftedData.paginator.firstPage();
    }
  }

  onEdit(draftedId: number) {
    this._router.navigate([`edit/${draftedId}`], { relativeTo: this._route });
    window.scrollTo(0,0);
  }

  ngOnDestroy(): void {
    this._alive = false;
  }

}
