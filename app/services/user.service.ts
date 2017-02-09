import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { AuthenticationService } from './authentication.service';

import { User } from '../models/user';

@Injectable()
export class UserService {
    constructor(
        private http: Http,
        private authService: AuthenticationService) { }

    getUsers(): Observable<User[]> {
        // get users from api
        return this.http.get(this.authService.baseUrl + '/api/users', this.authService.option)
            .map((response: Response) => response.json());
    }

    getOnlineUsers(): Observable<User[]> {
        // get users from api
        return this.http.get(this.authService.baseUrl + '/api/onlineUsers', this.authService.option)
            .map((response: Response) => response.json());
    }

    getChatRoom(friendId: string): Observable<string> {
        return this.http.post(this.authService.baseUrl + '/api/chatroom', JSON.stringify({ userId: this.authService.userId, friendId: friendId }), this.authService.option)
            .map((response: Response) => response.json().groupid);
    }

    getChatGroup(): Observable<any[]> {
        return this.http.post(this.authService.baseUrl + '/api/getChatGroup',{ userId: this.authService.userId} ,this.authService.option)
            .map((response: Response) => response.json());
    }



}