import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { EqualizationComponent } from './equalization/equalization.component';
import { LotteryComponent } from './lottery/lottery.component';
import { EgrComponent } from './egr/egr.component';
import { ProtectionComponent } from './protection/protection.component';
import { RostersComponent } from './rosters/rosters.component';
import { WaiversComponent } from './waivers/waivers.component';
import { WinningsComponent } from './winnings/winnings.component';
let RulesComponent = class RulesComponent {
    constructor(_router, _bottomSheet) {
        this._router = _router;
        this._bottomSheet = _bottomSheet;
        this._alive = true;
        this.activeLinkIndex = -1;
        this.routes = [
            { name: 'Player Equalization', url: 'equalization', current: false },
            { name: 'Draft Lottery', url: 'lottery', current: false },
            { name: 'Emergency Goaltender Rule', url: 'egr', current: false },
            { name: 'Player Protection Rule', url: 'protection', current: false },
            { name: 'Roster Max & Min', url: 'rosters', current: false },
            { name: 'Waiver Wire', url: 'waivers', current: false },
            { name: 'Winnings', url: 'winnings', current: false },
        ];
        this._router.events.subscribe((res) => {
            this.activeLinkIndex = this.routes.indexOf(this.routes.find(tab => tab.url === '.' + this._router.url));
        });
    }
    ngOnInit() {
    }
    openBottomSheet(route) {
        switch (route.url) {
            case "equalization":
                this._bottomSheet.open(EqualizationComponent, { panelClass: 'equalization-panel' });
                break;
            case "lottery":
                this._bottomSheet.open(LotteryComponent, { panelClass: 'lottery-panel' });
                break;
            case "egr":
                this._bottomSheet.open(EgrComponent, { panelClass: 'egr-panel' });
                break;
            case "protection":
                this._bottomSheet.open(ProtectionComponent, { panelClass: 'protection-panel' });
                break;
            case "rosters":
                this._bottomSheet.open(RostersComponent, { panelClass: 'rosters-panel' });
                break;
            case "waivers":
                this._bottomSheet.open(WaiversComponent, { panelClass: 'waivers-panel' });
                break;
            case "winnings":
                this._bottomSheet.open(WinningsComponent, { panelClass: 'winnings-panel' });
                break;
        }
    }
    ngOnDestroy() {
        this._alive = false;
    }
};
RulesComponent = tslib_1.__decorate([
    Component({
        selector: 'app-rules',
        templateUrl: './rules.component.html',
        styleUrls: ['./rules.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [Router,
        MatBottomSheet])
], RulesComponent);
export { RulesComponent };
//# sourceMappingURL=rules.component.js.map