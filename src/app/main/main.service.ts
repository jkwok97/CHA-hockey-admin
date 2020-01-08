import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  currentSeason: string = "2019-20";
  currentSeasonType: string = "Regular";
  playerPosition: string;
  playerHits: string;

  currentTeam: any;

  private _subjectPopup = new Subject<any>();

  currentLeague = {
    teams: [
      { name: "Seattle Storm", shortName: "SEA", image: "../../assets/team_logos/Storm.png", owner: "Matt Hamilton", 
        link: `https://docs.google.com/spreadsheets/d/e/2PACX-1vTpSpdaAz_Joer_bPx1jtFG3v59VsDaIaQ0FARGIWF7R4M83t73foELctvvEt2RK6kDXDw2c4Fiz_F6/pubhtml?gid=7&single=true&widget=false&headers=false&gridlines=false&chrome=false&range=a1:m35`, 
        mobileLink: `https://docs.google.com/spreadsheets/d/e/2PACX-1vTpSpdaAz_Joer_bPx1jtFG3v59VsDaIaQ0FARGIWF7R4M83t73foELctvvEt2RK6kDXDw2c4Fiz_F6/pubhtml?gid=7&single=false&widget=false&headers=false&gridlines=false&range=a1:m35`,
        color: '#000122' 
      },
      { name: "Oakland Assassins", shortName: "OAK", image: "../../assets/team_logos/Assassins.png", owner: "Joseph Sutherland", 
        link: `https://docs.google.com/spreadsheets/d/e/2PACX-1vTpSpdaAz_Joer_bPx1jtFG3v59VsDaIaQ0FARGIWF7R4M83t73foELctvvEt2RK6kDXDw2c4Fiz_F6/pubhtml?gid=15&single=true&widget=false&headers=false&gridlines=false&chrome=false&range=a1:m35`,
        mobileLink: `https://docs.google.com/spreadsheets/d/e/2PACX-1vTpSpdaAz_Joer_bPx1jtFG3v59VsDaIaQ0FARGIWF7R4M83t73foELctvvEt2RK6kDXDw2c4Fiz_F6/pubhtml?gid=15&single=false&widget=false&headers=false&gridlines=false&range=a1:m35`, 
        color: '#e10000' 
      },
      { name: "Kelowna Mountaineers", shortName: "KEL", image: "../../assets/team_logos/Mountaineers.png", owner: "Randy Foster", 
        link: `https://docs.google.com/spreadsheets/d/e/2PACX-1vTpSpdaAz_Joer_bPx1jtFG3v59VsDaIaQ0FARGIWF7R4M83t73foELctvvEt2RK6kDXDw2c4Fiz_F6/pubhtml?gid=32&single=true&widget=false&headers=false&gridlines=false&chrome=false&range=a1:m35`, 
        mobileLink: `https://docs.google.com/spreadsheets/d/e/2PACX-1vTpSpdaAz_Joer_bPx1jtFG3v59VsDaIaQ0FARGIWF7R4M83t73foELctvvEt2RK6kDXDw2c4Fiz_F6/pubhtml?gid=32&single=false&widget=false&headers=false&gridlines=false&range=a1:m35`,
        color: '#ec131e'  
      },
      { name: "Victoria Vipers", shortName: "VIC", image: "../../assets/team_logos/Vipers.png", owner: "Ryan Bender", 
        link: `https://docs.google.com/spreadsheets/d/e/2PACX-1vTpSpdaAz_Joer_bPx1jtFG3v59VsDaIaQ0FARGIWF7R4M83t73foELctvvEt2RK6kDXDw2c4Fiz_F6/pubhtml?gid=33&single=true&widget=false&headers=false&gridlines=false&chrome=false&range=a1:m35`,
        mobileLink: `https://docs.google.com/spreadsheets/d/e/2PACX-1vTpSpdaAz_Joer_bPx1jtFG3v59VsDaIaQ0FARGIWF7R4M83t73foELctvvEt2RK6kDXDw2c4Fiz_F6/pubhtml?gid=33&single=false&widget=false&headers=false&gridlines=false&range=a1:m35`,
        color: '#5ebe7d' 
      },
      { name: "San Francisco Fighting Cocks", shortName: "SFC", image: "../../assets/team_logos/Cocks.png", owner: "Darren Koyata", 
        link: `https://docs.google.com/spreadsheets/d/e/2PACX-1vTpSpdaAz_Joer_bPx1jtFG3v59VsDaIaQ0FARGIWF7R4M83t73foELctvvEt2RK6kDXDw2c4Fiz_F6/pubhtml?gid=8&single=true&widget=false&headers=false&gridlines=false&chrome=false&range=a1:m35`,
        mobileLink: `https://docs.google.com/spreadsheets/d/e/2PACX-1vTpSpdaAz_Joer_bPx1jtFG3v59VsDaIaQ0FARGIWF7R4M83t73foELctvvEt2RK6kDXDw2c4Fiz_F6/pubhtml?gid=8&single=false&widget=false&headers=false&gridlines=false&range=a1:m35`,
        color: '#2a4543' 
      },
      { name: "Memphis Hound Dogs", shortName: "MEM", image: "../../assets/team_logos/HoundDogs.png", owner: "Rick Lundy", 
        link: `https://docs.google.com/spreadsheets/d/e/2PACX-1vTpSpdaAz_Joer_bPx1jtFG3v59VsDaIaQ0FARGIWF7R4M83t73foELctvvEt2RK6kDXDw2c4Fiz_F6/pubhtml?gid=13&single=true&widget=false&headers=false&gridlines=false&chrome=false&range=a1:m35`,
        mobileLink: `https://docs.google.com/spreadsheets/d/e/2PACX-1vTpSpdaAz_Joer_bPx1jtFG3v59VsDaIaQ0FARGIWF7R4M83t73foELctvvEt2RK6kDXDw2c4Fiz_F6/pubhtml?gid=13&single=false&widget=false&headers=false&gridlines=false&range=a1:m35`,
        color: '#488cc4' 
      },
      { name: "Oklahoma City Oil Barons", shortName: "OKL", image: "../../assets/team_logos/OilBarons.png", owner: "Colin Baillon", 
        link: `https://docs.google.com/spreadsheets/d/e/2PACX-1vTpSpdaAz_Joer_bPx1jtFG3v59VsDaIaQ0FARGIWF7R4M83t73foELctvvEt2RK6kDXDw2c4Fiz_F6/pubhtml?gid=12&single=true&widget=false&headers=false&gridlines=false&chrome=false&range=a1:m35`,
        mobileLink: `https://docs.google.com/spreadsheets/d/e/2PACX-1vTpSpdaAz_Joer_bPx1jtFG3v59VsDaIaQ0FARGIWF7R4M83t73foELctvvEt2RK6kDXDw2c4Fiz_F6/pubhtml?gid=12&single=false&widget=false&headers=false&gridlines=false&range=a1:m35`,
        color: '#f6c522' 
      },
      { name: "Cheyenne Desperado", shortName: "CHY", image: "../../assets/team_logos/Desperado.png", owner: "Ferrel Hedberg", 
        link: `https://docs.google.com/spreadsheets/d/e/2PACX-1vTpSpdaAz_Joer_bPx1jtFG3v59VsDaIaQ0FARGIWF7R4M83t73foELctvvEt2RK6kDXDw2c4Fiz_F6/pubhtml?gid=5&single=true&widget=false&headers=false&gridlines=false&chrome=false&range=a1:m35`,
        mobileLink: `https://docs.google.com/spreadsheets/d/e/2PACX-1vTpSpdaAz_Joer_bPx1jtFG3v59VsDaIaQ0FARGIWF7R4M83t73foELctvvEt2RK6kDXDw2c4Fiz_F6/pubhtml?gid=5&single=false&widget=false&headers=false&gridlines=false&range=a1:m35`,
        color: '#b40b07' 
      },
      { name: "Wichita Wolfpack", shortName: "WIT", image: "../../assets/team_logos/Wolfpack.png", owner: "Lucas Bristow", 
        link: `https://docs.google.com/spreadsheets/d/e/2PACX-1vTpSpdaAz_Joer_bPx1jtFG3v59VsDaIaQ0FARGIWF7R4M83t73foELctvvEt2RK6kDXDw2c4Fiz_F6/pubhtml?gid=21&single=true&widget=false&headers=false&gridlines=false&chrome=false&range=a1:m35`,
        mobileLink: `https://docs.google.com/spreadsheets/d/e/2PACX-1vTpSpdaAz_Joer_bPx1jtFG3v59VsDaIaQ0FARGIWF7R4M83t73foELctvvEt2RK6kDXDw2c4Fiz_F6/pubhtml?gid=21&single=false&widget=false&headers=false&gridlines=false&range=a1:m35`,
        color: '#051443' 
      },
      { name: "Lone Star Brahmas", shortName: "LSB", image: "../../assets/team_logos/Brahmas.png", owner: "Graham Witherspoon", 
        link: `https://docs.google.com/spreadsheets/d/e/2PACX-1vTpSpdaAz_Joer_bPx1jtFG3v59VsDaIaQ0FARGIWF7R4M83t73foELctvvEt2RK6kDXDw2c4Fiz_F6/pubhtml?gid=34&single=true&widget=false&headers=false&gridlines=false&chrome=false&range=a1:m35`,
        mobileLink: `https://docs.google.com/spreadsheets/d/e/2PACX-1vTpSpdaAz_Joer_bPx1jtFG3v59VsDaIaQ0FARGIWF7R4M83t73foELctvvEt2RK6kDXDw2c4Fiz_F6/pubhtml?gid=34&single=false&widget=false&headers=false&gridlines=false&range=a1:m35`,
        color: '#d09a2c' 
      },
      { name: "Milwaukee Ice Dragons", shortName: "MIL", image: "../../assets/team_logos/Dragons.png", owner: "Lee Snowden", 
        link: `https://docs.google.com/spreadsheets/d/e/2PACX-1vTpSpdaAz_Joer_bPx1jtFG3v59VsDaIaQ0FARGIWF7R4M83t73foELctvvEt2RK6kDXDw2c4Fiz_F6/pubhtml?gid=14&single=true&widget=false&headers=false&gridlines=false&chrome=false&range=a1:m35`,
        mobileLink: `https://docs.google.com/spreadsheets/d/e/2PACX-1vTpSpdaAz_Joer_bPx1jtFG3v59VsDaIaQ0FARGIWF7R4M83t73foELctvvEt2RK6kDXDw2c4Fiz_F6/pubhtml?gid=14&single=false&widget=false&headers=false&gridlines=false&range=a1:m35`,
        color: '#830083' 
      },
      { name: "Indianapolis Goats", shortName: "IND", image: "../../assets/team_logos/Goats.png", owner: "Scott Snowden", 
        link: `https://docs.google.com/spreadsheets/d/e/2PACX-1vTpSpdaAz_Joer_bPx1jtFG3v59VsDaIaQ0FARGIWF7R4M83t73foELctvvEt2RK6kDXDw2c4Fiz_F6/pubhtml?gid=17&single=true&widget=false&headers=false&gridlines=false&chrome=false&range=a1:m35`,
        mobileLink: `https://docs.google.com/spreadsheets/d/e/2PACX-1vTpSpdaAz_Joer_bPx1jtFG3v59VsDaIaQ0FARGIWF7R4M83t73foELctvvEt2RK6kDXDw2c4Fiz_F6/pubhtml?gid=17&single=false&widget=false&headers=false&gridlines=false&range=a1:m35`,
        color: '#e0771f' 
      },
      { name: "Peoria Prowlers", shortName: "PEO", image: "../../assets/team_logos/Prowlers.png", owner: "Barry Bristow", 
        link: `https://docs.google.com/spreadsheets/d/e/2PACX-1vTpSpdaAz_Joer_bPx1jtFG3v59VsDaIaQ0FARGIWF7R4M83t73foELctvvEt2RK6kDXDw2c4Fiz_F6/pubhtml?gid=24&single=true&widget=false&headers=false&gridlines=false&chrome=false&range=a1:m35`,
        mobileLink: `https://docs.google.com/spreadsheets/d/e/2PACX-1vTpSpdaAz_Joer_bPx1jtFG3v59VsDaIaQ0FARGIWF7R4M83t73foELctvvEt2RK6kDXDw2c4Fiz_F6/pubhtml?gid=24&single=false&widget=false&headers=false&gridlines=false&range=a1:m35`,
        color: '#a87f4a' 
      },
      { name: "Mississauga North Stars", shortName: "MSG", image: "../../assets/team_logos/NorthStars.png", owner: "Joe Scardigno", 
        link: `https://docs.google.com/spreadsheets/d/e/2PACX-1vTpSpdaAz_Joer_bPx1jtFG3v59VsDaIaQ0FARGIWF7R4M83t73foELctvvEt2RK6kDXDw2c4Fiz_F6/pubhtml?gid=11&single=true&widget=false&headers=false&gridlines=false&chrome=false&range=a1:m35`,
        mobileLink: `https://docs.google.com/spreadsheets/d/e/2PACX-1vTpSpdaAz_Joer_bPx1jtFG3v59VsDaIaQ0FARGIWF7R4M83t73foELctvvEt2RK6kDXDw2c4Fiz_F6/pubhtml?gid=11&single=false&widget=false&headers=false&gridlines=false&range=a1:m35`,
        color: '#035f32' 
      },
      { name: "Green Bay Glory", shortName: "GRE", image: "../../assets/team_logos/Glory.png", owner: "Brian Dillon", 
        link: `https://docs.google.com/spreadsheets/d/e/2PACX-1vTpSpdaAz_Joer_bPx1jtFG3v59VsDaIaQ0FARGIWF7R4M83t73foELctvvEt2RK6kDXDw2c4Fiz_F6/pubhtml?gid=9&single=true&widget=false&headers=false&gridlines=false&chrome=false&range=a1:m35`,
        mobileLink: `https://docs.google.com/spreadsheets/d/e/2PACX-1vTpSpdaAz_Joer_bPx1jtFG3v59VsDaIaQ0FARGIWF7R4M83t73foELctvvEt2RK6kDXDw2c4Fiz_F6/pubhtml?gid=9&single=false&widget=false&headers=false&gridlines=false&range=a1:m35`,
        color: '#31b18a' 
      },
      { name: "Augusta Green Jackets", shortName: "AUG", image: "../../assets/team_logos/GreenJackets.png", owner: "Darcy Donaldson", 
        link: `https://docs.google.com/spreadsheets/d/e/2PACX-1vTpSpdaAz_Joer_bPx1jtFG3v59VsDaIaQ0FARGIWF7R4M83t73foELctvvEt2RK6kDXDw2c4Fiz_F6/pubhtml?gid=16&single=true&widget=false&headers=false&gridlines=false&chrome=false&range=a1:m35`,
        mobileLink: `https://docs.google.com/spreadsheets/d/e/2PACX-1vTpSpdaAz_Joer_bPx1jtFG3v59VsDaIaQ0FARGIWF7R4M83t73foELctvvEt2RK6kDXDw2c4Fiz_F6/pubhtml?gid=16&single=false&widget=false&headers=false&gridlines=false&range=a1:m35`,
        color: '#005746' 
      },
      { name: "Staten Island Killer Bees", shortName: "STA", image: "../../assets/team_logos/KillerBees.png", owner: "Jeff Kwok", 
        link: `https://docs.google.com/spreadsheets/d/e/2PACX-1vTpSpdaAz_Joer_bPx1jtFG3v59VsDaIaQ0FARGIWF7R4M83t73foELctvvEt2RK6kDXDw2c4Fiz_F6/pubhtml?gid=23&single=true&widget=false&headers=false&gridlines=false&chrome=false&range=a1:m35`,
        mobileLink: `https://docs.google.com/spreadsheets/d/e/2PACX-1vTpSpdaAz_Joer_bPx1jtFG3v59VsDaIaQ0FARGIWF7R4M83t73foELctvvEt2RK6kDXDw2c4Fiz_F6/pubhtml?gid=23&single=false&widget=false&headers=false&gridlines=false&range=a1:m35`,
        color: '#d28507' 
      },
      { name: "Cincinnati Cyclones", shortName: "CIN", image: "../../assets/team_logos/Cyclones.png", owner: "John Chin", 
        link: `https://docs.google.com/spreadsheets/d/e/2PACX-1vTpSpdaAz_Joer_bPx1jtFG3v59VsDaIaQ0FARGIWF7R4M83t73foELctvvEt2RK6kDXDw2c4Fiz_F6/pubhtml?gid=25&single=true&widget=false&headers=false&gridlines=false&chrome=false&range=a1:m35`,
        mobileLink: `https://docs.google.com/spreadsheets/d/e/2PACX-1vTpSpdaAz_Joer_bPx1jtFG3v59VsDaIaQ0FARGIWF7R4M83t73foELctvvEt2RK6kDXDw2c4Fiz_F6/pubhtml?gid=25&single=false&widget=false&headers=false&gridlines=false&range=a1:m35`,
        color: '#eb0d2d' 
      },
      { name: "South Carolina Stingrays", shortName: "SCS", image: "../../assets/team_logos/Rays.png", owner: "Kelly Gardner", 
        link: `https://docs.google.com/spreadsheets/d/e/2PACX-1vTpSpdaAz_Joer_bPx1jtFG3v59VsDaIaQ0FARGIWF7R4M83t73foELctvvEt2RK6kDXDw2c4Fiz_F6/pubhtml?gid=18&single=true&widget=false&headers=false&gridlines=false&chrome=false&range=a1:m35`,
        mobileLink: `https://docs.google.com/spreadsheets/d/e/2PACX-1vTpSpdaAz_Joer_bPx1jtFG3v59VsDaIaQ0FARGIWF7R4M83t73foELctvvEt2RK6kDXDw2c4Fiz_F6/pubhtml?gid=18&single=false&widget=false&headers=false&gridlines=false&range=a1:m35`,
        color: '#00395f' 
      },
      { name: "Atlanta Flashers", shortName: "ATL", image: "../../assets/team_logos/Flashers.png", owner: "Patrick Ryan", 
        link: `https://docs.google.com/spreadsheets/d/e/2PACX-1vTpSpdaAz_Joer_bPx1jtFG3v59VsDaIaQ0FARGIWF7R4M83t73foELctvvEt2RK6kDXDw2c4Fiz_F6/pubhtml?gid=31&single=true&widget=false&headers=false&gridlines=false&chrome=false&range=a1:m35&width=100&height=100`,
        mobileLink: `https://docs.google.com/spreadsheets/d/e/2PACX-1vTpSpdaAz_Joer_bPx1jtFG3v59VsDaIaQ0FARGIWF7R4M83t73foELctvvEt2RK6kDXDw2c4Fiz_F6/pubhtml?gid=31&single=false&widget=false&headers=false&gridlines=false&range=a1:m35`,
        color: '#cd0000' 
      },
      { image: "../../assets/team_logos/Free_Agent_logo_square.jpg", name: "Free Agent", shortName: "FA"}
    ]
  }

  constructor(
    private _http: HttpClient
  ) { }

  getAllUsers() {
    return this._http.get(`${environment.back_end_url}/users/`);
  }

  getUser(email) {
    return this._http.get(`${environment.back_end_url}/players-stats/${email}`);
  }

  getTeamInfo(short) {
    let found;
    found = this.currentLeague.teams.find(team => team.shortName === short);
    if (found !== undefined) { 
      this.currentTeam = found; 
    } else {
      this.currentTeam = '';
    }
    return this.currentTeam;
  }

  setPlayerPosition(position) {
    this.playerPosition = position;
  }

  setPlayerHits(hits) {
    this.playerHits = hits;
  }

  getPlayerStatsByYearByType(year, type) {
    // console.log(year, type)
    let options = {params: new HttpParams()
      .set('year', year)
      .set('type', type)}
    return this._http.get(`${environment.back_end_url}/players-stats/`, options);
  }

  getGoalieStatsByYearByType(year, type) {
    // console.log(year, type)
    let options = {params: new HttpParams()
      .set('year', year)
      .set('type', type)}
    return this._http.get(`${environment.back_end_url}/goalies-stats/`, options)
  }

  getAllIndividualPlayerStatsByType(name, type) {
    let options = {params: new HttpParams()
      .set('type', type)}
    return this._http.get(`${environment.back_end_url}/players/${name}`, options);
  }

  getAllIndividualGoalieStatsByType(name, type) {
    let options = {params: new HttpParams()
      .set('type', type)}
    return this._http.get(`${environment.back_end_url}/goalies/${name}`, options);
  }

  tradePlayer(team, id, player, type, prevTeam) {
    let body = {
      'team_name': team,
      'player': player,
      'type': type,
      'prevTeam': prevTeam
    };
    return this._http.patch(`${environment.back_end_url}/players-stats/${id}`, body)
  }

  tradeGoalie(team, id, player, type, prevTeam) {
    let body = {
      'team_name': team,
      'player': player,
      'type': type,
      'prevTeam': prevTeam
    };
    return this._http.patch(`${environment.back_end_url}/goalies-stats/${id}`, body)
  }

  tradePick(teamName, prevTeamId, round, prevTeam) {
    let body = {
      'team': teamName,
      'round': round,
      'type': "Trade",
      'prevTeam': prevTeam
    };
    return this._http.patch(`${environment.back_end_url}/draft-table/${prevTeamId}`, body)
  }

  getDraftTable() {
    return this._http.get(`${environment.back_end_url}/draft-table/`);
  }

  getLeagueTeamsStats() {
    let options = {params: new HttpParams()
      .set('year', this.currentSeason)}
    return this._http.get(`${environment.back_end_url}/team-stats/`, options);
  }

  getSalaries(position, type, year) {
    let options = {params: new HttpParams()
      .set('position', position)
      .set('type', type)
      .set('year', year)
    }
    return this._http.get(`${environment.back_end_url}/salaries/`, options);
  }

  getAllSalaries(position) {
    let options = {params: new HttpParams()
      .set('position', position)
    }
    return this._http.get(`${environment.back_end_url}/salaries/all`, options);
  }

  getSalary(id, position) {
    let options = {params: new HttpParams()
      .set('position', position)
    }
    return this._http.get(`${environment.back_end_url}/salaries/${id}`, options);
  }

  saveSalary(id, type, current, two, three, four, five) {
    let body = {
      'type': type,
      'current': current,
      'two': two,
      'three': three,
      'four': four,
      'five': five
  }
    return this._http.put(`${environment.back_end_url}/salaries/${id}`, body);
  }

  deleteSalary(id, type) {
    return this._http.delete(`${environment.back_end_url}/salaries/${id}/${type}`);
  }

  addNewPlayer(type, name, current, two, three, four, five) {
    let body = {
      'name': name,
      'current': current,
      'two': two,
      'three': three,
      'four': four,
      'five': five
  }
    return this._http.post(`${environment.back_end_url}/salaries/${type}`, body);
  }
  
  popupListener(): Observable<any> {
    return this._subjectPopup.asObservable();
  }

  popupTrigger(text) {
    this._subjectPopup.next(text);
  }


}
