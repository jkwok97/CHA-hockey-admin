import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoaliesComponent } from './goalies.component';

describe('GoaliesComponent', () => {
  let component: GoaliesComponent;
  let fixture: ComponentFixture<GoaliesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoaliesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoaliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
