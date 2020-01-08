import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

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
    GoalieSalaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule, 
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
