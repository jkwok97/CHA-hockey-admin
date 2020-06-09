import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MaterialModule } from '../material-module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './main/login/login.component';
import { AuthService } from './_services/auth.service';
import { PlayerCardComponent } from './players/player-card/player-card.component';
import { PlayersComponent } from './players/players.component';
import { GoaliesComponent } from './goalies/goalies.component';
import { MessagePopperComponent } from './message-popper/message-popper.component';
import { DraftComponent } from './draft/draft.component';
import { SalaryComponent } from './salary/salary.component';
import { SalaryCardComponent } from './salary/salary-card/salary-card.component';
import { ForwardSalaryComponent } from './salary/forward-salary/forward-salary.component';
import { DefenseSalaryComponent } from './salary/defense-salary/defense-salary.component';
import { GoalieSalaryComponent } from './salary/goalie-salary/goalie-salary.component';
import { AddPlayerComponent } from './salary/add-player/add-player.component';
import { WaiversComponent } from './waivers/waivers.component';
import { GamesComponent } from './games/games.component';
import { NewDraftComponent } from './draft/new-draft/new-draft.component';
import { AddNewPlayerComponent } from './draft/add-new-player/add-new-player.component';
import { DraftEditComponent } from './draft/draft-edit/draft-edit.component';
import { EditDraftPlayerComponent } from './draft/edit-draft-player/edit-draft-player.component';
import { ChampsComponent } from './champs/champs.component';
import { AddChampComponent } from './champs/add-champ/add-champ.component';
import { TradesComponent } from './trades/trades.component';
import { TradeSelectComponent } from './trades/trade-select/trade-select.component';
import { TradeListViewComponent } from './trades/trade-list-view/trade-list-view.component';
import { TradeButtonsComponent } from './trades/trade-buttons/trade-buttons.component';
import { UsersComponent } from './users/users.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { PlayerInfoComponent } from './player-info/player-info.component';
import { PlayerInfoFormComponent } from './player-info/player-info-form/player-info-form.component';
import { PlayerAddFormComponent } from './player-info/player-add-form/player-add-form.component';
import { SalariesComponent } from './salaries/salaries.component';
import { SalaryEditComponent } from './salaries/salary-edit/salary-edit.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { AssetListComponent } from './transactions/asset-list/asset-list.component';
import { TransactionButtonsComponent } from './transactions/transaction-buttons/transaction-buttons.component';
import { TeamSelectComponent } from './transactions/team-select/team-select.component';
import { TeamsComponent } from './teams/teams.component';
import { TeamsEditComponent } from './teams/teams-edit/teams-edit.component';
import { CurrentPlayersComponent } from './current-players/current-players.component';
import { CurrentGoaliesComponent } from './current-goalies/current-goalies.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    MainComponent,
    LoginComponent,
    PlayerCardComponent,
    PlayersComponent,
    GoaliesComponent,
    MessagePopperComponent,
    DraftComponent,
    SalaryComponent,
    SalaryCardComponent,
    ForwardSalaryComponent,
    DefenseSalaryComponent,
    GoalieSalaryComponent,
    AddPlayerComponent,
    WaiversComponent,
    GamesComponent,
    NewDraftComponent,
    AddNewPlayerComponent,
    DraftEditComponent,
    EditDraftPlayerComponent,
    ChampsComponent,
    AddChampComponent,
    TradesComponent,
    TradeSelectComponent,
    TradeListViewComponent,
    TradeButtonsComponent,
    UsersComponent,
    UserEditComponent,
    PlayerInfoComponent,
    PlayerInfoFormComponent,
    PlayerAddFormComponent,
    SalariesComponent,
    SalaryEditComponent,
    TransactionsComponent,
    AssetListComponent,
    TransactionButtonsComponent,
    TeamSelectComponent,
    TeamsComponent,
    TeamsEditComponent,
    CurrentPlayersComponent,
    CurrentGoaliesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule, 
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
