import { Route, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';

export const routes: Route[] = [
     { path: 'login', pathMatch: 'full', component: LoginComponent },
     { path: 'home', component: HomeComponent },
    // { path: 'about', component: AboutComponent }
];

export const routing = RouterModule.forRoot(routes, { useHash: true });
