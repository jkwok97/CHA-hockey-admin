import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentEditComponent } from './current-edit.component';

describe('CurrentEditComponent', () => {
  let component: CurrentEditComponent;
  let fixture: ComponentFixture<CurrentEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
