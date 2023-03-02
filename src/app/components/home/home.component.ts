import { Component, OnInit } from '@angular/core';
import { userService } from './../../services/user.service';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit{
    public title:string;
    public identity: any;
   


    constructor(
        private _userService: userService
    ){
        this.title='Welcome to your profile!';
        this.identity= this._userService.getIdentity();

    }
    ngOnInit(){
        console.log('home.component loaded');
    }
}