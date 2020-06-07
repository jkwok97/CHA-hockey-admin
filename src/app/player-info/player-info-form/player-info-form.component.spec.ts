import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerInfoFormComponent } from './player-info-form.component';

describe('PlayerInfoFormComponent', () => {
  let component: PlayerInfoFormComponent;
  let fixture: ComponentFixture<PlayerInfoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerInfoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
