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
var Observable_1 = require("rxjs/Observable");
var http_2 = require("@angular/http");
var blockui_service_1 = require("./blockui.service");
var authentication_service_1 = require("./authentication.service");
var HttpService = (function () {
    function HttpService(http, blockUIService, authenticationService) {
        this.http = http;
        this.blockUIService = blockUIService;
        this.authenticationService = authenticationService;
        this.baseUrl = ' http://localhost:4000';
    }
    HttpService.prototype.httpPost = function (object, url) {
        var _this = this;
        this.blockUIService.blockUIEvent.emit({
            value: true
        });
        var body = JSON.stringify(object);
        var headers = new http_2.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'q=0.8;application/json;q=0.9');
        if (typeof (this.authenticationService.token) !== "undefined") {
            headers.append('Authorization', this.authenticationService.token);
        }
        var options = new http_2.RequestOptions({ headers: headers });
        return this.http.post(this.baseUrl + url, body, options).map(function (response) { return _this.parseResponse(response, _this.blockUIService, true); })
            .catch(function (err) { return _this.handleError(err, _this.blockUIService, true); });
    };
    HttpService.prototype.httGet = function (object, url) {
        var _this = this;
        this.blockUIService.blockUIEvent.emit({
            value: true
        });
        var body = JSON.stringify(object);
        var headers = new http_2.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'q=0.8;application/json;q=0.9');
        if (typeof (this.authenticationService.token) !== "undefined") {
            headers.append('Authorization', this.authenticationService.token);
        }
        var options = new http_2.RequestOptions({ headers: headers });
        return this.http.get(this.baseUrl + url, options).map(function (response) { return _this.parseResponse(response, _this.blockUIService, true); })
            .catch(function (err) { return _this.handleError(err, _this.blockUIService, true); });
    };
    HttpService.prototype.httpPostWithNoBlock = function (object, url) {
        var _this = this;
        var body = JSON.stringify(object);
        var headers = new http_2.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'q=0.8;application/json;q=0.9');
        if (typeof (this.authenticationService.token) !== "undefined") {
            headers.append('Authorization', this.authenticationService.token);
        }
        var options = new http_2.RequestOptions({ headers: headers });
        return this.http.post(this.baseUrl + url, body, options).map(function (response) { return _this.parseResponse(response, _this.blockUIService, false); })
            .catch(function (err) { return _this.handleError(err, _this.blockUIService, false); });
    };
    HttpService.prototype.handleError = function (error, blockUIService, blocking) {
        var body = error.json();
        if (blocking) {
            blockUIService.blockUIEvent.emit({
                value: false
            });
        }
        return Observable_1.Observable.throw(body);
    };
    HttpService.prototype.parseResponse = function (response, blockUIService, blocking) {
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
        var body = response.json();
        return body;
    };
    return HttpService;
}());
HttpService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        blockui_service_1.BlockUIService,
        authentication_service_1.AuthenticationService])
], HttpService);
exports.HttpService = HttpService;
//# sourceMappingURL=http.service.js.map