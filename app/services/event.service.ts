import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class EventService {
    public migrateDataEvent: EventEmitter<any>;
    public oprationCompleteEvent: EventEmitter<any>;
    
    constructor() {      
       this.migrateDataEvent = new EventEmitter();  
       this.oprationCompleteEvent = new EventEmitter();      
    }
}