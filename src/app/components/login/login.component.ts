import { userService } from './../../services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from './../models/user';
import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    providers: [userService]
})

export class LoginComponent implements OnInit {
    public title: string;
    public user: User;
    public status: string;
    public identity: any;
    public token: any;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: userService
    ) {
        this.title = 'Log in';
        this.user = new User("", "", "", "", "", "", "ROLE_USER", "", "");
        this.status = "";
    }
    ngOnInit() {
        console.log('Component login loaded')
    }

    onSubmit() {
        this._userService.singup(this.user).subscribe(
            response => {
                this.identity = response.user;
                console.log(this.identity);

                if (!this.identity || !this.identity._id) {
                    this.status = 'error';
                } else {
   //save data of user in local Storage browser
                    localStorage.setItem('identity', JSON.stringify(this.identity));
                      this.getToken();

                     
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
    getToken() {
        this._userService.singup(this.user, 'true').subscribe(
            response => {
                this.token = response.token;

                console.log(this.token);

                if (this.token.length <= 0) {
                    this.status = 'error';
                } else {
                localStorage.setItem('token', JSON.stringify(this.token));
                
                this.getCounters();
               
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

    getCounters(){
        this._userService.getCounters().subscribe(
            response=>{
                localStorage.setItem('stats', JSON.stringify(response));
                this.status='success';
                this._router.navigate(['/home']);
            },
            error=>{
                console.log(<any>error);
            }
        )
    }

}