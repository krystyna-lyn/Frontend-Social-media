import { Global } from './../../services/global';
import { UploadService } from './../../services/upload.service';
import { userService } from './../../services/user.service';
import { User } from './../models/user';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'user-edit',
    templateUrl: './edit.component.html',
    providers: [userService, UploadService]
})

export class EditComponent implements OnInit {
    public title: string;
    public user: User;
    public identity: any;
    public token: any;
    status: any;
    public url: string;





    constructor(private _route: ActivatedRoute,
        private _router: Router,
        private _userService: userService,
        private _uploadService: UploadService) {
        this.title = 'Edit User Data';
        this.user = this._userService.getIdentity();
        this.identity = this.user;
        this.token = this._userService.getTokenString();
        this.url = Global.url;



    }

    ngOnInit() {
        console.log(this.user);
        console.log('User-edit loaded!')
    }
    ngSubmit() {
        console.log(this.user);
        this._userService.updateUser(this.user).subscribe(
            response => {
                if (!response.user) {
                    this.status = 'error';
                } else {
                    this.status = 'success';
                    localStorage.setItem('identity', JSON.stringify(this.user));
                    this.identity = this.user;

                    //load image avatar
                    this._uploadService.makeFileRequest(this.url + 'upload-image/' + this.user._id, [], this.filesToUpload, this.token, 'image')
                        .then((result: any) => {
                            console.log(result);
                            this.user.image = result.user.image;
                            localStorage.setItem('identity', JSON.stringify(this.user));
                        });

                }
            },
            error => {
                var errorMessage = <any>error;
                console.log(errorMessage);

                if (errorMessage != null) {
                    this.status = 'error';
                }
            });

    }
    public filesToUpload: Array<File> = [];
    fileChangeEvent(fileInput: any) {
        this.filesToUpload = <Array<File>>fileInput.target.files;
        console.log(this.filesToUpload);
    }

}

