import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftTableComponent } from './draft-table.component';

describe('DraftTableComponent', () => {
  let component: DraftTableComponent;
  let fixture: ComponentFixture<DraftTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DraftTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
