


import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule} from '@angular/forms';
import {MomentModule} from 'angular2-moment';

import { MessagesRoutingModule } from './message-routing.module';


import { sendedComponent } from './components/sended/sended.component';
import { receivedComponent } from './components/received/received.component';
import { MainComponent } from './components/main/main.component';
import { AddComponent } from './components/add/add.component';

//SERVICES
import { userService } from './../services/user.service';
import { Userguard } from './../services/user.guard';

@NgModule({
    declarations: [
        MainComponent,
        receivedComponent,
        sendedComponent,
        AddComponent
    ],
    imports: [
        
        CommonModule,
        FormsModule,
        MessagesRoutingModule,
        MomentModule  
    ],
    exports: [
        MainComponent,
        receivedComponent,
        sendedComponent,
        AddComponent 
    ],
    providers: [
        userService,
        Userguard

    ]
})
export class MessagesModule{}