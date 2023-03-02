import { publicationsComponent } from './../publications/publications.component';
import { User } from './../models/user';
import { Follow } from './../models/follow';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Global } from './../../services/global';
import { userService } from './../../services/user.service';
import { followService } from './../../services/follow.service';





@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    providers: [userService, followService]
})

export class profileComponent implements OnInit {
public title:any;
public user:User;
public identity;
public token;
public status: any;
public url: string;
public stats:any;
public followed;
public following;


    constructor(
        private _userservice:userService,
        private _followservice:followService,
        private _router:Router,
        private _route: ActivatedRoute
        ){

    this.title=' ';
    this.url=Global.url;
    this.token=this._userservice.getTokenString();
    this.identity=this._userservice.getIdentity();
    this.user = new User("", "", "", "", "", "", "ROLE_USER", "", "");

    this.following=false;
    this.followed=false;
    }

    ngOnInit(){
        console.log('profile loaded');
        this.loadPage();
    
    }
    loadPage(){
        this._route.params.subscribe(
            params=>{
                let id=params['id'];
                this.getUser(id);
                this.getCounters(id);
            }
        )
    }
    getUser(id:any){
        this._userservice.getUser(id).subscribe(
            response=>{
                if(response.user){
                    this.user=response.user;

                    if(response.following && response.following._id){
                        this.following=true;
                    }else{
                        this.following=false;
                    }

                    if(response.followed && response.followed._id){
                        this.followed=true;
                    }else{
                        this.followed=false;
                    }
                }else{
                    this.status='error';
                    
                }
            },
            error=>{
                console.log(<any>error);
                this._router.navigate(['/profile', this.identity._id]);
            }
        )
    }
    getCounters(id:any){
        this._userservice.getCounters(id).subscribe(
            response=>{
                this.stats=response;
                console.log(response)
            },
            error=>{
                console.log(<any>error);
            }
        )
    }
    followUser(followed:any){
    var follow=new Follow('', this.identity._id, followed);

    this._followservice.addFollow(this.token, follow).subscribe(
    response=>{
    this.following=true;
    },
    error=>{
        console.log(<any>error);  
    }
)
    }

    unfollowUser(followed:any){
        this._followservice.deleteFollow(this.token, followed).subscribe(
            response=>{
            this.following=false;
            },
            error=>{
                console.log(<any>error);  
            }
        )  
    }
    public followUserOver:any;

    mouseEnter(user_id:any){
        this.followUserOver=user_id;
    }
    mouseLeave(){
        this.followUserOver=0;
    }
}