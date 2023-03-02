import { userService } from './../../../services/user.service';
import { followService } from './../../../services/follow.service';
import { Follow } from './../../../components/models/follow';
import { Global } from './../../../services/global';
import { Message } from './../../../components/models/message';
import { MessageService } from './../../../services/message.sevice';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'add',
    templateUrl: './add.component.html',
    providers: [MessageService,followService]
})

export class AddComponent implements OnInit{
    public title: string;
    public message: Message;
    public identity:any;
    public status: any;
    public url: string;
    public page: any; 
    public token:any;
    public follows:any;

    constructor(
        private _messageService:MessageService,
        private _followService: followService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: userService 
    ){
        this.title='Send message';
        this.url = Global.url;
        this.identity=this._userService.getIdentity();
        this.token=this._userService.getTokenString();
        this.message =new Message( '','','','','',this.identity._id,'');
    }
    ngOnInit(){
        console.log('send messages loaded..');
        this.getMyFollows();
    }
    onSubmit(){
       this._messageService.addMessage(this.token, this.message).subscribe(
           response=>{
            this.status='success';
            //form.reset();
           },
           error=>{
               this.status='error';
               console.log(<any>error);
           }
       )
    }
  getMyFollows(){
      this._followService.getMyFollows(this.token).subscribe(
          response=>{
              this.follows=response.follows;
          },
          error=>{
              console.log(<any>error);
          }
      )
  }
}