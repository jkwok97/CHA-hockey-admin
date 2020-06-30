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
import { WaiversComponent } from './waivers/waivers.component';
import { GamesComponent } from './games/games.component';
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
import { CurrentEditComponent } from './current-edit/current-edit.component';
import { DraftTableComponent } from './draft-table/draft-table.component';
import { DraftTableEditComponent } from './draft-table/draft-table-edit/draft-table-edit.component';
import { DrafteesComponent } from './draftees/draftees.component';
import { DraftPlayersComponent } from './draft-players/draft-players.component';
import { DraftComponent } from './draft/draft.component';
import { AllGamesTableComponent } from './games/all-games-table/all-games-table.component';
import { ChampTableComponent } from './champs/champ-table/champ-table.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    MainComponent,
    LoginComponent,
    WaiversComponent,
    GamesComponent,
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
    CurrentEditComponent,
    DraftTableComponent,
    DraftTableEditComponent,
    DrafteesComponent,
    DraftPlayersComponent,
    DraftComponent,
    AllGamesTableComponent,
    ChampTableComponent,
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
