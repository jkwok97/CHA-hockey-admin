import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/app/_services/team.service';
import { Observable } from 'rxjs';
import { Team } from 'src/app/_models/team';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DisplayService } from 'src/app/_services/display.service';
import { ActivatedRoute, Router } from '@angular/router';
import { take, takeWhile } from 'rxjs/operators';
import { User } from 'src/app/_models/user';
import { Division } from 'src/app/_models/division';
import { UserService } from 'src/app/_services/user.service';
import { LeagueService } from 'src/app/_services/league.service';

@Component({
  selector: 'app-teams-edit',
  templateUrl: './teams-edit.component.html',
  styleUrls: ['./teams-edit.component.css']
})
export class TeamsEditComponent implements OnInit {

  isMobile: boolean;
  isSaving: boolean;
  isLoading: boolean = true;
  inEditMode: boolean;
  private _alive: boolean = true;

  team$: Observable<Team>;
  users$: Observable<User[]>;
  divisions$: Observable<Division[]>;
  team: Team;

  teamForm: FormGroup;

  constructor(
    private _displayService: DisplayService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _teamsService: TeamService,
    private _usersService: UserService,
    private _leagueService: LeagueService
  ) { 

    if (this._route.snapshot.url.find(url => url.path.includes('edit'))) {
      this.inEditMode = true;
      const teamId = this._route.snapshot.params.id;
      this.team$ = this._teamsService.getTeamById(teamId);
    }

    this.users$ = this._usersService.getAllUsers();
    this.divisions$ = this._leagueService.getDivisions();

  }

  ngOnInit() {
    this.isMobile = this._displayService.checkMobile();

    this.createForm();

    if (this.inEditMode) {
      this.team$.pipe(
        take(1)
      ).subscribe((team: Team) => {
        this.isLoading = false;
        this.team = team;
        this.patchform(team);
      })
    } else {
      this.isLoading = false;
    }
  }

  createForm() {
    this.teamForm = new FormGroup({
      'shortname': new FormControl('', [Validators.required]),
      'city': new FormControl('', [Validators.required]),
      'nickname': new FormControl('', [Validators.required]),
      'isactive': new FormControl('', [Validators.required]),
      'users_id': new FormControl('', [Validators.required]),
      'teamlogo': new FormControl('', [Validators.required]),
      'teamaltlogo': new FormControl(''),
      'teamcolor': new FormControl('', [Validators.required]),
      'teamtextcolor': new FormControl('', [Validators.required]),
      'divisions_id': new FormControl(''),
    })
  }

  patchform(team: Team) {
    this.teamForm.patchValue({
      'shortname': team.shortname,
      'city': team.city,
      'nickname': team.nickname,
      'isactive': team.isactive,
      'users_id': team.users_id,
      'teamlogo': team.teamlogo,
      'teamaltlogo': team.teamaltlogo,
      'teamcolor': team.teamcolor,
      'teamtextcolor': team.teamtextcolor,
      'divisions_id': team.divisions_id,
    })

  }

  onSave() {
    this.isSaving = true;
    this.inEditMode ? this.handleEditSave() : this.handleAddSave();
  }

  handleAddSave() {

    const teamData = {
      ...this.teamForm.value
    };

    this._teamsService.addTeam(teamData).pipe(
      takeWhile(() => this._alive)
    ).subscribe(resp => {
      this.isSaving = false;
      this._displayService.popupTrigger(resp);
      this._router.navigate(['../'], {relativeTo: this._route});
    }, error => {
      this._displayService.popupTrigger(error);
    })
  }

  handleEditSave() {

    const teamData = {
      ...this.teamForm.value,
      id: this.team.id
    }

    this._teamsService.updateTeam(teamData).pipe(
      takeWhile(() => this._alive)
    ).subscribe(resp => {
      this.isSaving = false;
      this._displayService.popupTrigger(resp);
      this._router.navigate(['../../'], {relativeTo: this._route});
    }, error => {
      this._displayService.popupTrigger(error);
    });

  }

  onCancel() {
    if (this.inEditMode) {
      this._router.navigate(['../../'], {relativeTo: this._route});
    } else {
      this._router.navigate(['../'], {relativeTo: this._route});
    }
  }

  onDelete() {
    this._teamsService.deleteTeam(this.team.id).pipe(
      takeWhile(() => this._alive)
    ).subscribe(resp => {
      this.isSaving = false;
      this._displayService.popupTrigger(resp);
      this._router.navigate(['../../'], {relativeTo: this._route});
    }, error => {
      this._displayService.popupTrigger(error);
    });
  }

  ngOnDestroy(): void {
    this._alive = false;
  }

}
