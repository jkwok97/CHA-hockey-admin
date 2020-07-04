import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main/main.component';
import { LoginComponent } from './main/login/login.component';
import { AuthGuard } from '../app/_services/auth.guard';
import { GamesComponent } from './games/games.component';
import { WaiversComponent } from './waivers/waivers.component';
import { ChampsComponent } from './champs/champs.component';
import { UsersComponent } from './users/users.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { PlayerInfoComponent } from './player-info/player-info.component';
import { PlayerInfoFormComponent } from './player-info/player-info-form/player-info-form.component';
import { PlayerAddFormComponent } from './player-info/player-add-form/player-add-form.component';
import { SalariesComponent } from './salaries/salaries.component';
import { SalaryEditComponent } from './salaries/salary-edit/salary-edit.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { TeamsComponent } from './teams/teams.component';
import { TeamsEditComponent } from './teams/teams-edit/teams-edit.component';
import { CurrentPlayersComponent } from './current-players/current-players.component';
import { CurrentGoaliesComponent } from './current-goalies/current-goalies.component';
import { CurrentEditComponent } from './current-edit/current-edit.component';
import { DraftTableComponent } from './draft-table/draft-table.component';
import { DraftTableEditComponent } from './draft-table/draft-table-edit/draft-table-edit.component';
import { DraftComponent } from './draft/draft.component';
import { DraftPlayersComponent } from './draft-players/draft-players.component';
import { AddChampComponent } from './champs/add-champ/add-champ.component';
import { TransactionEditComponent } from './transactions/transaction-edit/transaction-edit.component';

const routes: Routes = [
  { path: 'main', component: MainComponent},

  { path: 'login', component: LoginComponent},

  { path: 'users', component: UsersComponent },
  { path: 'users/edit/:id', component: UserEditComponent },
  { path: 'users/add', component: UserEditComponent },

  { path: 'teams', component: TeamsComponent },
  { path: 'teams/edit/:id', component: TeamsEditComponent },
  { path: 'teams/add', component: TeamsEditComponent },

  { path: 'player-info', component: PlayerInfoComponent },
  { path: 'player-info/edit/:id', component: PlayerInfoFormComponent },
  { path: 'player-info/add', component: PlayerInfoFormComponent },
  { path: 'player-info/add/:id', component: PlayerAddFormComponent },

  { path: 'salaries', component: SalariesComponent },
  { path: 'salaries/edit/:id', component: SalaryEditComponent },

  { path: 'transactions', component: TransactionsComponent },
  { path: 'transactions/edit/:id', component: TransactionEditComponent },

  { path: 'current-players', component: CurrentPlayersComponent },
  { path: 'current-players/edit/:id', component: CurrentEditComponent },

  { path: 'current-goalies', component: CurrentGoaliesComponent },
  { path: 'current-goalies/edit/:id', component: CurrentEditComponent },

  { path: 'draft-table', component: DraftTableComponent },
  { path: 'draft-table/edit/:id', component: DraftTableEditComponent },

  { path: 'draft', component: DraftComponent },
  { path: 'draft/edit/:id', component: DraftPlayersComponent },

  { path: 'champs', component: ChampsComponent},
  { path: 'champs/add', component: AddChampComponent},
  { path: 'champs/edit/:id', component: AddChampComponent},

  { path: 'waivers', component: WaiversComponent},

  { path: 'games', component: GamesComponent, canActivate: [AuthGuard]},

];

@NgModule({
  declarations: [],
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})

export class AppRoutingModule { }
