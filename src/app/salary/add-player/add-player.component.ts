import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators, FormsModule } from '@angular/forms';
import { MainService } from 'src/app/main/main.service';
import { Router, ActivatedRoute } from '@angular/router';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent implements OnInit, OnDestroy {

  private _alive:boolean = true;
  isLoading: boolean = false;
  isSaving: boolean = false;
  isGoalie: boolean = false;
  hasError: boolean = false;
  isMobile: boolean = false;

  position: string;
  hits: string;
  seasonType: string;
  selected: string;
  type: string;
  prevTeam: string;
  playerId: string;

  player: any;
  playerSalary: any;
  team: any;
  teams: any[];

  playerName = new FormControl('', [Validators.required])
  currentSalary = new FormControl('', [Validators.required])
  year_two = new FormControl('', [Validators.required])
  year_three = new FormControl('', [Validators.required])
  year_four = new FormControl('', [Validators.required])
  year_five = new FormControl('', [Validators.required])

  constructor(
    private _mainService: MainService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.type = this._route.snapshot.url[2].path;
   }

  ngOnInit() {
    this.checkMobile();
  }

  checkMobile() {
    if ( navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i) ) {
          this.isMobile = true;
        } else {
          this.isMobile = false;
        }
  }

  onSave(type) {
    this.isSaving = true;
    this._mainService.addNewPlayer(type, this.playerName.value, this.currentSalary.value, this.year_two.value, this.year_three.value, this.year_four.value, this.year_five.value).pipe(takeWhile(() => this._alive)).subscribe(resp => {
      this.isSaving = false;
      this._mainService.popupTrigger(resp);
      this._router.navigate(['/main']);
    }, error => {
      console.log(error);
      this.isSaving = false;
      this._mainService.popupTrigger(error.error);
      this.clearEntry();
    });
  }

  clearEntry() {
    this.playerName.reset();
    this.currentSalary.reset();
    this.year_two.reset();
    this.year_three.reset();
    this.year_four.reset();
    this.year_five.reset();
  }

  onCancel() {
    this._router.navigate(['/main']);
  }

  ngOnDestroy() {
    this._alive = false;
  }

}
