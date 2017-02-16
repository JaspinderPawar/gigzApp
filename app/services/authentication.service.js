"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
//import { Observable } from 'rxjs/Rx';
//import 'rxjs/add/operator/map'
var session_service_1 = require("../services/session.service");
require("rxjs/Rx");
var io = require("socket.io-client");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
var AuthenticationService = (function () {
    function AuthenticationService(http, sessionService) {
        this.http = http;
        this.sessionService = sessionService;
        this.baseUrl = "http://192.168.0.57:4000";
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }
    Object.defineProperty(AuthenticationService.prototype, "option", {
        get: function () {
            var headers = new http_1.Headers({ 'x-access-token': this.token, 'x-key': this.userName });
            headers.append('Content-Type', 'application/json');
            return new http_1.RequestOptions({ headers: headers });
        },
        enumerable: true,
        configurable: true
    });
    AuthenticationService.prototype.login = function (username, password) {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.baseUrl + '/login', JSON.stringify({ username: username, password: password }), { headers: headers })
            .map(function (response) {
            // login successful if there's a jwt token in the response                
            var token = response.json() && response.json().token;
            if (token) {
                // set token property
                _this.userName = username;
                _this.image = response.json().user.thumbnail;
                _this.userId = response.json().user._id;
                _this.token = token;
                _this.sessionService.authenicated(response.json().user);
                _this.user = response.json().user;
                _this.socket = io(_this.baseUrl, { query: _this.user });
                // store username and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
                // return true to indicate successful login
                return true;
            }
            else {
                // return false to indicate failed login
                return false;
            }
        })
            .do(function (data) {
            // console.log(data);
        });
    };
    ;
    AuthenticationService.prototype.authenticate = function () {
        // console.log(this.option);
        return this.http.get(this.baseUrl + '/api/authenticate', this.option)
            .map(function (response) { return response.json(); });
        //.catch((error) => Observable.throw(error.json()));
    };
    ;
    AuthenticationService.prototype.logout = function () {
        // clear token remove user from local storage to log user out
        this.token = null;
        this.userName = null;
        localStorage.removeItem('currentUser');
    };
    return AuthenticationService;
}());
AuthenticationService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, session_service_1.SessionService])
], AuthenticationService);
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map