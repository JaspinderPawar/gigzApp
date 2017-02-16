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
require("rxjs/add/operator/map");
var authentication_service_1 = require("./authentication.service");
var UserService = (function () {
    function UserService(http, authService) {
        this.http = http;
        this.authService = authService;
    }
    UserService.prototype.getUsers = function () {
        // get users from api
        return this.http.get(this.authService.baseUrl + '/api/users', this.authService.option)
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.getOnlineUsers = function () {
        // get users from api
        return this.http.get(this.authService.baseUrl + '/api/onlineUsers', this.authService.option)
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.getChatRoom = function (friendId) {
        return this.http.post(this.authService.baseUrl + '/api/chatroom', JSON.stringify({ userId: this.authService.userId, friendId: friendId }), this.authService.option)
            .map(function (response) { return response.json().groupid; });
    };
    UserService.prototype.getChatGroup = function () {
        return this.http.post(this.authService.baseUrl + '/api/getChatGroup', { userId: this.authService.userId }, this.authService.option)
            .map(function (response) { return response.json(); });
    };
    return UserService;
}());
UserService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        authentication_service_1.AuthenticationService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map