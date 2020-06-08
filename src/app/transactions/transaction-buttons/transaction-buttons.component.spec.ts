import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionButtonsComponent } from './transaction-buttons.component';

describe('TransactionButtonsComponent', () => {
  let component: TransactionButtonsComponent;
  let fixture: ComponentFixture<TransactionButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
