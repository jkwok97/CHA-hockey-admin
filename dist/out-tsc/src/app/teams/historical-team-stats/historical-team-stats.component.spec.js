import { async, TestBed } from '@angular/core/testing';
import { HistoricalTeamStatsComponent } from './historical-team-stats.component';
describe('HistoricalTeamStatsComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HistoricalTeamStatsComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(HistoricalTeamStatsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=historical-team-stats.component.spec.js.map