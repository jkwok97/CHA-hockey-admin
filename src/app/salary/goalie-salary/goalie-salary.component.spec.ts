import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalieSalaryComponent } from './goalie-salary.component';

describe('GoalieSalaryComponent', () => {
  let component: GoalieSalaryComponent;
  let fixture: ComponentFixture<GoalieSalaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoalieSalaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalieSalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
