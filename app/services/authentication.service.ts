import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { SessionService } from '../services/session.service';
import { User } from '../models/User';



@Injectable()
export class AuthenticationService {
    public user: User;
    public token: string;
    public userName: string;
    public userId: string;
     public image: string;
    public baseUrl: string = "http://localhost:3000"; 
   
    public get option(): RequestOptions {
        let headers = new Headers({ 'x-access-token': this.token, 'x-key': this.userName });
        headers.append('Content-Type', 'application/json');
        return new RequestOptions({ headers: headers });
    }

    constructor(private http: Http, private sessionService: SessionService) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    login(username: string, password: string): Observable<boolean> {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.baseUrl + '/login', JSON.stringify({ username: username, password: password }), { headers: headers })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response

                let token = response.json() && response.json().token;
                if (token) {
                    // set token property
                    this.userName = username;
                     this.image =  response.json().user.thumbnail;
                     this.userId =  response.json().user._id;
                    this.token = token;
                    this.sessionService.authenicated(response.json().user);                     
                    this.user = response.json().user;
                   
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));

                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }

            })
            .do(data => {
               // console.log(data);
            });
    };

    authenticate(): Observable<boolean> {
       // console.log(this.option);
        return this.http.get(this.baseUrl+ '/api/authenticate', this.option)
            .map((response: Response) =>  response.json() );
            //.catch((error) => Observable.throw(error.json()));
    };

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        this.userName = null;
        localStorage.removeItem('currentUser');
    }
}