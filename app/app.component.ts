import { Component, EventEmitter, OnInit, Input, ApplicationRef } from '@angular/core';
import { Router, } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { SessionService } from './services/session.service';
import { User } from './models/user';

@Component({
    selector: 'my-app',    
   templateUrl: '/shared/master.component.html'
})
export class AppComponent {
  public name: string;
  public userimg: string;
  public isAuthenicated: Boolean = false;

  constructor(private sessionService: SessionService,
    private router: Router,
    private authenticationService: AuthenticationService) { }


  public ngOnInit() {
    this.sessionService.sessionEvent.subscribe(user => this.onAuthenication(user));
    if (typeof (Storage) !== "undefined") {
      let currentUser = localStorage.getItem("currentUser");
      if (currentUser) {
        this.isAuthenicated = true;
      }
      else {
        this.isAuthenicated = false;
      }
    }

    this.authenticationService.authenticate()
      .subscribe(
      response => this.authenicateOnSuccess(response),
      response => this.authenicateOnError(response));
  }

  private authenicateOnSuccess(response: boolean) {
    this.isAuthenicated = true;
    this.router.navigate(['/home']);
  }

  private authenicateOnError(response) {
    this.isAuthenicated = false;
    this.router.navigate(['/login']);
  }

  private onAuthenication(user: User): void {
    this.name = user.firstname.toUpperCase() +' ' +user.lastname.toUpperCase();
    this.userimg = user.thumbnail;
    this.isAuthenicated = true;
  }

  public logout() {

    this.name = "";
    this.userimg = "";
    this.isAuthenicated = false;
    this.authenticationService.logout();

    this.router.navigate(['/login']);

  }
}
