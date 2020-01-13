import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewPlayerComponent } from './add-new-player.component';

describe('AddNewPlayerComponent', () => {
  let component: AddNewPlayerComponent;
  let fixture: ComponentFixture<AddNewPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
