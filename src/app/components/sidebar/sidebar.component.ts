import { UploadService } from './../../services/upload.service';
import { publicationService } from './../../services/publication.service';
import { Publication } from './../models/publication';
import { Global } from './../../services/global';
import { userService } from './../../services/user.service';
import { Component, OnInit, EventEmitter, Input, Output, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.html',
    providers: [userService, publicationService,UploadService]
})
export class SidebarComponent implements OnInit, DoCheck {
    public identity: any;
    public url: any;
    public stats;
    public token: any;
    public status: any;
    public publication: Publication;


    constructor(
        private _userService: userService,
        private _publicationService: publicationService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _uploadService: UploadService
    ) {
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getTokenString();
        this.stats = this._userService.getStats();
        this.url = Global.url;
        this.publication = new Publication("", "", "", "", this.identity._id);
    }

    ngOnInit() {
        console.log('Sidebar is loaded!');
    }
    onSubmit(form: any, $event:any) {
        this._publicationService.addPublication(this.token, this.publication).subscribe(
            response => {
                if (response) {
                    this.publication = response.publication;
                    
                    if(this.filesToUpload && this.filesToUpload.length){
//upload photo
                        this._uploadService.makeFileRequest(this.url+'upload-post-img/'+response.publication._id,[], this.filesToUpload,this.token,'image')
                    .then((result:any)=>{
                       
                        this.status = 'success';
                        this.publication.file=result.image;
                        form.reset();
                        this._router.navigate(['/timeline']);

                        this.sent.emit({ send: true });
                    })
                    }else{
                        this.status = 'success';;
                        form.reset();
                        this._router.navigate(['/timeline']);

                        this.sent.emit({ send: true });
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
public filesToUpload: Array<File>=[];

fileChangeEvent(fileInput:any){
    this.filesToUpload=<Array<File>>fileInput.target.files;
}

    ngDoCheck() {

    }


    //Output

    @Output() sent = new EventEmitter();

    sendPublication(event: any) {
        console.log(event);
        this.sent.emit({ send: true });
    }

}