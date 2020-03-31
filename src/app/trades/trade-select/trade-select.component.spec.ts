import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeSelectComponent } from './trade-select.component';

describe('TradeSelectComponent', () => {
  let component: TradeSelectComponent;
  let fixture: ComponentFixture<TradeSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
