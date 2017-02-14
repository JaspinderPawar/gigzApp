import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
 
import { AuthenticationService } from '../services/authentication.service';
//import { SessionService } from '../services/session.service';
 
@Component({
    moduleId: module.id,
    templateUrl: '/login/login.component.html'
})
 
export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    error = '';
 
    constructor(
       // private sessionService: SessionService,
        private router: Router,
        private authenticationService: AuthenticationService) { }
 
    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
    }
 
    login() {
       // alert('sdsd');  
        // this.loading = true;
        console.log(this.model.username);
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(result => {
                if (result === true) {                  
                    // login successful                 
                   this.router.navigate(['/home']);
                } else {
                    // login failed
                    this.error = 'Username or password is incorrect';
                    this.loading = false;
                }
            });
    }
}