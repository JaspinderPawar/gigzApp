"use strict";
var router_1 = require("@angular/router");
var login_component_1 = require("./login/login.component");
var home_component_1 = require("./components/home/home.component");
var chat_component_1 = require("./chat/chat.component");
exports.routes = [
    { path: 'login', pathMatch: 'full', component: login_component_1.LoginComponent },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'chat', component: chat_component_1.ChatComponent }
];
exports.routing = router_1.RouterModule.forRoot(exports.routes, { useHash: true });
//# sourceMappingURL=routes.js.map