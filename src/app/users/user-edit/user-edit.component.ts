import { Component, OnInit, OnDestroy } from '@angular/core';
import { DisplayService } from 'src/app/_services/display.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { take, takeWhile } from 'rxjs/operators';
import { User } from 'src/app/_models/user';
import { Observable } from 'rxjs';
import { Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit, OnDestroy {

  isMobile: boolean;
  isSaving: boolean;
  isLoading: boolean = true;
  inEditMode: boolean;
  private _alive: boolean = true;

  user$: Observable<User>;
  user: User;

  userForm: FormGroup;

  constructor(
    private _displayService: DisplayService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) { 

    if (this._route.snapshot.url.find(url => url.path.includes('edit'))) {
      this.inEditMode = true;
      const userId = this._route.snapshot.params.id;
      this.user$ = this._userService.getUserById(userId);
    }
    
  }

  ngOnInit() {
    this.isMobile = this._displayService.checkMobile();

    this.createForm();

    if (this.inEditMode) {
      this.user$.pipe(
        take(1)
      ).subscribe((user: User) => {
        this.isLoading = false;
        this.user = user;
        this.patchform(user);
      })
    } else {
      this.isLoading = false;
    }
  }

  createForm() {
    this.userForm = new FormGroup({
      'firstname': new FormControl('', [Validators.required]),
      'lastname': new FormControl('', [Validators.required]),
      'email': new FormControl('', [Validators.email]),
      'isadmin': new FormControl(false),
      'isactive': new FormControl(false)
    })
  }

  patchform(user: User) {
    this.userForm.patchValue({
      'firstname': user.firstname,
      'lastname': user.lastname,
      'email': user.email,
      'isadmin': user.isadmin,
      'isactive': user.isactive
    })

  }

  onSave() {
    this.isSaving = true;
    this.inEditMode ? this.handleEditSave() : this.handleAddSave();
  }

  handleAddSave() {

    const userData = {
      ...this.userForm.value
    };

    this._userService.addUser(userData).pipe(
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

    const userData = {
      ...this.userForm.value,
      id: this.user.id
    }

    this._userService.updateUser(userData).pipe(
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
    this._userService.deleteUser(this.user.id).pipe(
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
