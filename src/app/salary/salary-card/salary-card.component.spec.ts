import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryCardComponent } from './salary-card.component';

describe('SalaryCardComponent', () => {
  let component: SalaryCardComponent;
  let fixture: ComponentFixture<SalaryCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaryCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
