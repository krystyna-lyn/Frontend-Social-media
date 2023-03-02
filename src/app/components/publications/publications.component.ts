import { publicationService } from './../../services/publication.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Global } from './../../services/global';
import { userService } from './../../services/user.service';
import { Publication } from './../models/publication';
import * as $ from 'jquery';





@Component({
    selector: 'publications',
    templateUrl: './publications.component.html',
    providers: [userService, publicationService]
})

export class publicationsComponent implements OnInit {
    public title: any;
    public identity: any;
    public token: any;
    public status: any;
    public url: string;
    public page: any;
    public total: any;
    public pages: any;
    public publications: any;
    public items_page: any;

    @Input() user: any;

    constructor(
        private _userservice: userService,
        private _publicationservice: publicationService,
        private _router: Router
    ) {

        this.title = 'Posts';
        this.url = Global.url;
        this.token = this._userservice.getTokenString();
        this.identity = this._userservice.getIdentity();
        this.page = 1;
    }


    ngOnInit() {

        console.log('publications loaded');
        this.getPublications(this.user, this.page);
    }

    getPublications(user: any, page: any, adding = false) {

        this._publicationservice.getPublicationsUser(this.token, user, page).subscribe(
            response => {
                if (response.publications) {
                    this.total = response.total_items;
                    this.pages = response.pages;
                    this.items_page = response.items_per_page;

                    if (!adding) {

                        this.publications = response.publications;
                    } else {
                        var arrayA = this.publications;
                        var arrayB = response.publications;
                        this.publications = arrayA.concat(arrayB);

                        $("html, body").animate({ scrollTop: $("body").prop("scrollHeight") }, 500);
                    }

                    if (page > this.pages) {
                        //this._router.navigate(['/home']);
                    }
                } else {
                    this.status = 'error';
                }
            },
            error => {
                var errorMessage = <any>error;
                console.log(errorMessage);
                if (errorMessage != null) {
                    this.status = 'error'
                }
            }
        );
    }

    public noMore = false;
    viewMore() {
        this.page += 1;

        if (this.page == this.pages) {
            this.noMore = true;
        }
        this.getPublications(this.user, this.page, true);
    }
}