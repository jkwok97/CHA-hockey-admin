import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDraftPlayerComponent } from './edit-draft-player.component';

describe('EditDraftPlayerComponent', () => {
  let component: EditDraftPlayerComponent;
  let fixture: ComponentFixture<EditDraftPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDraftPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDraftPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
