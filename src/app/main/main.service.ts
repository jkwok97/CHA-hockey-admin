import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  currentSeason: string = "2020-21";
  currentSeasonType: string = "Regular";

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

  archivedLeague = {
    teams: [
      { name: "Mississippi Mudbugs", shortName: "MIS", image: "../../assets/team_logos/mudbugs.png", owner: "Jeff Kwok", color: '#000122', fontColor: 'white' },
      { name: "Charlotte Storm", shortName: "CHA", image: "../../assets/team_logos/chastorm.png", owner: "Patrick Ryan", color: '#000122', fontColor: 'white' },
      { name: "Seattle Surge", shortName: "STS", image: "../../assets/team_logos/surge.png", owner: "Corey Abbott", color: '#000122', fontColor: 'white' },
      { name: "Las Vegas Desperado", shortName: "LVD", image: "../../assets/team_logos/lasdesperado.png", owner: "Ferrel Hedberg", color: '#000122', fontColor: 'white' },
      { name: "San Antonio Outlaws", shortName: "SAO", image: "../../assets/team_logos/outlaws.png", owner: "Kelly Gardner", color: '#000122', fontColor: 'white' },
      { name: "Oakland Oceanus", shortName: "OAO", image: "../../assets/team_logos/oceanus.png", owner: "Joseph Sutherland", color: '#000122', fontColor: 'white' },
      { name: "Atlantic City Aces", shortName: "ATC", image: "../../assets/team_logos/aces.png", owner: "Michael Stafford", color: '#000122', fontColor: 'white' },
      { name: "Toledo Honey Badgers", shortName: "TOL", image: "../../assets/team_logos/badgers.png", owner: "Jordan Schartner", color: '#000122', fontColor: 'white' },
      { name: "Brandon Bandits", shortName: "BRA", image: "../../assets/team_logos/bandits.png", owner: "Jason Stanier", color: '#000122', fontColor: 'white' },
      { name: "Cleveland Barons", shortName: "CLE", image: "../../assets/team_logos/barons.png", owner: "Kevin Schmitz", color: '#000122', fontColor: 'white' },
      { name: "Albuquerque Chupacabras", shortName: "ALB", image: "../../assets/team_logos/chupacabras.png", owner: "Chad Fisher", color: '#000122', fontColor: 'white' },
      { name: "Halifax Conquerers", shortName: "HAL", image: "../../assets/team_logos/conquerers.png", owner: "Greg Abbott", color: '#000122', fontColor: 'white' },
      { name: "San Diego Crush", shortName: "SDC", image: "../../assets/team_logos/crush.png", owner: "Ferrel Hedberg", color: '#000122', fontColor: 'white' },
      { name: "Winnepeg Hellcats", shortName: "WIN", image: "../../assets/team_logos/hellcats.png", owner: "Ciaran Murtagh", color: '#000122', fontColor: 'white' },
      { name: "Mississauga Indians", shortName: "MGA", image: "../../assets/team_logos/indians.png", owner: "Tim Ross", color: '#000122', fontColor: 'white' },
      { name: "Salem Indians", shortName: "SAL", image: "../../assets/team_logos/indians.png", owner: "Tim Ross", color: '#000122', fontColor: 'white' },
      { name: "Jacksonville Jokers", shortName: "JAC", image: "../../assets/team_logos/jokers.png", owner: "Scott Cochrane", color: '#000122', fontColor: 'white' },
      { name: "Louisville Lionhearts", shortName: "LVL", image: "../../assets/team_logos/lionhearts.png", owner: "Nick McCurry", color: '#000122', fontColor: 'white' },
      { name: "Abbotsford Loggerheads", shortName: "ABB", image: "../../assets/team_logos/loggerheads.png", owner: "Kyle Einar", color: '#000122', fontColor: 'white' },
      { name: "Hamilton Predators", shortName: "HAM", image: "../../assets/team_logos/predators.png", owner: "Matt Beatty", color: '#000122', fontColor: 'white' },
      { name: "Hamilton Rednecks", shortName: "HAR", image: "../../assets/team_logos/rednecks.png", owner: "Travis Quinn", color: '#000122', fontColor: 'white' },
      { name: "Cape Breton Royals", shortName: "CBR", image: "../../assets/team_logos/royals.png", owner: "Ben Bruchet", color: '#000122', fontColor: 'white' },
      { name: "Red Deer Rustlers", shortName: "RDR", image: "../../assets/team_logos/rustlers.png", owner: "Dan Wood", color: '#000122', fontColor: 'white' },
      { name: "Halifax Schooners", shortName: "HAS", image: "../../assets/team_logos/schooners.png", owner: "Adam Martin", color: '#000122', fontColor: 'white' },
      { name: "Quebec City Thundercats", shortName: "QUE", image: "../../assets/team_logos/thundercats.png", owner: "Jordan Schartner", color: '#000122', fontColor: 'white' },
      { name: "Louisiana Voodoo", shortName: "LOU", image: "../../assets/team_logos/voodoo.png", owner: "Ryan Pollock", color: '#000122', fontColor: 'white' },
      { name: "Washington Whiskeyjacks", shortName: "WAS", image: "../../assets/team_logos/whiskeyjacks.png", owner: "Randy Lazzarotto", color: '#000122', fontColor: 'white' },
      { name: "Tallahasse Crimsontide", shortName: "TAL", image: "../../assets/team_logos/crimsontide.png", owner: "Darren Ward", color: '#000122', fontColor: 'white' },
      { name: "Portland Beavers", shortName: "POR", image: "../../assets/team_logos/beavers.png", owner: "Jeff Muggleston", color: '#000122', fontColor: 'white' },
      { name: "Houston Comets", shortName: "HOU", image: "../../assets/team_logos/comets.png", owner: "Al Godfrey", color: '#000122', fontColor: 'white' },
      { name: "Salem Grave Diggers", shortName: "SGD", image: "../../assets/team_logos/gravediggers.png", owner: "Tim Ross", color: '#000122', fontColor: 'white' },
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
      found = this.archivedLeague.teams.find(element => element.shortName === short);
      if (found) { this.currentTeam = found; } 
    }
    return this.currentTeam;
  }

  getTeamPlayerStatsByYearByType(team, year, type) {
    // console.log(team, year, type)
    let options = {params: new HttpParams()
      .set('year', year)
      .set('type', type)}
    return this._http.get(`${environment.back_end_url}/players-stats/${team}`, options);
  }

  getPlayerStatsByYearByType(year, type) {
    // console.log(year, type)
    let options = {params: new HttpParams()
      .set('year', year)
      .set('type', type)}
    return this._http.get(`${environment.back_end_url}/players-stats/`, options);
  }

  getTeamGoalieStatsByYearByType(team, year, type) {
    // console.log(team, year, type)
    let options = {params: new HttpParams()
      .set('year', year)
      .set('type', type)}
    return this._http.get(`${environment.back_end_url}/goalies-stats/${team}`, options);
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

  updateSkaterName(id, name) {
    let body = {
      'player_name': name
    };
    return this._http.patch(`${environment.back_end_url}/players-stats/name/${id}`, body)
  }

  updateGoalieName(id, name) {
    let body = {
      'player_name': name
    };
    return this._http.patch(`${environment.back_end_url}/goalies-stats/name/${id}`, body)
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
    return this._http.get(`${environment.back_end_url}/draft-table/all`);
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

  saveSalary(id, type, name, league_id, current, two, three, four, five) {
    let body = {
      'type': type,
      'name': name,
      'player_id': league_id,
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
  console.log(body);
    return this._http.post(`${environment.back_end_url}/salaries/${type}`, body);
  }

  getWaiverTeams() {
    return this._http.get(`${environment.back_end_url}/waivers/`);
  }

  updateWaiverTeam(id, number) {
    let body = {
      'number': number,
    };
    return this._http.patch(`${environment.back_end_url}/waivers/${id}`, body)
  }

  getAllSchedule() {
    return this._http.get(`${environment.back_end_url}/schedule/`);
  }

  updateGameScore(id, score, team) {
    if (team === "visitor") {
      let body = {
        'vis_team_score': score
      }
      return this._http.patch(`${environment.back_end_url}/schedule/${id}`, body);
    } else if (team === "home") {
      let body = {
        'home_team_score': score
      }
      return this._http.patch(`${environment.back_end_url}/schedule/${id}`, body);
    }
  }
  
  popupListener(): Observable<any> {
    return this._subjectPopup.asObservable();
  }

  popupTrigger(text) {
    this._subjectPopup.next(text);
  }


}
