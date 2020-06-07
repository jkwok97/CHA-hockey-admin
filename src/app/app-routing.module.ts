import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main/main.component';
import { LoginComponent } from './main/login/login.component';
import { AuthGuard } from '../app/_services/auth.guard';
import { PlayerCardComponent } from './players/player-card/player-card.component';
import { SalaryCardComponent } from './salary/salary-card/salary-card.component';
import { AddPlayerComponent } from './salary/add-player/add-player.component';
import { TradesComponent } from './trades/trades.component';
import { GamesComponent } from './games/games.component';
import { PlayersComponent } from './players/players.component';
import { GoaliesComponent } from './goalies/goalies.component';
import { DraftComponent } from './draft/draft.component';
import { SalaryComponent } from './salary/salary.component';
import { WaiversComponent } from './waivers/waivers.component';
import { NewDraftComponent } from './draft/new-draft/new-draft.component';
import { ChampsComponent } from './champs/champs.component';
import { UsersComponent } from './users/users.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { PlayerInfoComponent } from './player-info/player-info.component';
import { PlayerInfoFormComponent } from './player-info/player-info-form/player-info-form.component';

const routes: Routes = [
  { path: 'main', component: MainComponent},
  { path: 'games', component: GamesComponent, canActivate: [AuthGuard]},
  { path: 'trades', component: TradesComponent},
  { path: 'players', component: PlayersComponent},
  { path: 'goalies', component: GoaliesComponent},
  { path: 'draft', component: DraftComponent},
  { path: 'salary', component: SalaryComponent},
  { path: 'waivers', component: WaiversComponent},
  { path: 'new-draft', component: NewDraftComponent},
  { path: 'champs', component: ChampsComponent},
  { path: 'edit/:type/:id', component: PlayerCardComponent, canActivate: [AuthGuard]},
  { path: 'salary/edit/:type/:id/:params', component: SalaryCardComponent, canActivate: [AuthGuard]},
  { path: 'salary/add/forward', component: AddPlayerComponent, canActivate: [AuthGuard]},
  { path: 'salary/add/goalie', component: AddPlayerComponent, canActivate: [AuthGuard]},
  { path: 'salary/add/defense', component: AddPlayerComponent, canActivate: [AuthGuard]},
  { path: 'trades', component: TradesComponent, canActivate: [AuthGuard]},

  // ****************************************************************************************
  //                                       NEW USED ROUTES
  // ****************************************************************************************

  { path: 'login', component: LoginComponent},

  { path: 'users', component: UsersComponent },
  { path: 'users/edit/:id', component: UserEditComponent },
  { path: 'users/add', component: UserEditComponent },

  { path: 'player-info', component: PlayerInfoComponent },
  { path: 'player-info/edit/:id', component: PlayerInfoFormComponent },
  { path: 'player-info/add', component: PlayerInfoFormComponent },

];

@NgModule({
  declarations: [],
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})

export class AppRoutingModule { }
