import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main/main.component';
import { LoginComponent } from './main/login/login.component';
import { AuthGuard } from './main/auth.guard';
import { PlayerCardComponent } from './players/player-card/player-card.component';

const routes: Routes = [
  { path: 'main', component: MainComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent},
  { path: 'player/:params/edit', component: PlayerCardComponent, canActivate: [AuthGuard]},
];

@NgModule({
  declarations: [],
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})

export class AppRoutingModule { }
