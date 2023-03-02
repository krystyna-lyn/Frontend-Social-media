import { Global } from './services/global';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { userService } from './services/user.service';
import { Component, OnInit, DoCheck } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [userService]
})
export class AppComponent implements OnInit,DoCheck {
  public title: String;
  public identity:any;
  public url: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: userService
  ){
    this.title=' ',
    this.url=Global.url
  }
  ngOnInit(){
    this.identity=this._userService.getIdentity();
    console.log(this.identity);
  }
  ngDoCheck(){
    this.identity=this._userService.getIdentity();
  }
  logout(){
    localStorage.clear();
    this.identity=null;
    this._router.navigate(['/login']);
  }
}
