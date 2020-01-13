import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDraftComponent } from './new-draft.component';

describe('NewDraftComponent', () => {
  let component: NewDraftComponent;
  let fixture: ComponentFixture<NewDraftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewDraftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
