import { async, TestBed } from '@angular/core/testing';
import { TeamSeasonComponent } from './team-season.component';
describe('TeamSeasonComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TeamSeasonComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(TeamSeasonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=team-season.component.spec.js.map