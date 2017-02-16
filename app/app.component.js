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
var router_1 = require("@angular/router");
var authentication_service_1 = require("./services/authentication.service");
var session_service_1 = require("./services/session.service");
var AppComponent = (function () {
    function AppComponent(sessionService, router, authenticationService) {
        this.sessionService = sessionService;
        this.router = router;
        this.authenticationService = authenticationService;
        this.isAuthenicated = false;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sessionService.sessionEvent.subscribe(function (user) { return _this.onAuthenication(user); });
        if (typeof (Storage) !== "undefined") {
            var currentUser = localStorage.getItem("currentUser");
            if (currentUser) {
                this.isAuthenicated = true;
            }
            else {
                this.isAuthenicated = false;
            }
        }
        this.authenticationService.authenticate()
            .subscribe(function (response) { return _this.authenicateOnSuccess(response); }, function (response) { return _this.authenicateOnError(response); });
    };
    AppComponent.prototype.authenicateOnSuccess = function (response) {
        this.isAuthenicated = true;
        this.router.navigate(['/home']);
    };
    AppComponent.prototype.authenicateOnError = function (response) {
        this.isAuthenicated = false;
        this.router.navigate(['/login']);
    };
    AppComponent.prototype.onAuthenication = function (user) {
        this.name = user.firstname.toUpperCase() + ' ' + user.lastname.toUpperCase();
        this.userimg = user.thumbnail;
        this.isAuthenicated = true;
    };
    AppComponent.prototype.logout = function () {
        this.name = "";
        this.userimg = "";
        this.isAuthenicated = false;
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: '/shared/master.component.html'
    }),
    __metadata("design:paramtypes", [session_service_1.SessionService,
        router_1.Router,
        authentication_service_1.AuthenticationService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map