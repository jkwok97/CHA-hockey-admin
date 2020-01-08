import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefenseSalaryComponent } from './defense-salary.component';

describe('DefenseSalaryComponent', () => {
  let component: DefenseSalaryComponent;
  let fixture: ComponentFixture<DefenseSalaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefenseSalaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefenseSalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
