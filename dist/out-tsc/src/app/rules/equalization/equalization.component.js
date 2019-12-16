import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
let EqualizationComponent = class EqualizationComponent {
    constructor(_bottomSheetRef) {
        this._bottomSheetRef = _bottomSheetRef;
    }
    ngOnInit() {
    }
    openLink(event) {
        this._bottomSheetRef.dismiss();
        event.preventDefault();
    }
};
EqualizationComponent = tslib_1.__decorate([
    Component({
        selector: 'app-equalization',
        templateUrl: './equalization.component.html',
        styleUrls: ['./equalization.component.css']
    }),
    tslib_1.__metadata("design:paramtypes", [MatBottomSheetRef])
], EqualizationComponent);
export { EqualizationComponent };
//# sourceMappingURL=equalization.component.js.map