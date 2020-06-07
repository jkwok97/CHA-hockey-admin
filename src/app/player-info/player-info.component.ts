import { Component, OnInit, ViewChild } from '@angular/core';
import { Player } from '../_models/player';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PlayersService } from '../_services/players.service';
import { Router, ActivatedRoute } from '@angular/router';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.css']
})
export class PlayerInfoComponent implements OnInit {

  private _alive: boolean = true;
  isLoading: boolean = false;

  players: Player[];

  showType: string = 'true';

  playersData: MatTableDataSource<any[]>;
  columns = [ 'id', 'nhl_id', 'firstname', 'lastname', 'isactive', 'isgoalie', 'isdefense', 'isforward'];

  page: number = 1;
  pageSize: number = 25;
  length: number = 0;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(
    private _playersService: PlayersService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.isLoading = true;

    this.getPlayers(this.showType);
  }

  changeActive(type: string) {
    this.showType = type;
    this.isLoading = true;
    this.getPlayers(this.showType);
  }

  getPlayers(type: string) {
    this._playersService.getAllPlayersByActive(type).pipe(
      takeWhile(() => this._alive)
    ).subscribe((players: Player[]) => {
      this.isLoading = false;
      this.players = players;
      this.playersData = new MatTableDataSource<any[]>(this.players as any[]);
      setTimeout(() => {
        this.playersData.paginator = this.paginator;
        this.playersData.sort = this.sort;
      }, 350);
    })
  }

  applyFilter(filterValue: string) {
    this.playersData.filter = filterValue.trim().toLowerCase();
    if (this.playersData.paginator) {
      this.playersData.paginator.firstPage();
    }
  }

  onEdit(playerId: number) {
    this._router.navigate([`edit/${playerId}`], { relativeTo: this._route });
    window.scrollTo(0,0);
  }

  onAddPlayer() {
    this._router.navigate([`add`], { relativeTo: this._route });
    window.scrollTo(0,0);
  }

  ngOnDestroy(): void {
    this._alive = false;
  }

}
