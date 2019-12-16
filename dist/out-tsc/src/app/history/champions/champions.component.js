import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { TeamsService } from 'src/app/teams/teams.service';
import { takeWhile } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
let ChampionsComponent = class ChampionsComponent {
    constructor(_teamsService) {
        this._teamsService = _teamsService;
        this._alive = true;
        this.champions = [];
        this.champsColumns = ['year_won', 'team_logo', 'team_name', 'owner_name'];
    }
    ngOnInit() {
        this.currentChamp = this._teamsService.getTeamInfo("STA");
        this._teamsService.getChampions("champs").pipe(takeWhile(() => this._alive)).subscribe(resp => {
            // console.log(resp);
            this.champions = resp;
            this.champs = new MatTableDataSource(this.champions);
        });
    }
    findLogo(shortName) {
        if (shortName) {
            let team = this._teamsService.getTeamInfo(shortName);
            return { image: team.image, name: team.name };
        }
        else {
            return { image: "../../assets/team_logos/Free_Agent_logo_square.jpg", name: "Free Agent" };
        }
    }
    ngOnDestroy() {
        this._alive = false;
    }
};
ChampionsComponent = tslib_1.__decorate([
    Component({
        selector: 'app-champions',
        templateUrl: './champions.component.html',
        styleUrls: ['./champions.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [TeamsService])
], ChampionsComponent);
export { ChampionsComponent };
//# sourceMappingURL=champions.component.js.map