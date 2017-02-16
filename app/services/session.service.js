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
var SessionService = (function () {
    function SessionService() {
        this.sessionEvent = new core_1.EventEmitter();
    }
    SessionService.prototype.authenicated = function (user) {
        //this.userID = user.userID;
        this.firstName = user.firstname;
        this.lastName = user.lastname;
        // this.emailAddress = user.emailAddress;
        // this.addressLine1 = user.addressLine1;
        // this.addressLine2 = user.addressLine2;
        // this.city = user.city;
        // this.state = user.state;
        // this.zipCode = user.zipCode;
        this.isAuthenicated = true;
        this.sessionEvent.emit(user);
    };
    SessionService.prototype.logout = function () {
        this.userID = 0;
        this.firstName = "";
        this.lastName = "";
        this.emailAddress = "";
        this.addressLine1 = "";
        this.addressLine2 = "";
        this.city = "";
        this.state = "";
        this.zipCode = "";
        this.isAuthenicated = false;
    };
    return SessionService;
}());
SessionService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], SessionService);
exports.SessionService = SessionService;
//# sourceMappingURL=session.service.js.map