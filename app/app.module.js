"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
//import { AuthGuard } from './guards/auth.guard';
var authentication_service_1 = require("./services/authentication.service");
var user_service_1 = require("./services/user.service");
var session_service_1 = require("./services/session.service");
var event_service_1 = require("./services/event.service");
var login_component_1 = require("./login/login.component");
var app_component_1 = require("./app.component");
var about_component_1 = require("./components/about/about.component");
var routes_1 = require("./routes");
var home_component_1 = require("./components/home/home.component");
var chat_component_1 = require("./chat/chat.component");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            http_1.HttpModule,
            http_1.JsonpModule,
            routes_1.routing,
            forms_1.FormsModule, forms_1.ReactiveFormsModule
        ],
        providers: [authentication_service_1.AuthenticationService, user_service_1.UserService, session_service_1.SessionService, event_service_1.EventService],
        declarations: [
            app_component_1.AppComponent,
            about_component_1.AboutComponent,
            home_component_1.HomeComponent,
            login_component_1.LoginComponent,
            chat_component_1.ChatComponent
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map