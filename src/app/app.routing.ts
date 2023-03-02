import { Userguard } from './services/user.guard';

import { ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { EditComponent } from './components/user-edit/edit.component';
import { UsersComponent } from './components/users/users.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { profileComponent } from './components/profile/profile.component';
import { FollowingComponent } from './components/following/following.component';
import { FollowedComponent } from './components/followed/followed.component';


const appRoutes: Routes = [
{path: '', component: LoginComponent},
{path: 'login', component: LoginComponent},
{path: 'register', component: RegisterComponent},
{path: 'home', component: HomeComponent},
{path: 'edit', component: EditComponent, canActivate:[Userguard]},
{path: 'user/:id', component: UsersComponent, canActivate:[Userguard]},
{path: 'users', component: UsersComponent, canActivate:[Userguard]},
{path: 'users/:page', component: UsersComponent, canActivate:[Userguard]},
{path: 'timeline', component: TimelineComponent, canActivate:[Userguard]},
{path: 'profile/:id', component: profileComponent, canActivate:[Userguard]},
{path: 'following/:id/:page', component: FollowingComponent, canActivate:[Userguard]},
{path: 'followed/:id/:page', component: FollowedComponent, canActivate:[Userguard]},
{path: '**', component: HomeComponent}
];


export const appRoutingProviders:any[]=[];
export const routing: ModuleWithProviders<any>=RouterModule.forRoot(appRoutes);

