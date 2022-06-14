import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CurrentSeasonService {
  currentSeason: string = "2022-23";
  currentSeasonType: string = "Regular";
  currentOffSeason: string = "2022";

  currentNextSeason: string = "2023-24";
  currentNextOffSeason: string = "2023";

  constructor() {}
}
