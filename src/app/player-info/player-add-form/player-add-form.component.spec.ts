import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerAddFormComponent } from './player-add-form.component';

describe('PlayerAddFormComponent', () => {
  let component: PlayerAddFormComponent;
  let fixture: ComponentFixture<PlayerAddFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerAddFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
