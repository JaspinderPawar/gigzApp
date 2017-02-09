import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
import { SessionService } from './session.service';
import { BlockUIService } from './blockui.service';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class HttpService {
        private baseUrl: string =' http://localhost:4000'
    constructor(private http: Http, 
                private blockUIService: BlockUIService,
                private authenticationService: AuthenticationService) {
    }

    public httpPost(object: any, url: string): Observable<any> {
       
        this.blockUIService.blockUIEvent.emit({
            value: true
        });
     
        let body = JSON.stringify(object);

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'q=0.8;application/json;q=0.9');

        if (typeof (this.authenticationService.token) !== "undefined") {
            headers.append('Authorization',  this.authenticationService.token);
        }

        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.baseUrl + url, body, options).map((response) => this.parseResponse(response, this.blockUIService, true))
            .catch((err) => this.handleError(err, this.blockUIService, true));

    }

     public httGet(object: any, url: string): Observable<any> {
       
        this.blockUIService.blockUIEvent.emit({
            value: true
        });
     
        let body = JSON.stringify(object);

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'q=0.8;application/json;q=0.9');

        if (typeof (this.authenticationService.token) !== "undefined") {
            headers.append('Authorization',  this.authenticationService.token);
        }

        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.baseUrl + url, options).map((response) => this.parseResponse(response, this.blockUIService, true))
            .catch((err) => this.handleError(err, this.blockUIService, true));

    }


    public httpPostWithNoBlock(object: any, url: string): Observable<any> {

        let body = JSON.stringify(object);

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'q=0.8;application/json;q=0.9');

        if (typeof (this.authenticationService.token) !== "undefined") {
            headers.append('Authorization',  this.authenticationService.token);
        }

        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.baseUrl + url, body, options).map((response) => this.parseResponse(response, this.blockUIService, false))
            .catch((err) => this.handleError(err, this.blockUIService, false));

    }


    private handleError(error: any, blockUIService: BlockUIService, blocking: Boolean) {

        let body = error.json();

        if (blocking) {
            blockUIService.blockUIEvent.emit({
                value: false
            });
        }
     
        return Observable.throw(body);

    }

    private parseResponse(response: Response, blockUIService: BlockUIService, blocking: Boolean) {

        // let authorizationToken = response.headers.get("Authorization");
        // if (authorizationToken != null) {

        //     if (typeof (Storage) !== "undefined") {
        //         localStorage.setItem("CodeProjectAngular2Token", authorizationToken);
        //     }
        // }

        if (blocking) {
            blockUIService.blockUIEvent.emit({
                value: false
            });
        }
     
        let body = response.json();

        return body;
    }


}