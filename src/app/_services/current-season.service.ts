import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrentSeasonService {

  currentSeason: string = '2020-21';
  currentSeasonType: string = 'Regular';
  currentOffSeason: string = '2021';

  currentNextSeason: string = '2021-22';
  currentNextOffSeason: string = '2022';

  constructor() { }
}
