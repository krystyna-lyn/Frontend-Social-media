import { Publication } from './../components/models/publication';
import { Global } from './global';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable()
export class publicationService {

    public url: string;
    public identity: any;
    public token: any;
    public stats: any;

    constructor(private _http: HttpClient) {
        this.url = Global.url;
    }

    addPublication(token: any, publication: any): Observable<any> {
        let params = JSON.stringify(publication);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);
        return this._http.post(this.url + 'save-post', params, { headers: headers });
    }

    getPublication(token: any, page = 1): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);
        return this._http.get(this.url + 'post/' + page, { headers: headers });
    }

    getPublicationsUser(token: any, user_id:any, page = 1): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);
        return this._http.get(this.url + 'post-user/' + user_id +'/'+page, { headers: headers });
    }

    deletePublication(token: any, id: any): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);
        return this._http.delete(this.url + 'delete-post/' + id, { headers: headers });
    }






}