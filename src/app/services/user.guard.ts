import { userService } from './user.service';
import { Router,CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';


@Injectable()

export class Userguard implements CanActivate{


    constructor(
    private _router:Router,
    private _userService: userService
    ){

    }
    canActivate(){
let identity=this._userService.getIdentity();

if(identity && (identity.role=='ROLE_USER' || identity.role=='ROLE_ADMIN')){
    return true;
}else{
    this._router.navigate(['/login']);
    return false;
}
    }
}