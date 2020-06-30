import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { DisplayService } from '../_services/display.service';
import { ChampionsService } from '../_services/champions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-champs',
  templateUrl: './champs.component.html',
  styleUrls: ['./champs.component.css']
})
export class ChampsComponent implements OnInit, OnDestroy {

  private _alive:boolean = true;
  isLoading: boolean = false;
  isMobile: boolean = false;

  championsList: any[] = [];

  champs: MatTableDataSource<any[]>;
  columns = ['year_won', 'team_name', 'owner_name', 'player_name', 'award_type'];
  mobileColumns = ['year_won', 'owner_name', 'player_name', 'award_type'];

  constructor(
    private _displayService: DisplayService,
    private _championsService: ChampionsService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.isMobile = this._displayService.isMobile;

    this.getData();
    
  }

  getData() {
    this._championsService.getAllAwardWinners().pipe(
      takeWhile(() => this._alive)
    ).subscribe((winners) => {
      this.champs = new MatTableDataSource<any[]>(winners as []);
      this.isLoading = false;
    })
  }

   addPlayer() {
     this._router.navigate([`champs/add`]);
   }

  ngOnDestroy() {
    this._alive = false;
  }

}
