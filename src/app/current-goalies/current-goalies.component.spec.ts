import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentGoaliesComponent } from './current-goalies.component';

describe('CurrentGoaliesComponent', () => {
  let component: CurrentGoaliesComponent;
  let fixture: ComponentFixture<CurrentGoaliesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentGoaliesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentGoaliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
