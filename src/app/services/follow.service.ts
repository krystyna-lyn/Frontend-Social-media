import { Follow } from './../components/models/follow';
import { Global } from './global';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable()
export class followService {

    public url: string;
    public identity: any;
    public token: any;
    public stats: any;



    constructor(private _http: HttpClient) {
        this.url = Global.url;
    }

    addFollow(token:any, follow:any): Observable<any> {
        let params = JSON.stringify(follow);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);
        return this._http.post(this.url + 'follow', params, { headers: headers });
    }

    deleteFollow(token:any, id:any): Observable<any> {

        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);
        return this._http.delete(this.url + 'follow/' + id, { headers: headers });
    }

    getFollowing(token:any, userId=null, page=1): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', token);

 var url=  this.url+'following/'; 
if(userId !=null){
url=this.url+'following/' + userId+'/'+page;
}
    return this._http.get(url, { headers: headers });

    }
    getFollowed(token:any, userId=null, page=1): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', token);

 var url=  this.url+'followed/'; 
if(userId !=null){
url=this.url+'followed/' + userId+'/'+page;
}
    return this._http.get(url, { headers: headers });

    }


    getMyFollows(token:any): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', token);
    return this._http.get(this.url + 'my-follows/true', { headers: headers });

    }
}