import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagePopperComponent } from './message-popper.component';

describe('MessagePopperComponent', () => {
  let component: MessagePopperComponent;
  let fixture: ComponentFixture<MessagePopperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagePopperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagePopperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
