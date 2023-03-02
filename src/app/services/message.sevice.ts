import { Message } from './../components/models/message';
import { Global } from './global';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MessageService{

    public url:string;

    constructor(private _http: HttpClient) {
        this.url = Global.url;
    }

    addMessage(token: any, message: any): Observable<any> {
        let params = JSON.stringify(message);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);
        return this._http.post(this.url + 'message', params, { headers: headers });
    }

    getMyMessage(token: any, page=1): Observable<any> {
       let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);
        return this._http.get(this.url + 'get-receiver/'+page,{ headers: headers });
    }

    getEmmitMessage(token: any, page=1): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
             .set('Authorization', token);
         return this._http.get(this.url + 'get-emitter/'+page,{ headers: headers });
     }
}

