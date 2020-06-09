import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftTableEditComponent } from './draft-table-edit.component';

describe('DraftTableEditComponent', () => {
  let component: DraftTableEditComponent;
  let fixture: ComponentFixture<DraftTableEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DraftTableEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftTableEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
