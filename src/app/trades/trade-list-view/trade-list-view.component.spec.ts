import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeListViewComponent } from './trade-list-view.component';

describe('TradeListViewComponent', () => {
  let component: TradeListViewComponent;
  let fixture: ComponentFixture<TradeListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
