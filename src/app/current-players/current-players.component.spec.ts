import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentPlayersComponent } from './current-players.component';

describe('CurrentPlayersComponent', () => {
  let component: CurrentPlayersComponent;
  let fixture: ComponentFixture<CurrentPlayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentPlayersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
