import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { takeWhile } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  private _alive: boolean = true;
  isLoading: boolean = false;

  users$: Observable<User[]>;
  users: User[];

  usersData: MatTableDataSource<any[]>;
  columns = [ 'id', 'firstname', 'lastname', 'email', 'isadmin', 'isactive'];

  page: number = 1;
  pageSize: number = 10;
  length: number = 0;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.users$ = this._userService.getAllUsers();
   }

  ngOnInit() {
    this.isLoading = true;

    this.users$.pipe(
      takeWhile(() => this._alive)
    ).subscribe((users: User[]) => {
      this.isLoading = false;
      this.users = users;
      this.usersData = new MatTableDataSource<any[]>(this.users as any[]);
      setTimeout(() => {
        this.usersData.paginator = this.paginator;
        this.usersData.sort = this.sort;
      }, 350);
    })
  }

  applyFilter(filterValue: string) {
    this.usersData.filter = filterValue.trim().toLowerCase();
    if (this.usersData.paginator) {
      this.usersData.paginator.firstPage();
    }
  }

  onEdit(userId: number) {
    this._router.navigate([`edit/${userId}`], { relativeTo: this._route });
    window.scrollTo(0,0);
  }

  onAddUser() {
    this._router.navigate([`add`], { relativeTo: this._route });
    window.scrollTo(0,0);
  }

  ngOnDestroy(): void {
    this._alive = false;
  }

}
