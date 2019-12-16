import { async, TestBed } from '@angular/core/testing';
import { PlayerArchivesComponent } from './player-archives.component';
describe('PlayerArchivesComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PlayerArchivesComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(PlayerArchivesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=player-archives.component.spec.js.map