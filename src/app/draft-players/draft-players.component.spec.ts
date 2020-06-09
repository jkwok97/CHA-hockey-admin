import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftPlayersComponent } from './draft-players.component';

describe('DraftPlayersComponent', () => {
  let component: DraftPlayersComponent;
  let fixture: ComponentFixture<DraftPlayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DraftPlayersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
