import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { userService } from './../../services/user.service';
import { Follow } from './../models/follow';
import { followService } from './../../services/follow.service';
import { Global } from './../../services/global';
import { User } from './../models/user';

@Component({
    selector: 'users',
    templateUrl: './users.component.html',
    providers: [userService, followService ]
})

export class UsersComponent implements OnInit {
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
    public users: User[] = [];
    public follows: any;
   



    constructor(private _route: ActivatedRoute,
        private _router: Router,
        private _userService: userService,
        private _followService: followService
    ) {
        this.title = 'Users';
        this.url = Global.url;
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getTokenString();



    }

    ngOnInit() {

        console.log('Users loaded!');
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
            this.getUsers(page);
        });
    }
    getUsers(page: any) {
        this._userService.getUsers(page).subscribe(
            response => {
                if (!response.users) {
                    this.status = 'error';
                } else {

                    this.total = response.total;
                    this.users = response.users;
                    this.pages = response.pages;
                    this.follows = response.users_following;
                    console.log(this.follows);

                    if (page < this.pages) {
                        this._router.navigate(['/users', 1]);
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