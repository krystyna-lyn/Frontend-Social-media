import { Global } from './global';
import { User } from './../components/models/user';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable()
export class userService{

    public url: string;
    public identity:any;
    public token: any;
    public stats: any;
    


    constructor(private _http: HttpClient){
    this.url=Global.url;


    }
    register(user:User): Observable<any>{
       let params=JSON.stringify(user);
       let headers= new HttpHeaders().set('Content-Type', 'application/json');

       return this._http.post(this.url+'register', params, {headers:headers});
    }
    singup(user:User, gettoken=""): Observable<any>{
        
        if(gettoken !=null){
          
            user.gettoken=gettoken;
        }
        let params=JSON.stringify(user);
        let headers= new HttpHeaders().set('Content-Type', 'application/json');
 
        return this._http.post(this.url+'login', params, {headers:headers});
     }
     getIdentity(){
        let identity=JSON.parse(localStorage.getItem('identity')!);
        if(identity != 'undefined'){
            this.identity=identity;
        }else{
            this.identity=null;
        }
       return this.identity;
    }
    getTokenString(){
        let token=JSON.parse(localStorage.getItem('token')!);
        if(token != 'undefined'){
            this.token=token;
        }else{
            this.token=null;
        }
       return this.token;
    }
    getStats(){
        let stats=JSON.parse(localStorage.getItem('stats')!);
        if(stats != 'undefined'){
       this.stats=stats;
        }else{
            this.stats=null;
        }
        return this.stats;
    }

    getCounters(userId=null): Observable<any>{
        let headers=new HttpHeaders().set('Content-Type', 'application/json')
                            .set('Authorization', this.getTokenString());
        if(userId !=null){
            return this._http.get(this.url+'counters/'+userId,{headers:headers});
        }else{
            return this._http.get(this.url+'counters',{headers:headers});  
        }
    }

    updateUser(user: User): Observable<any>{
        let params= JSON.stringify(user);
        let headers=new HttpHeaders().set('Content-Type','application/json')
                                    .set('Authorization', this.getTokenString());
        return this._http.put(this.url +'update-user/'+user._id, params, {headers: headers});

    }
    getUsers(page=null):Observable<any>{
    let headers=new HttpHeaders().set('Content-Type','application/json')
                                .set('Authorization', this.getTokenString());
 return this._http.get(this.url +'users/'+page, {headers: headers});
}
    getUser(id:any):Observable<any>{
    let headers=new HttpHeaders().set('Content-Type','application/json')
                                .set('Authorization', this.getTokenString());

 return this._http.get(this.url +'user/'+id,{headers: headers});
}
}