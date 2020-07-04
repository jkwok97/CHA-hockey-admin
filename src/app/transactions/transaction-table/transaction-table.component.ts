import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { TransactionsService } from 'src/app/_services/transactions.service';
import { takeWhile } from 'rxjs/operators';
import { TeamService } from 'src/app/_services/team.service';
import { Team } from 'src/app/_models/team';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.css']
})
export class TransactionTableComponent implements OnInit, OnDestroy {

  private _alive: boolean = true;
  isLoading: boolean = false;

  teams: Team[];

  page: number = 1;
  pageSize: number = 20;
  length: number = 0;

  transactionsData: MatTableDataSource<any[]>;
  columns = [
    'id', 'transaction_date', 'team_one_id', 'team_one_picks', 'team_one_players', 'arrow',
    'team_two_id', 'team_two_picks', 'team_two_players'
  ];

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(
    private _transactionService: TransactionsService,
    private _teamService: TeamService,
    private _router: Router
  ) { 
    this.getTeams();
  }

  ngOnInit() {
    this.isLoading = true;
    this.getTransactions();
  }

  getTeams() {
    this._teamService.getTeams().pipe(
      takeWhile(() => this._alive)
    ).subscribe((teams: Team[]) => {
      this.teams = teams;
    })
  }

  getTransactions() {
    this._transactionService.getAllTransactions().pipe(
      takeWhile(() => this._alive)
    ).subscribe(resp => {

      const t = resp.map((item, index) => ({
        id: item.id,
        transaction_date: item.transaction_date,
        team_one_id: item.team_one_id,
        team_one_picks: item.team_one_picks,
        team_one_players:this.formatPlayers(item.team_one_players, item.team_one_firstnames, item.team_one_lastnames, item.team_one_nhlids),
        team_two_id: item.team_two_id,
        team_two_picks: item.team_two_picks,
        team_two_players: this.formatPlayers(item.team_two_players, item.team_two_firstnames, item.team_two_lastname, item.team_two_nhlids)
      }));

      this.transactionsData = new MatTableDataSource<any[]>(t);
      this.length = resp.length;
      this.isLoading = false;
      setTimeout(() => {
        this.transactionsData.paginator = this.paginator;
        this.transactionsData.sort = this.sort;
      }, 350);
    })
  }

  getTeamLogo(teamId: string) {
    if (this.teams) {
      return this.teams.find((team) => team.id === +teamId).teamlogo;
    }
  }

  getTeamName(teamId: string) {
    if (this.teams) {
      const team = this.teams.find((team: Team) => team.id === +teamId);
      return {city: team.city, nickname: team.nickname};
    }
  }

  formatPlayers(ids, firstnames, lastnames, nhlids) {
    if (ids) {
      return ids.map((player, index) => ({
        id: ids[index],
        firstname: firstnames[index],
        lastname: lastnames[index],
        nhl_id: nhlids[index]
      }));
    }
  }

  onEdit(id: number) {
    this._router.navigate([`transactions/edit/${id}`])
  }

  formatDate(date) {
    return date.slice(0,10);
  }

  ngOnDestroy(): void {
    this._alive = false;
  }

}
