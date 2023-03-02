import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { userService } from '../../services/user.service';
import { User } from '../models/user';


@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    providers: [userService]
})

export class RegisterComponent implements OnInit {
    public title: string;
    public user: User;
    public status: string;

    constructor(
        private _router: ActivatedRoute,
        private _route: Router,
        private _userService: userService
    ) {
        this.title = 'Register';

        this.user = new User("", "", "", "", "", "", "ROLE_USER", "", "");
        this.status = '';
    }
    ngOnInit() {
        console.log('Component register loaded...');
    }

    onSubmit(form: any) {

        this._userService.register(this.user).subscribe(
            response => {
                if (response.user && response.user._id) {
                    //console.log(response.user);
                    this.status = 'success';
                    form.reset();
                } else {
                    this.status = 'error';
                }
            },
            error => {
                console.log(<any>error);
            }
        );
    }
}