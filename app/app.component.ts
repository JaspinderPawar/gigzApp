import { Component } from '@angular/core';

@Component({
    selector: 'my-app',    
   templateUrl: '/shared/master.component.html'
})
export class AppComponent {
    name: string = "Angular 2 on Express";

    constructor() {}
}
