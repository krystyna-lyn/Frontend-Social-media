import { Component, OnInit, DoCheck} from '@angular/core';
import { userService } from './../../../services/user.service';
import { followService } from './../../../services/follow.service';
import { Follow } from './../../../components/models/follow';
import { Global } from './../../../services/global';
import { Message } from './../../../components/models/message';
import { MessageService } from './../../../services/message.sevice';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
    selector: 'received',
    templateUrl: './received.component.html',
    providers: [MessageService,followService]
})

export class receivedComponent implements OnInit{
    public title: string;
    public messages:any;
    public identity:any;
    public status: any;
    public url: string;
    public page: any; 
    public token:any;
    public follows:any;
    public pages: any;
    public next_page: any;
    public prev_page: any;
    public total: any;
    
  

    constructor(
        private _messageService:MessageService,
        private _followService: followService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: userService 
    ){
        this.title='Received messages';
        this.url = Global.url;
        this.identity=this._userService.getIdentity();
        this.token=this._userService.getTokenString(); 
       
    }

    ngOnInit(){
        console.log('received messages loaded..');
        this.actuallPage();
     
    }
    actuallPage() {
        this._route.params.subscribe(params => {
          
            let page = + params['page'];
            this.page = page;

            
            if (!page) {
                page = 1;
            } else {
                this.next_page = page + 1;
                this.prev_page = page - 1;

                if (this.prev_page <= 0) {
                    this.prev_page = 1;
                }
            }
            //load list of users
            this.getMessages(this.token, this.page); 
            
        });
    }
    getMessages(token:any, page:any){
        this._messageService.getMyMessage(token, page).subscribe(
            response=>{
                if(!response.messages){

                }else{
                    this.messages=response.messages;
                    this.total = response.total;
                    this.pages = response.pages;
                }
            },
            error=>{
                console.log(<any>error);
            }
        )
    }
}