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
import { AuthService } from './main/auth.service';
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
    TradeButtonsComponent
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
