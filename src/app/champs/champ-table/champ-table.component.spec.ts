import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampTableComponent } from './champ-table.component';

describe('ChampTableComponent', () => {
  let component: ChampTableComponent;
  let fixture: ComponentFixture<ChampTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChampTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChampTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
