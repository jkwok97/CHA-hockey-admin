import { async, TestBed } from '@angular/core/testing';
import { GoalieArchivesComponent } from './goalie-archives.component';
describe('GoalieArchivesComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GoalieArchivesComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(GoalieArchivesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=goalie-archives.component.spec.js.map