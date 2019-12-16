import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TeamsService } from 'src/app/teams/teams.service';
import { takeWhile } from 'rxjs/operators';
let DraftsComponent = class DraftsComponent {
    constructor(_teamsService) {
        this._teamsService = _teamsService;
        this._alive = true;
        this.isLoading = false;
        this.short_team_name = '';
        this.playersColumnsToDisplay = [
            'draft_year', 'round_num', 'number_num', 'player_name', 'player_pos', 'team'
        ];
        this.page = 1;
        this.pageSize = 20;
        this.length = 0;
    }
    ngOnInit() {
        this.isLoading = true;
        this._teamsService.getDrafts().pipe(takeWhile(() => this._alive)).subscribe(resp => {
            // console.log(resp);
            this.drafts = resp;
            this.players = new MatTableDataSource(this.drafts);
            this.length = this.drafts.length;
            this.isLoading = false;
            setTimeout(() => {
                this.players.paginator = this.paginator;
                this.players.sort = this.sort;
            }, 350);
        });
    }
    applyFilter(filterValue) {
        this.players.filter = filterValue.trim().toLowerCase();
        if (this.players.paginator) {
            this.players.paginator.firstPage();
        }
    }
};
tslib_1.__decorate([
    ViewChild(MatPaginator, { static: false }),
    tslib_1.__metadata("design:type", MatPaginator)
], DraftsComponent.prototype, "paginator", void 0);
tslib_1.__decorate([
    ViewChild(MatSort, { static: false }),
    tslib_1.__metadata("design:type", MatSort)
], DraftsComponent.prototype, "sort", void 0);
DraftsComponent = tslib_1.__decorate([
    Component({
        selector: 'app-drafts',
        templateUrl: './drafts.component.html',
        styleUrls: ['./drafts.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [TeamsService])
], DraftsComponent);
export { DraftsComponent };
//# sourceMappingURL=drafts.component.js.map