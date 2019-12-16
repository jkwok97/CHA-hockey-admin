import { async, TestBed } from '@angular/core/testing';
import { GoalieStatsComponent } from './goalie-stats.component';
describe('GoalieStatsComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GoalieStatsComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(GoalieStatsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=goalie-stats.component.spec.js.map