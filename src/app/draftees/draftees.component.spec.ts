import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrafteesComponent } from './draftees.component';

describe('DrafteesComponent', () => {
  let component: DrafteesComponent;
  let fixture: ComponentFixture<DrafteesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrafteesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrafteesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
