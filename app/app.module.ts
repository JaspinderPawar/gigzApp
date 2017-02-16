import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//import { AuthGuard } from './guards/auth.guard';
import { AuthenticationService } from './services/authentication.service';
import {  UserService } from './services/user.service';
import { SessionService } from './services/session.service';
import { EventService } from './services/event.service'; 

import { LoginComponent } from './login/login.component';
import { AppComponent }  from './app.component';
import { AboutComponent } from "./components/about/about.component";
import { routing } from "./routes";
import { HomeComponent } from "./components/home/home.component";
import { ChatComponent } from './chat/chat.component';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        JsonpModule,
        routing,
        FormsModule, ReactiveFormsModule
    ],
      providers:    [ AuthenticationService, UserService,SessionService,EventService],
    declarations: [ 
        AppComponent,
        AboutComponent,
        HomeComponent,
        LoginComponent,
        ChatComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
