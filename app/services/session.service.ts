import { Injectable, EventEmitter } from '@angular/core';
import { User } from '../models/user';

@Injectable()
export class SessionService {
   
    public firstName: string;
    public lastName: string;
    public emailAddress: string;
    public addressLine1: string;
    public addressLine2: string;
    public city: string;
    public state: string;
    public zipCode: string;

    public userID: number;
    public isAuthenicated: Boolean;
    public sessionEvent: EventEmitter<any>;
    public apiServer: string;
    public version: string;
    
    constructor() {      
       this.sessionEvent = new EventEmitter();        
    }
 
    public authenicated(user: User) {      

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

    }

    public logout() {

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
              
    }

}