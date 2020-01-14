import { TestBed } from '@angular/core/testing';

import { ChampService } from './champ.service';

describe('ChampService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChampService = TestBed.get(ChampService);
    expect(service).toBeTruthy();
  });
});
