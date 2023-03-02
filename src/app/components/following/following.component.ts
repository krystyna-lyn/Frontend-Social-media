import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { userService } from './../../services/user.service';
import { Follow } from './../models/follow';
import { followService } from './../../services/follow.service';
import { Global } from './../../services/global';
import { User } from './../models/user';

@Component({
    selector: 'following',
    templateUrl: './following.component.html',
    providers: [userService, followService ]
})

export class FollowingComponent implements OnInit {
    public title: string;

    public identity: any;
    public token: any;
    public status: any;
    public url: string;
    public page: any;
    public pages: any;
    public next_page: any;
    public prev_page: any;
    public total: any;
    public follows: any;
    public following:any;
    public userPageId:any;



    constructor(private _route: ActivatedRoute,
        private _router: Router,
        private _userService: userService,
        private _followService: followService
    ) {
        this.title = 'Following by';
        this.url = Global.url;
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getTokenString();



    }

    ngOnInit() {

        console.log('following loaded!');
        this.actuallPage();
    }
    actuallPage() {
        this._route.params.subscribe(params => {
          
            var user_id=params['id'];

            this.userPageId=user_id;
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
            this.getUser(user_id, page);
            
        });
    }
    getFollows(user_id:any, page: any) {
        this._followService.getFollowing(this.token,user_id,page).subscribe(
            response => {
                if (!response.follows) {
                    this.status = 'error';
                } else {
                    console.log(response);
                    
                    this.total = response.total;
                    this.following = response.follows;
                    this.pages = response.pages;
                    this.follows = response.users_following;
                    console.log(this.follows);

                    if (page < this.pages) {
                        this._router.navigate(['/following',user_id, 1]);
                    }
                    
                }
            },
            error => {
                var errorMessage = <any>error;
                console.log(errorMessage);
                if (errorMessage != null) {
                    this.status = 'error';
                }
            }
        )
    }


    public user:any= User;
    getUser(user_id:any, page:any){
    this._userService.getUser(user_id).subscribe(
        response=>{
            if(response.user){
               
                //load list of users
                this.getFollows(user_id,page);
                this.user=response.user;
                console.log(response.user);
                
            }else{
                this._router.navigate(['/home']);
            }
        }

    );
}
    public followUserOver: any;
    mouseEnter(user_id: any) {
        this.followUserOver = user_id;
    }
    mouseLeave(user_id: any) {
        this.followUserOver = 0;
    }

    followUser(followed: any) {
        var follow = new Follow('', this.identity._id, followed);

        this._followService.addFollow(this.token, follow).subscribe(
            response => {
                if (!response.follow) {
                    this.status = 'error';
                }else{
                    this.status = 'success';
                    this.follows.push(followed);
                }
            },
            error => {
                var errorMessage = <any>error;
                console.log(errorMessage);

                if (errorMessage != null) {
                    this.status = 'error';
                }
            }

        );
    }
    unfollowUser(followed:any){
        this._followService.deleteFollow(this.token, followed).subscribe(
            response=>{
                var search =this.follows.indexOf(followed);
                if(search != -1){
                    this.follows.splice(search,1)
                }
            },
            error => {
                var errorMessage = <any>error;
                console.log(errorMessage);

                if (errorMessage != null) {
                    this.status = 'error';
                }
            }

        )
    }
}