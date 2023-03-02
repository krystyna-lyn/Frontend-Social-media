import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { sendedComponent } from './components/sended/sended.component';
import { receivedComponent } from './components/received/received.component';
import { MainComponent } from './components/main/main.component';
import { AddComponent } from './components/add/add.component';

import { Userguard } from './../services/user.guard';

const messagesRoutes: Routes=[
    {
        path: 'messages',
        component: MainComponent,
        children: [
            {path: '', redirectTo: 'received', pathMatch: 'full'},
            {path: 'send', component: AddComponent, canActivate:[Userguard]},
            {path: 'received', component: receivedComponent, canActivate:[Userguard]},
            {path: 'received/:page', component: receivedComponent, canActivate:[Userguard]},
            {path: 'sent', component: sendedComponent, canActivate:[Userguard]},
            {path: 'sent/:page', component: sendedComponent, canActivate:[Userguard]}

        ]
    }
]
@NgModule({
    imports: [
       
        RouterModule.forRoot(messagesRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class MessagesRoutingModule {}