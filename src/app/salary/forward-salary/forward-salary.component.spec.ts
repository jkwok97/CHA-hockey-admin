import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForwardSalaryComponent } from './forward-salary.component';

describe('ForwardSalaryComponent', () => {
  let component: ForwardSalaryComponent;
  let fixture: ComponentFixture<ForwardSalaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForwardSalaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForwardSalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
