import { async, TestBed } from '@angular/core/testing';
import { WaiverPriorityComponent } from './waiver-priority.component';
describe('WaiverPriorityComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [WaiverPriorityComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(WaiverPriorityComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=waiver-priority.component.spec.js.map